import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/constants/colors';
import { Notification } from '@/types';

interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onPress }) => {
  const timeAgo = getTimeAgo(notification.createdAt);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !notification.read && styles.unreadContainer
      ]}
      onPress={() => onPress(notification)}
    >
      <Image source={{ uri: notification.fromUserPhotoURL }} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{notification.fromUsername}</Text>
          {' '}{notification.text}
        </Text>
        <Text style={styles.timeText}>{timeAgo}</Text>
      </View>
      {getNotificationIcon(notification.type)}
    </TouchableOpacity>
  );
};

// Helper function to get notification icon
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like':
      return <View style={[styles.iconContainer, { backgroundColor: colors.primary }]} />;
    case 'comment':
      return <View style={[styles.iconContainer, { backgroundColor: colors.secondary }]} />;
    case 'follow':
      return <View style={[styles.iconContainer, { backgroundColor: colors.success }]} />;
    case 'message':
      return <View style={[styles.iconContainer, { backgroundColor: colors.darkGray }]} />;
    default:
      return null;
  }
};

// Helper function to format time ago
const getTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + 'y';

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + 'mo';

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + 'd';

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + 'h';

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + 'm';

  return Math.floor(seconds) + 's';
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray,
  },
  unreadContainer: {
    backgroundColor: 'rgba(254, 44, 85, 0.05)',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 4,
  },
  username: {
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 12,
    color: colors.gray,
  },
  iconContainer: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    alignSelf: 'center',
  },
});

export default NotificationItem;