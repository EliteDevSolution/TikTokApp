import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useVideoStore } from '@/store/videoStore';
import { useAuthStore } from '@/store/authStore';
import VideoPlayer from '@/components/VideoPlayer';
import VideoActions from '@/components/VideoActions';
import VideoInfo from '@/components/VideoInfo';

export default function VideoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { videos, likeVideo, isLoading } = useVideoStore();
  const { user } = useAuthStore();
  const [video, setVideo] = useState(videos.find(v => v.id === id));

  useEffect(() => {
    // In a real app, we would fetch the video if not in the store
    const foundVideo = videos.find(v => v.id === id);
    if (foundVideo) {
      setVideo(foundVideo);
    }
  }, [id, videos]);

  const handleClose = () => {
    router.back();
  };

  const handleLikePress = () => {
    if (user && video) {
      likeVideo(video.id);
    }
  };

  const handleCommentPress = () => {
    if (video) {
      router.push(`/comments/${video.id}`);
    }
  };

  const handleSharePress = () => {
    // Share functionality
  };

  const handleProfilePress = () => {
    if (video) {
      router.push(`/profile/${video.userId}`);
    }
  };

  if (isLoading || !video) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <X size={24} color={colors.white} />
      </TouchableOpacity>

      <VideoPlayer
        uri={video.videoURL}
        paused={false}
      />

      <VideoActions
        likes={video.likes}
        comments={video.comments}
        shares={video.shares}
        userPhotoURL={video.userPhotoURL}
        onLikePress={handleLikePress}
        onCommentPress={handleCommentPress}
        onSharePress={handleSharePress}
        onProfilePress={handleProfilePress}
      />

      <VideoInfo
        username={video.username}
        description={video.description}
        hashtags={video.hashtags}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});