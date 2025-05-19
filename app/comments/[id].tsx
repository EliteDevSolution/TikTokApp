import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useVideoStore } from '@/store/videoStore';
import { useAuthStore } from '@/store/authStore';
import CommentsSheet from '@/components/CommentsSheet';

export default function CommentsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { fetchComments, comments, addComment, isLoading } = useVideoStore();
  const { user } = useAuthStore();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (id) {
      fetchComments(id);
    }
  }, [id]);

  const handleClose = () => {
    setIsVisible(false);
    // In a real app, we would navigate back
  };

  const handleAddComment = (text: string) => {
    if (user && id) {
      addComment(id, user.id, user.username, user.photoURL, text);
    }
  };

  const handleLikeComment = (commentId: string) => {
    // In a real app, this would like the comment
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CommentsSheet
        comments={comments}
        videoId={id || ''}
        onClose={handleClose}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});