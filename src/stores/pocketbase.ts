import PocketBase, { BaseAuthStore, type RecordAuthResponse, type RecordModel } from 'pocketbase';
import { defineStore } from 'pinia';
import { from, map, Observable, tap } from 'rxjs';
import { computed, ref } from 'vue';

import { Campaign, type ICampaign, type NewCampaign } from '@/models/Campaign';
import { SimpleUser, type IUser } from '@/models/User';
import { OAuthResponse } from '@/models/Auth';

export const usePocketbaseStore = defineStore('pocketbase', () => {
  const pb = new PocketBase(import.meta.env.VITE_PB_URL);
  pb.autoCancellation(false);

  /////////////////////////////////////////////////////////////////////////////
  //                              Authentication                             //
  /////////////////////////////////////////////////////////////////////////////

  const authData = ref<OAuthResponse | null>(null);
  const authStore = computed<BaseAuthStore>(() => pb.authStore);
  const loggedIn = computed<boolean>(() => pb.authStore.isValid);
  const username = computed<string | null>(() => authStore.value.model?.username);
  const userId = computed<string | null>(() => authStore.value.model?.id);

  function login(): Observable<OAuthResponse> {
    return from(pb.collection('users').authWithOAuth2<IUser>({ provider: 'discord' })).pipe(
      map((auth) => new OAuthResponse(auth)),
      tap((auth) => (authData.value = auth))
    );
  }

  function refresh(): Observable<RecordAuthResponse<RecordModel>> {
    return from(pb.collection('users').authRefresh<IUser>()).pipe(
      map((auth) => new OAuthResponse(auth)),
      tap((auth) => (authData.value = auth))
    );
  }

  function logout() {
    pb.authStore.clear();
    authData.value = null;
  }

  function deleteAccount(): Observable<boolean> {
    return from(pb.collection('users').delete(pb.authStore.model?.id)).pipe(
      tap((deleted) => {
        if (deleted) {
          logout();
        }
      })
    );
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                Campaigns                                //
  /////////////////////////////////////////////////////////////////////////////

  function listCampaigns(): Observable<Campaign[]> {
    return from(
      pb.collection('campaigns_simple_view').getFullList<ICampaign>({
        sort: 'name',
        expand: 'players,game_master',
      })
    ).pipe(map((campaigns) => campaigns.map((campaign) => new Campaign(campaign))));
  }

  function createCampaign(campaign: NewCampaign): Observable<Campaign> {
    return from(pb.collection<ICampaign>('campaign').create(campaign)).pipe(
      map((campaign) => new Campaign(campaign))
    );
  }

  function getCampaignById(id: string): Observable<Campaign> {
    return from(pb.collection<ICampaign>('campaign').getOne(id)).pipe(
      map((campaign) => new Campaign(campaign))
    );
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                  Users                                  //
  /////////////////////////////////////////////////////////////////////////////

  function allUsersSimple(): Observable<SimpleUser[]> {
    return from(
      pb.collection('public_users').getFullList<SimpleUser>({
        sort: 'username',
      })
    ).pipe(map((users) => users.map((user) => new SimpleUser(user))));
  }

  function userAvatar(userId: string, thumbSize: number = 100): Observable<string | null> {
    return from(pb.collection<IUser>('users').getOne(userId)).pipe(
      map((user) => {
        return user.avatar
          ? pb.files.getUrl(user, user.avatar, { thumb: `${thumbSize}x${thumbSize}` })
          : null;
      })
    );
  }

  return {
    pb,
    auth: {
      authStore,
      loggedIn,
      username,
      userId,
      login,
      refresh,
      logout,
      deleteAccount,
    },
    campaigns: {
      list: listCampaigns,
      create: createCampaign,
      get: getCampaignById,
    },
    users: {
      listSimple: allUsersSimple,
      avatar: userAvatar,
    },
  };
});
