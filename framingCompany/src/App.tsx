/**
 * @format
 */

 import React from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
 } from 'react-native';

 import Colors from './utils/Colors';

 const App = () => {
   return (
     <SafeAreaView style={styles.containerApp}>
     </SafeAreaView>
   );
 };

 const styles = StyleSheet.create({
  containerApp: {
    flex: 1,
    backgroundColor: Colors.indigoBlue,
  }
 });

 export default App;
