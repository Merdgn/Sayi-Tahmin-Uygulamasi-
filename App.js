import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import GameStartScreen from './screens/GameStartScreen';
import GameScreen from './screens/GameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';


export default function App() {
const [userNumber, setUserNumber] = useState(null);
function sendedNumberHandler(sendedNumber) {
  setUserNumber(sendedNumber);
}

let screen = <GameStartScreen onSendNumber={sendedNumberHandler} />

if (userNumber !== null) {
  screen = <GameScreen />;
}

  return (
    <LinearGradient style={styles.container} 
    colors={['hsla(0, 2%, 54%, 0.50)', 'transparent']}>

      <ImageBackground style={styles.container} 
      source={require('./assets/back.jpg')}
      imageStyle={styles.backImage}
      >
        {screen}
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
