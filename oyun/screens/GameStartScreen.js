import { StyleSheet, View, TextInput, Alert, Text } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../components/CustomButton';
import Title from '../components/Title';

export default function GameStartScreen({ onSendNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('');
  const [enteredName, setEnteredName] = useState(''); 

  function resetHandler() {
    setEnteredNumber('');
    setEnteredName('');
  }

  function confirmHandler() {
    const chosenNumber = parseInt(enteredNumber);

    // Hem sayı kontrolü hem de isim kontrolü yapıyoruz
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Geçersiz sayı!',
        'Lütfen 1 ile 99 arasında bir sayı girin.',
        [{ text: 'Tamam', style: 'destructive', onPress: resetHandler }]
      );
      return;
    }

    if (enteredName.trim().length === 0) {
      Alert.alert(
        'İsim Gerekli!',
        'Lütfen skor tablosunda görünecek isminizi girin.',
        [{ text: 'Tamam', style: 'default' }]
      );
      return;
    }

    // Hem sayıyı hem de ismi üst bileşene (App.js) gönderiyoruz
    onSendNumber(chosenNumber, enteredName);
  }

  return (
    <View style={styles.container}>
      <Title>Sayı Tahmin Uygulaması</Title>

      <View style={styles.card}>
        <Text style={styles.label}>İsminiz</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="Ad Soyad"
          placeholderTextColor="#eee"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={(text) => setEnteredName(text)}
          value={enteredName}
        />

        <Text style={styles.label}>Bir Sayı Tutun</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={(text) => setEnteredNumber(text)}
          value={enteredNumber}
        />

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={resetHandler}>Temizle</CustomButton>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton onPress={confirmHandler}>Onayla</CustomButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    width: '90%', 
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'yellow',
    width: 50,
    height: 50,
    marginVertical: 10,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  nameInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'yellow',
    width: '80%',
    height: 40,
    marginVertical: 10,
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});