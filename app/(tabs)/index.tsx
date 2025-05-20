import VideoActions from '@/components/VideoActions';
import VideoInfo from '@/components/VideoInfo';
import VideoPlayer from '@/components/VideoPlayer';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { useVideoStore } from '@/store/videoStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, View } from 'react-native';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { videos, fetchVideos, likeVideo, isLoading } = useVideoStore();
  const { user } = useAuthStore();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleVideoPress = () => {
    // Toggle video play/pause
  };

  const handleLikePress = (videoId: string) => {
    if (user) {
      likeVideo(videoId);
    }
  };

  const handleCommentPress = (videoId: string) => {
    router.push(`/comments/${videoId}`);
  };

  const handleSharePress = () => {
    // Share functionality
  };

  const handleProfilePress = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveVideoIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  if (isLoading && videos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={({ item, index }) => (
          <View style={styles.videoContainer}>
            <VideoPlayer
              uri={item.videoURL}
              paused={index !== activeVideoIndex}
              onVideoPress={handleVideoPress}
            />
            <VideoActions
              likes={item.likes}
              comments={item.comments}
              shares={item.shares}
              userPhotoURL={item.userPhotoURL}
              userId={item.userId} // Pass userId to VideoActions
              onLikePress={() => handleLikePress(item.id)}
              onCommentPress={() => handleCommentPress(item.id)}
              onSharePress={handleSharePress}
              onProfilePress={handleProfilePress} // Pass the handler
            />
            <VideoInfo
              username={item.username}
              description={item.description}
              hashtags={item.hashtags}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  videoContainer: {
    height,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
});