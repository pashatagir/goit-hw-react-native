import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles';
import { Container } from '../../Components/Container';

export const MapScreen = ({ navigation, route }) => {
  return (
    <Container>
      <View styles={styles.container}>
        <Text>MapScreen</Text>
      </View>
    </Container>
  );
};
