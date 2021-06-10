import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../utils/Colors';

interface Props {
    onPress: Function;
    title: string;
}

const Button: React.FC<Props> = ({onPress, title}) => {
  return (
    <TouchableOpacity 
        onPress={() => onPress} 
        style={styles.appButtonContainer}
    >
        <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    width: '90%',
    backgroundColor: Colors.seafoamBlue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  titleStyle: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 19,
    color: Colors.indigoBlue,
  }
});

export default Button;
