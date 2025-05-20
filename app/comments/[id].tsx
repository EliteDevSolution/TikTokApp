import CommentsSheet from '@/components/CommentsSheet';
import { useAuthStore } from '@/store/authStore';
import { useVideoStore } from '@/store/videoStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function CommentsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { fetchComments, comments, addComment } = useVideoStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (id) {
      fetchComments(id);
    }
  }, [fetchComments, id]);

  const handleClose = () => {
    router.back();
  };

  const handleAddComment = (text: string) => {
    if (user && id) {
      addComment(id, user.id, user.username, user.photoURL, text);
    }
  };

  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: (comment.likes || 0) + 1 }
        : comment
    );
    useVideoStore.setState({ comments: updatedComments });
  };

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