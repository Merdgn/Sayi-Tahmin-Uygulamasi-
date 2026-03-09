import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import CustomButton from '../components/CustomButton'; // Butonu import etmeyi unutma

export default function LeaderboardScreen({ onGoBack }) { // onGoBack prop'unu buraya ekledik
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://172.20.10.11:3000/api/scores/leaderboard');
      const json = await response.json();
      if (json.success) {
        setLeaderboardData(json.data);
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="yellow" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title>En İyi 10 Skor</Title>
      
      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.scoreItem}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.username}</Text>
              <Text style={styles.details}>{item.rounds} deneme - Sayı: {item.target_number}</Text>
            </View>
          </View>
        )}
      />

      {/* Buton mutlaka View içinde ve FlatList'ten sonra olmalı */}
      <View style={styles.buttonContainer}>
        <CustomButton onPress={onGoBack}>Ana Menüye Dön</CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingBottom: 50, // Butonun altta rahat durması için
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreItem: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    padding: 15,
    marginVertical: 8,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 4,
  },
  rank: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: 'yellow',
  },
  buttonContainer: {
    marginTop: 20,
  }
});