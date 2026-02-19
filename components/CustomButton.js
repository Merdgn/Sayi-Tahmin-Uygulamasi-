import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';

export default function CustomButton({ children, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#72063c',
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
