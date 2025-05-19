import AuthForm from '@/components/AuthForm';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, isLoading, error } = useAuthStore();

  const handleSubmit = (email: string, password: string, username?: string) => {
    if (isLogin) {
      login(email, password);
    } else {
      if (username) {
        register(email, password, username);
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']}
        style={styles.gradient}
      />
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop' }}
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          toggleForm={toggleForm}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginTop: 50,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
});