import { useAuthStore } from '@/store/modules/auth';

export function useAuth() {
  const authStore = useAuthStore();

  function hasAuth(codes: string | string[]) {
    if (!authStore.isLogin) {
      return false;
    }

    if (typeof codes === 'string' && authStore.userInfo.buttons) {
      return authStore.userInfo.buttons.includes(codes);
    }

    // return codes.some(code => authStore.userInfo.buttons.includes(code));
    return []
  }

  return {
    hasAuth
  };
}
