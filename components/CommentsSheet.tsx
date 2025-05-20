import { colors } from '@/constants/colors';
import { Comment } from '@/types';
import { Send, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CommentItem from './CommentItem';

interface CommentsSheetProps {
  comments: Comment[];
  videoId: string;
  onClose: () => void;
  onAddComment: (text: string) => void;
  onLikeComment: (commentId: string) => void;
}

const CommentsSheet: React.FC<CommentsSheetProps> = ({
  comments,
  videoId,
  onClose,
  onAddComment,
  onLikeComment
}) => {
  const [commentText, setCommentText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleSendComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText('');
      Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{comments.length} comments</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color={colors.black} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentItem comment={item} onLike={onLikeComment} />
        )}
        contentContainerStyle={styles.commentsList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Add comment..."
          placeholderTextColor={colors.gray}
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !commentText.trim() && styles.sendButtonDisabled
          ]}
          onPress={handleSendComment}
          disabled={!commentText.trim()}
        >
          <Send size={20} color={commentText.trim() ? colors.primary : colors.gray} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 25,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  commentsList: {
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    color: colors.black,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default CommentsSheet;