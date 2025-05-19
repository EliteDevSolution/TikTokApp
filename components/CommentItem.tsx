import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Heart } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Comment } from '@/types';

interface CommentItemProps {
  comment: Comment;
  onLike: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onLike }) => {
  const timeAgo = getTimeAgo(comment.createdAt);

  return (
    <View style={styles.container}>
      <Image source={{ uri: comment.userPhotoURL }} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{comment.username}</Text>
        <Text style={styles.commentText}>{comment.text}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.timeText}>{timeAgo}</Text>
          <TouchableOpacity onPress={() => onLike(comment.id)}>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => onLike(comment.id)}
      >
        <Heart size={16} color={colors.gray} />
        {comment.likes > 0 && (
          <Text style={styles.likeCount}>{comment.likes}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.black,
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: colors.gray,
    marginRight: 12,
  },
  replyText: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: 'bold',
  },
  likeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  likeCount: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
});

export default CommentItem;