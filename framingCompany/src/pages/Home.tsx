/**
* 
* @format
*/

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
} from 'react-native';

import Button from '../components/Button';
import WelcomeName from '../components/WelcomeName';
import InputName from '../components/InputName';
import Colors from '../utils/Colors';
const logo = '../images/logo.png'
const profile = '../images/profile.png'

const App = () => {
  const [editingMode, setEditingMode] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <SafeAreaView style={styles.containerApp}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require(logo)} style={styles.logo} resizeMode='contain' />
        </View>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.welcomeName}>
          {editingMode ? <InputName /> : <WelcomeName title={`Hello${userName}!`}/>}
        </View>
        <View style={styles.userPictureContainer}>
          <View style={styles.userPictureWrap}>
            <Image source={require(profile)} style={styles.userPicture} resizeMode='contain' />
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Button 
          title={editingMode ? "Publish" : "Edit Profile"} 
          onPress={() => setEditingMode(!editingMode)}
        />
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
   borderColor: Colors.seafoamBlue,
 },
 logo: {
   flex: 1,
 },
 profileContainer: {
  flex: 5,
  flexDirection: 'column',
 },
 welcomeName: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 },
 userPictureContainer: {
  flex: 4,
  alignItems: 'center',
 },
 userPictureWrap: {
  width: 250,
  height: 250,
  borderRadius: 250 / 2,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 5,
  borderColor: Colors.seafoamBlue,
 },
 userPicture: {
   height: '100%',
   width: '100%'
 },
 button: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
 },
});

export default App;
