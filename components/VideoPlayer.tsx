import { colors } from '@/constants/colors';
import { Video as ExpoVideo } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface VideoPlayerProps {
  uri: string;
  paused: boolean;
  onVideoPress?: () => void;
}

const { width, height } = Dimensions.get('window');

const VideoPlayer: React.FC<VideoPlayerProps> = ({ uri, paused, onVideoPress }) => {
  const videoRef = useRef<ExpoVideo>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (paused) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
    }
  }, [paused]);

  const handleVideoPress = () => {
    if (onVideoPress) {
      onVideoPress();
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
    if (!paused && videoRef.current) {
      videoRef.current.playAsync();
    }
  };

  // On web, we need to handle video differently
  if (Platform.OS === 'web') {
    return (
      <TouchableWithoutFeedback onPress={handleVideoPress}>
        <View style={styles.container}>
          <video
            src={uri}
            style={{ width: '100%', height: '100%' }}
            loop
            playsInline
            autoPlay={!paused}
            muted
          />
          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handleVideoPress}>
      <View style={styles.container}>
        <ExpoVideo
          ref={videoRef}
          source={{ uri }}
          style={styles.video}
          resizeMode="cover"
          isLooping
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          shouldPlay={!paused}
          useNativeControls={false}
        />
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: height - 49, // Subtract tab bar height
    backgroundColor: colors.black,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default VideoPlayer;