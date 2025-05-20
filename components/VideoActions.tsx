import { colors } from '@/constants/colors';
import { Image } from 'expo-image';
import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface VideoActionsProps {
  likes: number;
  comments: number;
  shares: number;
  userPhotoURL: string;
  onLikePress: () => void;
  onCommentPress: () => void;
  onSharePress: () => void;
  onProfilePress: () => void;
  isLiked?: boolean;
}

const VideoActions: React.FC<VideoActionsProps> = ({
  likes,
  comments,
  shares,
  userPhotoURL,
  onLikePress,
  onCommentPress,
  onSharePress,
  onProfilePress,
  isLiked = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionButton} onPress={onProfilePress}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: userPhotoURL }} style={styles.profileImage} />
        </View>
        <View style={styles.plusIcon}>
          <Text style={styles.plusIconText}>+</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={onLikePress}>
        <Heart
          size={35}
          color={isLiked ? colors.primary : colors.white}
          fill={isLiked ? colors.primary : 'transparent'}
        />
        <Text style={styles.actionText}>{formatNumber(likes)}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
        <MessageCircle size={35} color={colors.white} />
        <Text style={styles.actionText}>{formatNumber(comments)}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={onSharePress}>
        <Share2 size={35} color={colors.white} />
        <Text style={styles.actionText}>{formatNumber(shares)}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Bookmark size={35} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

// Helper function to format numbers (e.g., 1500 -> 1.5K)
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    bottom: 100,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionText: {
    color: colors.white,
    fontSize: 12,
    marginTop: 5,
  },
  profileImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.white,
    overflow: 'hidden',
    marginBottom: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 5,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  plusIconText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VideoActions;