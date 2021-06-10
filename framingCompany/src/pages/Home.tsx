/**
* 
* @format
*/

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../utils/Colors';
import Button from '../components/Button'

const App = () => {
  return (
    <SafeAreaView style={styles.containerApp}>
      <View style={styles.header}>

      </View>
      <View style={styles.profile}>

      </View>
      <View style={styles.button}>
        <Button title="Edit Profile" onPress={() => {}}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 containerApp: {
   flex: 1,
   backgroundColor: Colors.indigoBlue,
   flexDirection: 'column',
 },
 header: {
  flex: 1.75,
  backgroundColor: 'green',
 },
 profile: {
  flex: 5,
  backgroundColor: 'blue',
 },
 button: {
  flex: 1,
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center'
 },
});

export default App;
