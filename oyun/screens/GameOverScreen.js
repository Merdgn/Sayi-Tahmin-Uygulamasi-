// GameOverScreen.js
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import React, { useEffect } from 'react';
import Title from '../components/Title';
import CustomButton from '../components/CustomButton';

export default function GameOverScreen({ roundsNumber, userNumber, userName, onStartNewGame, onSeeLeaderboard }) {
  
  useEffect(() => {
    saveScoreToBackend();
  }, []);

  const saveScoreToBackend = async () => {
    try {
      const response = await fetch('http://172.20.10.11:3000/api/scores/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userName, 
          rounds: roundsNumber,
          targetNumber: userNumber,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Bir hata oluştu');
      console.log('Skor kaydedildi:', data);
    } catch (error) {
      console.log('Kayıt hatası:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Oyun Tamamlandı!</Title>
      <View style={styles.imageView}>
        <Image style={styles.image} source={require('../assets/success.jpg')} />
      </View>
      <Text style={styles.result}>
        <Text style={styles.countAndNumber}>{roundsNumber} </Text> 
        denemeyle <Text style={styles.countAndNumber}>{userNumber}</Text> sayısını buldunuz!
      </Text>
      
      {}
      <View style={styles.buttonContainer}>
        <CustomButton onPress={onStartNewGame}>Yeni Oyuna Başla</CustomButton>
        <CustomButton onPress={onSeeLeaderboard}>Skorları Gör</CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, alignItems: 'center', justifyContent: 'center' },
  imageView: { width: 300, height: 300, overflow: 'hidden', borderRadius: 150, borderWidth: 3, borderColor: 'red', margin: 20 },
  image: { width: '100%', height: '100%' },
  result: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  countAndNumber: { color: 'red', fontWeight: 'bold' },
  buttonContainer: { width: '100%', marginTop: 10 }
});