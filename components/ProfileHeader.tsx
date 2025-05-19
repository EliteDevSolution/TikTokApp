import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/constants/colors';
import { User } from '@/types';

interface ProfileHeaderProps {
  user: User;
  isCurrentUser: boolean;
  onEditProfile?: () => void;
  onFollow?: () => void;
  onMessage?: () => void;
  isFollowing?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isCurrentUser,
  onEditProfile,
  onFollow,
  onMessage,
  isFollowing = false
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        <Text style={styles.username}>@{user.username}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        {isCurrentUser ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={onEditProfile}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                isFollowing ? styles.unfollowButton : styles.followButton
              ]}
              onPress={onFollow}
            >
              <Text style={[
                styles.actionButtonText,
                isFollowing ? styles.unfollowButtonText : styles.followButtonText
              ]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.messageButton}
              onPress={onMessage}
            >
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {user.bio ? (
        <Text style={styles.bio}>{user.bio}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  actionContainer: {
    marginBottom: 16,
  },
  editButton: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 8,
  },
  followButton: {
    backgroundColor: colors.primary,
  },
  unfollowButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  followButtonText: {
    color: colors.white,
  },
  unfollowButtonText: {
    color: colors.black,
  },
  messageButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  bio: {
    fontSize: 14,
    color: colors.black,
  },
});

export default ProfileHeader;