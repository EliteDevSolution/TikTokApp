import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface VideoInfoProps {
  username: string;
  description: string;
  hashtags: string[];
}

const VideoInfo: React.FC<VideoInfoProps> = ({ username, description, hashtags }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.username}>@{username}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.hashtagContainer}>
        {hashtags.map((tag, index) => (
          <Text key={index} style={styles.hashtag}>#{tag}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    maxWidth: '70%',
    padding: 10,
  },
  username: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 5,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hashtag: {
    color: colors.white,
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default VideoInfo;