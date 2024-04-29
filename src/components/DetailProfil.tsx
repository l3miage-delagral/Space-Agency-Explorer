import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailProfil = ({ param }: any) => {
  const user = param;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user.name}</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Text style={styles.text}>{user.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderColor: 'red',
    borderTopWidth: 2,
    height: 150,
    width: '100%',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default DetailProfil;
