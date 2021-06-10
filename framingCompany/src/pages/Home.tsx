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
  StatusBar,
  Image,
} from 'react-native';

import Colors from '../utils/Colors';
import Button from '../components/Button'

const logo = '../images/logo.png'

const App = () => {
  return (
    <SafeAreaView style={styles.containerApp}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require(logo)} style={styles.logo} resizeMode='contain' />
        </View>
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
  flex: 2,
  justifyContent: 'center',
  alignItems: 'center',
 },
 logoContainer: {
   height: 145,
   width: 145,
   justifyContent: 'center',
   alignItems: 'center',
   borderWidth: 5,
   borderColor: Colors.seafoamBlue
 },
 logo: {
   flex: 1,
 },
 profile: {
  flex: 5,
 },
 button: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
 },
});

export default App;
