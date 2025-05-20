import NotificationItem from '@/components/NotificationItem';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { Notification } from '@/types';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function NotificationsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    notifications,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    isLoading
  } = useNotificationStore();

  useEffect(() => {
    if (user) {
      fetchNotifications(user.id);
    }
  }, [user]);

  const handleNotificationPress = (notification: Notification) => {
    markAsRead(notification.id);

    // Navigate based on notification type
    switch (notification.type) {
      case 'like':
      case 'comment':
        if (notification.contentId) {
          router.push(`/video/${notification.contentId}`);
        }
        break;
      case 'follow':
        router.push(`/profile/${notification.fromUserId}`);
        break;
      case 'message':
        // Find chat ID based on participants
        // For this mock, we'll just use a hardcoded chat ID
        router.push('/chat/chat1');
        break;
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={colors.black} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.markAllButton}
              onPress={handleMarkAllAsRead}
            >
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications yet</Text>
            <Text style={styles.emptySubtext}>
              When you get notifications, they'll show up here.
            </Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            renderItem={({ item }) => (
              <NotificationItem
                notification={item}
                onPress={handleNotificationPress}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 10,
  },
  markAllButton: {
    marginRight: 10,
  },
  markAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
});