/**
 * Zustand store for authentication state management
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id: string;
    phoneNumber: string;
    createdAt: string;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    phoneNumber: string;

    setPhoneNumber: (phone: string) => void;
    login: (phone: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    phoneNumber: '',

    setPhoneNumber: (phone) => {
        set({ phoneNumber: phone });
    },

    login: async (phone) => {
        try {
            // TODO: Replace with actual authentication logic
            const user: User = {
                id: Date.now().toString(),
                phoneNumber: phone,
                createdAt: new Date().toISOString(),
            };

            await AsyncStorage.setItem('user', JSON.stringify(user));
            set({ user, isAuthenticated: true, phoneNumber: phone });
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem('user');
            set({ user: null, isAuthenticated: false, phoneNumber: '' });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    },

    checkAuth: async () => {
        try {
            const stored = await AsyncStorage.getItem('user');
            if (stored) {
                const user = JSON.parse(stored);
                set({ user, isAuthenticated: true, phoneNumber: user.phoneNumber });
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        }
    },
}));
