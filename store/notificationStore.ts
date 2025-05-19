import { create } from 'zustand';
import { Notification } from '@/types';
import { mockNotifications } from '@/mocks/notifications';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: (userId: string) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  fetchNotifications: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Filter notifications for the user
      const userNotifications = mockNotifications.filter(notif =>
        notif.userId === userId
      );

      // Count unread notifications
      const unreadCount = userNotifications.filter(notif => !notif.read).length;

      set({
        notifications: userNotifications,
        unreadCount,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },

  markAsRead: async (notificationId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mark notification as read
      set(state => {
        const updatedNotifications = state.notifications.map(notif =>
          notif.id === notificationId
            ? { ...notif, read: true }
            : notif
        );

        // Recalculate unread count
        const unreadCount = updatedNotifications.filter(notif => !notif.read).length;

        return {
          notifications: updatedNotifications,
          unreadCount
        };
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  },

  markAllAsRead: async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mark all notifications as read
      set(state => ({
        notifications: state.notifications.map(notif => ({ ...notif, read: true })),
        unreadCount: 0
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  },
}));