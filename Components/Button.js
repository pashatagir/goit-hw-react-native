import { Children } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { fonts } from '../Screens/styles';

export const AuthButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  );
};

export const AddAvatarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.buttonAddAvatar}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    padding: 0,
    marginBottom: 16,
  },
  textButton: {
    color: '#ffffff',
    fontFamily: fonts.roboto400,
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 16,
  },
  buttonAddAvatar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 81,
    left: 107,
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },
});
