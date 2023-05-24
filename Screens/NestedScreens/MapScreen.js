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

export const MapScreen = ({ navigation, route }) => {
  const { longitude, latitude } = route.params?.data;
  return (
    <Container>
      <View style={styles.container}>
        <View
          style={{
            marginTop: 88,
            marginLeft: 16,
            flexDirection: 'row',
            alignSelf: 'flex-start',
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Posts')}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <Text>Map</Text>
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
          // minZoomLevel={15}
          onMapReady={() => console.log('Map is ready')}
          onRegionChange={() => console.log('Region change')}
        >
          <Marker
            title="I am here"
            coordinate={{ latitude, longitude }}
            description="Hello"
          />
        </MapView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
