import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Config from 'react-native-config';
import ShapeLayer from './components/ShapeLayer';
import { generateRandom, returnBounds } from './data';
import marker from './assets/marker.png'

const { width, height } = Dimensions.get('window');

MapboxGL.setAccessToken(Config.MAPBOX_KEY)

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height
  },
  map: {
    width: '100%',
    height: '100%'
  },
  buttons: {
    flexDirection: 'row',
    left: 20,
    right: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 50,
    height: 50,
    borderRadius: 4
  },
  button: {
    backgroundColor: 'tomato',
    height: 40,
    marginHorizontal: 4,
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: 'bold',
    color: 'white'
  }
});

const bounds = returnBounds()

export default function App() {

  const [shape, setShape] = React.useState(null)
  const [styleURL, setStyleURL] = React.useState(MapboxGL.StyleURL.Outdoors)

  const onPress = React.useCallback(type => setStyleURL(MapboxGL.StyleURL[type] ?? MapboxGL.StyleURL.Dark), [])

  React.useEffect(async () => {
    const { data } = await generateRandom()
    setShape(data)
  }, [])

  return (
    <View style={styles.page}>
      <MapboxGL.MapView
        {...{ styleURL }}
        attributionPosition={{ bottom: 125, right: 10 }}
        logoPosition={{ bottom: 125, left: 10 }}
        style={styles.map}
      >
        <MapboxGL.Images images={{ marker }} />
        <MapboxGL.Camera {...{ bounds }} padding={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }} />
        <ShapeLayer {...{ shape }} />
      </MapboxGL.MapView>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress('Dark')}
        >
          <Text style={styles.text}>Dark</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress('Satellite')}
        >
          <Text style={styles.text}>Satellite</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress('Outdoors')}
        >
          <Text style={styles.text}>Outdoors</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}