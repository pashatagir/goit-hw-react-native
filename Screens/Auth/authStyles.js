import { StyleSheet } from 'react-native';
import { fonts } from '../../assets/fonts/fonts';

export const authStyles = StyleSheet.create({
  imgBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
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
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    color: '#212121',
    fontFamily: fonts.roboto400,
    fontSize: 16,
    lineHeight: 18.75,
  },
  wrapperInput: { position: 'relative' },
  buttonShowPassword: {
    position: 'absolute',
    top: 15,
    right: 16,
    fontSize: 16,
    lineHeight: 18.75,
    color: '#1B4371',
  },
  link: {
    color: '#1B4371',
    fontFamily: fonts.roboto400,
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: 'center',
    alignItems: 'flex-end',
  },
});
