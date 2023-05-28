import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Container } from '../../Components/Container';
import { ArrowLeftIcon } from '../../Components/Icons';
import MapView, { Marker } from 'react-native-maps';
import { fonts } from '../../assets/fonts/fonts';

export const MapScreen = ({ navigation, route }) => {
  const { longitude, latitude } = route.params;
  const screen = route.params.params;

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (screen === 'Posts') {
              navigation.navigate('Posts');
            } else navigation.navigate('Profile');
          }}
          style={styles.button}
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Map</Text>
      </View>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        onMapReady={() => console.log('Map is ready')}
        onRegionChange={() => console.log('Region change')}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude, longitude }}
          description="Hello"
        />
      </MapView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    height: 62,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  button: {
    position: 'absolute',
    left: 16,
  },
  title: {
    fontFamily: fonts.roboto500,
    fontSize: 17,
    letterSpacing: -0.408,
    lineHeight: 22,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
