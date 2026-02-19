import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import GameStartScreen from './screens/GameStartScreen';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient style={styles.container} 
    colors={['hsla(0, 2%, 54%, 0.50)', 'transparent']}>
      <ImageBackground style={styles.container} 
      source={require('./assets/back.jpg')}
      imageStyle={styles.backImage}
      >

        <GameStartScreen />
      </ImageBackground>
    </LinearGradient>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImage:{
    opacity: 0.2,
  },
});
