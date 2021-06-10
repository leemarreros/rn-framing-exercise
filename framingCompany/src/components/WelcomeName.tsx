import React from 'react';
import {Text, StyleSheet} from 'react-native';

import Colors from '../utils/Colors';

interface Props {
    title: string;
}

const WelcomeName: React.FC<Props> = ({title}) => {
  return (
    <Text style={styles.titleStyle}>{title}</Text>
  )
}

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 31,
    color: Colors.seafoamBlue,
    textAlign: 'center',
  }
});

export default WelcomeName;
