import PocketBase, { BaseAuthStore, type RecordAuthResponse, type RecordModel } from 'pocketbase';
import { defineStore } from 'pinia';
import { from, map, Observable, tap } from 'rxjs';
import { computed, ref } from 'vue';

export interface NewCampaign {
  name: string | null;
  game_master: string | null;
  players: string[] | null;
}

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

  function simpleUserList(): Observable<RecordModel[]> {
    return from(
      pb.collection('public_users').getFullList({
        sort: 'username',
      })
    );
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                Campaigns                                //
  /////////////////////////////////////////////////////////////////////////////

  function listCampaigns(): Observable<RecordModel[]> {
    return from(
      pb.collection('campaign').getFullList({
        sort: 'name',
      })
    );
  }

  function createCampaign(campaign: NewCampaign): Observable<RecordModel> {
    return from(pb.collection('campaign').create(campaign));
  }

  return {
    auth: {
      authData,
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
      simpleUserList,
    },
  };
});
