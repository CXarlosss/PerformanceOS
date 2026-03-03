import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    role: string;
    athleteId?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
    initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    setAuth: (user, token) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
        set({ user: null, token: null, isAuthenticated: false });
    },

    initialize: () => {
        const token = localStorage.getItem('access_token');
        const userJson = localStorage.getItem('user_data');
        if (token && userJson) {
            try {
                const user = JSON.parse(userJson);
                set({ user, token, isAuthenticated: true });
            } catch (e) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_data');
            }
        }
    }
}));
