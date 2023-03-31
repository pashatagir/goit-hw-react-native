import { StyleSheet } from 'react-native';

export const fonts = {
  roboto400: 'Roboto-Regular',
  roboto500: 'Roboto-Medium',
  roboto700: 'Roboto-Bold',
};

export const styles = StyleSheet.create({
  form: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  title: {
    color: '#212121',
    textAlign: 'center',
    fontFamily: fonts.roboto700,
    fontSize: 30,
    marginTop: 92,
    marginBottom: 32,
  },
  boxAvatar: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: -60,
    right: '50%',
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
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
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    color: '#212121',
    fontFamily: fonts.roboto400,
    fontSize: 16,
  },
  wrapperInput: { position: 'relative' },
  buttonShowPassword: {
    position: 'absolute',
    top: 15,
    right: 16,
    fontSize: 16,
    color: '#1B4371',
  },
  link: {
    color: '#1B4371',
    fontFamily: fonts.roboto400,
    fontSize: 16,
    textAlign: 'center',
  },
});