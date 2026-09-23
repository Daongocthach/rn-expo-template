import { useEffect } from 'react';
import { create } from 'zustand';
import type { AuthSession, AuthUser } from '@/features/auth/types';
import { addListener, getItem, removeItem, setItem, STORAGE_KEYS } from '@/utils/storage';

interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setLoading: (isLoading: boolean) => void;
  hydrateAuth: (payload: { user: AuthUser; session: AuthSession }) => void;
  clearSession: () => void;
  initialize: () => Promise<void>;
  cleanup: () => void;
}

export const DEFAULT_AUTH_USER: AuthUser = {
  id: 1,
  username: 'admin',
  first_name: 'Admin',
  last_name: 'User',
  role: {
    id: 1,
    name: 'Admin',
    permissions: {
      full_access: true,
      can_access_account_settings: true,
      can_setting_access_control: true,
      can_setting_shift_schedule: true,
      can_access_device_library: true,
      can_access_layout_views: true,
      can_access_checklist_manager: true,
      can_access_checklist_history: true,
      can_setting_off_date: true,
      can_access_requesting_department_repair_forms: true,
      can_access_responsible_department_repair_forms: true,
      can_access_analytics: true,
      can_create_repair_form: true,
      can_accept_pending_repair_form: true,
      can_confirm_repair_form: true,
      can_edit_checklist_history: true,
      can_create_downtime_status_record: true,
      can_access_worker_checklist: true,
      can_configure_packing_layout: true,
      can_configure_packing_rule: true,
      can_view_qc_packing: true,
      can_edit_inspection_form: true,
      can_switch_company: true,
      is_department_leader: true,
    },
  },
  avatar: null,
  full_name: 'Kỹ thuật viên',
  status: true,
};

export const DEFAULT_AUTH_SESSION: AuthSession = {
  access_token: 'default_guest_access_token',
  refresh_token: 'default_guest_refresh_token',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setSession: (session) => set({ session, isAuthenticated: !!session }),

  setLoading: (isLoading) => set({ isLoading }),

  hydrateAuth: ({ user, session }) => {
    setItem(STORAGE_KEYS.auth.user, user);
    setItem(STORAGE_KEYS.auth.session, session);
    set({ user, session, isAuthenticated: true, isLoading: false });
  },

  clearSession: () => {
    removeItem(STORAGE_KEYS.auth.user);
    removeItem(STORAGE_KEYS.auth.session);
    set({
      user: null,
      session: null,
      isAuthenticated: false,
    });
  },

  initialize: async () => {
    const storedUser = getItem<AuthUser>(STORAGE_KEYS.auth.user);
    const storedSession = getItem<AuthSession>(STORAGE_KEYS.auth.session);

    if (storedUser.success && storedSession.success && storedUser.data && storedSession.data) {
      set({
        user: storedUser.data,
        session: storedSession.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return;
    }

    set({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  cleanup: () => {},
}));

function syncAuthStateFromStorage() {
  const storedUser = getItem<AuthUser>(STORAGE_KEYS.auth.user);
  const storedSession = getItem<AuthSession>(STORAGE_KEYS.auth.session);

  if (storedUser.success && storedSession.success && storedUser.data && storedSession.data) {
    useAuthStore.setState({
      user: storedUser.data,
      session: storedSession.data,
      isAuthenticated: true,
      isLoading: false,
    });
    return;
  }

  useAuthStore.setState({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: false,
  });
}

export function useAuthInit() {
  const initialize = useAuthStore((s) => s.initialize);
  const cleanup = useAuthStore((s) => s.cleanup);

  useEffect(() => {
    initialize()
      .then(() => {
        syncAuthStateFromStorage();
      })
      .catch(() => {
        syncAuthStateFromStorage();
      });

    const unsubscribeUser = addListener(STORAGE_KEYS.auth.user, () => {
      queueMicrotask(syncAuthStateFromStorage);
    });
    const unsubscribeSession = addListener(STORAGE_KEYS.auth.session, () => {
      queueMicrotask(syncAuthStateFromStorage);
    });

    return () => {
      unsubscribeUser();
      unsubscribeSession();
      cleanup();
    };
  }, [cleanup, initialize]);
}
