import { create } from 'zustand';
import { Chat, Message } from '@/types';
import { mockChats, mockMessages } from '@/mocks/chats';

interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  fetchChats: (userId: string) => Promise<void>;
  fetchMessages: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, senderId: string, receiverId: string, text: string) => Promise<void>;
  markChatAsRead: (chatId: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  currentChat: null,
  messages: [],
  isLoading: false,
  error: null,

  fetchChats: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Filter chats where the user is a participant
      const userChats = mockChats.filter(chat =>
        chat.participants.includes(userId)
      );

      set({ chats: userChats, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },

  fetchMessages: async (chatId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get messages for the chat
      const chatMessages = mockMessages[chatId] || [];

      // Get the chat
      const chat = mockChats.find(c => c.id === chatId) || null;

      set({
        messages: chatMessages,
        currentChat: chat,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },

  sendMessage: async (chatId, senderId, receiverId, text) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newMessage: Message = {
        id: `msg${Date.now()}`,
        senderId,
        receiverId,
        text,
        createdAt: Date.now(),
        read: false,
      };

      // Add message to list
      set(state => ({
        messages: [...state.messages, newMessage],
        chats: state.chats.map(chat =>
          chat.id === chatId
            ? {
                ...chat,
                lastMessage: text,
                lastMessageTime: Date.now(),
                unreadCount: chat.participants[0] === receiverId ? chat.unreadCount + 1 : chat.unreadCount
              }
            : chat
        ),
        currentChat: state.currentChat?.id === chatId
          ? {
              ...state.currentChat,
              lastMessage: text,
              lastMessageTime: Date.now()
            }
          : state.currentChat
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  },

  markChatAsRead: async (chatId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mark chat as read
      set(state => ({
        chats: state.chats.map(chat =>
          chat.id === chatId
            ? { ...chat, unreadCount: 0 }
            : chat
        ),
        messages: state.messages.map(message =>
          message.read === false
            ? { ...message, read: true }
            : message
        )
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  },
}));