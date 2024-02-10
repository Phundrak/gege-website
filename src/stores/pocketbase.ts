import PocketBase, { BaseAuthStore, type RecordAuthResponse, type RecordModel } from 'pocketbase';
import { defineStore } from 'pinia';
import { from, map, Observable, tap } from 'rxjs';
import { computed, ref } from 'vue';

export const usePocketbaseStore = defineStore('pocketbase', () => {
  const pb = new PocketBase(import.meta.env.VITE_PB_URL);
  const authData = ref<RecordAuthResponse<RecordModel> | null>(null);
  const authStore = computed<BaseAuthStore>(() => pb.authStore);
  const loggedIn = computed<boolean>(() => pb.authStore.isValid);
  const username = computed<string | null>(() => authStore.value.model?.username);

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

  return {
    authData,
    authStore,
    loggedIn,
    username,
    login,
    refresh,
    logout,
    deleteAccount,
  };
});
