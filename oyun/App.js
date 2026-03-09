import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground } from 'react-native';
import GameStartScreen from './screens/GameStartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import LeaderboardScreen from './screens/LeaderboardScreen'; 
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [userName, setUserName] = useState(''); 
  const [gameIsOver, setgameIsOver] = useState(true);
  const [guessCounts, setGuessCounts] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false); 

  
  function sendedNumberHandler(sendedNumber, name) {
    setUserNumber(sendedNumber);
    setUserName(name); 
    setgameIsOver(false);
    setShowLeaderboard(false);
  }

  function gameOverHandler(numberofGuess) {
    setgameIsOver(true);
    setGuessCounts(numberofGuess);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessCounts(0);
    setUserName(''); 
    setShowLeaderboard(false);
  }

  function seeLeaderboardHandler() {
    setShowLeaderboard(true);
  }

  
  let screen = <GameStartScreen onSendNumber={sendedNumberHandler} />;

  if (userNumber && !gameIsOver) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

 
  if (gameIsOver && userNumber && !showLeaderboard) {
    screen = (
      <GameOverScreen 
        roundsNumber={guessCounts} 
        userNumber={userNumber} 
        userName={userName} 
        onStartNewGame={startNewGameHandler}
        onSeeLeaderboard={seeLeaderboardHandler} 
      />
    );
  }

 
  if (showLeaderboard) {
    screen = <LeaderboardScreen onGoBack={startNewGameHandler} />;
  }

  return (
    <LinearGradient style={styles.container} colors={['hsla(0, 2%, 54%, 0.50)', 'transparent']}>
      <ImageBackground 
        style={styles.container} 
        source={require('./assets/back.jpg')}
        imageStyle={styles.backImage}
      >
        <StatusBar style="light" />
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