import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Camera, Check, Music, Sparkles, Timer, Upload, X, Zap } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function CreateScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraType = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      setIsRecording(true);
      // In a real app, this would record video
      // For this mock, we'll just simulate recording
      setTimeout(() => {
        stopRecording();
      }, 3000);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Mock video URI
    setVideoUri('https://assets.mixkit.co/videos/preview/mixkit-young-woman-waving-her-hair-in-a-pool-1229-large.mp4');
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const cancelVideo = () => {
    setVideoUri(null);
    setDescription('');
  };

  const uploadVideo = async () => {
    if (!videoUri) return;

    setIsUploading(true);

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setVideoUri(null);
      setDescription('');
      router.push('/');
    }, 2000);
  };

  // If we have a video, show the post creation screen
  if (videoUri) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={cancelVideo}>
            <X size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <TouchableOpacity
            onPress={uploadVideo}
            disabled={isUploading}
          >
            {isUploading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Check size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.postContainer}>
          <View style={styles.videoPreviewContainer}>
            {Platform.OS === 'web' ? (
              <video
                src={videoUri}
                style={{ width: '100%', height: '100%' }}
                controls
              />
            ) : (
              <Image
                source={{ uri: videoUri }}
                style={styles.videoPreview}
                contentFit="cover"
              />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={{ uri: user?.photoURL }}
              style={styles.userAvatar}
            />
            <TextInput
              style={styles.descriptionInput}
              placeholder="Write a caption..."
              placeholderTextColor={colors.gray}
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>Add to your post</Text>
            <View style={styles.optionsButtons}>
              <TouchableOpacity style={styles.optionButton}>
                <Music size={20} color={colors.primary} />
                <Text style={styles.optionText}>Add Sound</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <Sparkles size={20} color={colors.primary} />
                <Text style={styles.optionText}>Add Effects</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // Camera view for recording
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={cameraType}
      >
        <View style={styles.cameraControls}>
          <View style={styles.topControls}>
            <TouchableOpacity style={styles.controlButton} onPress={() => router.back()}>
              <X size={24} color={colors.white} />
            </TouchableOpacity>
            <View style={styles.topRightControls}>
              <TouchableOpacity style={styles.controlButton}>
                <Zap size={24} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton}>
                <Timer size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.galleryButton} onPress={pickVideo}>
              <Upload size={24} color={colors.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.recordButton, isRecording && styles.recordingButton]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <View style={styles.stopRecordingIcon} />
              ) : (
                <View style={styles.startRecordingIcon} />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
              <Camera size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  permissionText: {
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  topRightControls: {
    flexDirection: 'row',
  },
  controlButton: {
    marginHorizontal: 10,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
  },
  galleryButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  recordingButton: {
    backgroundColor: colors.error,
  },
  startRecordingIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.white,
  },
  stopRecordingIcon: {
    width: 20,
    height: 20,
    backgroundColor: colors.white,
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  postContainer: {
    flex: 1,
  },
  videoPreviewContainer: {
    width: '100%',
    height: 300,
    backgroundColor: colors.black,
  },
  videoPreview: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  descriptionInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    minHeight: 80,
  },
  optionsContainer: {
    padding: 16,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 12,
  },
  optionsButtons: {
    flexDirection: 'row',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  optionText: {
    marginLeft: 6,
    color: colors.black,
  },
});