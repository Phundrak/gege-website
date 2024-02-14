import PocketBase, { BaseAuthStore, type RecordAuthResponse, type RecordModel } from 'pocketbase';
import { defineStore } from 'pinia';
import { from, map, Observable, tap } from 'rxjs';
import { computed, ref } from 'vue';

import type { Campaign, NewCampaign } from '@/models/Campaign';
import type { SimpleUser } from '@/models/User';

export const usePocketbaseStore = defineStore('pocketbase', () => {
  const pb = new PocketBase(import.meta.env.VITE_PB_URL);

  /////////////////////////////////////////////////////////////////////////////
  //                              Authentication                             //
  /////////////////////////////////////////////////////////////////////////////

  const authData = ref<RecordAuthResponse<RecordModel> | null>(null);
  const authStore = computed<BaseAuthStore>(() => pb.authStore);
  const loggedIn = computed<boolean>(() => pb.authStore.isValid);
  const username = computed<string | null>(() => authStore.value.model?.username);
  const userId = computed<string | null>(() => authStore.value.model?.id);

  function login(): Observable<RecordAuthResponse<RecordModel>> {
    return from(pb.collection('users').authWithOAuth2({ provider: 'discord' })).pipe(
      map((auth) => (authData.value = auth))
    );
  }

  function refresh(): Observable<RecordAuthResponse<RecordModel>> {
    return from(pb.collection('users').authRefresh()).pipe(tap((auth) => (authData.value = auth)));
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
      pb.collection('campaigns_simple_view').getFullList<Campaign>({
        sort: 'name',
        expand: 'players,game_master',
      })
    );
  }

  function createCampaign(campaign: NewCampaign): Observable<RecordModel> {
    return from(pb.collection('campaign').create(campaign));
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                  Users                                  //
  /////////////////////////////////////////////////////////////////////////////

  function allUsersSimple(): Observable<SimpleUser[]> {
    return from(
      pb.collection('public_users').getFullList<SimpleUser>({
        sort: 'username',
      })
    );
  }

  return {
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
    campaign: {
      listCampaigns,
      createCampaign,
    },
    users: {
      allUsersSimple,
    },
  };
});
