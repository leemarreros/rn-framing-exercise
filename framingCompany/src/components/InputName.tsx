import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

import Colors from '../utils/Colors';

interface Props {
  userName: string,
  editingMode: boolean,
  setUserName: Function,
}

const InputName: React.FC<Props> = ({userName, editingMode, setUserName}) => {
  const [text, onChangeText] = useState(userName);
  useEffect(() => {
    return () => {
      setUserName(`${text}`);
    }
  }, [editingMode, text]);


  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="your name"
        maxLength={20}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: '50%',
    height: 40,
    justifyContent: 'flex-end',
    borderBottomWidth: 4,
    borderBottomColor: Colors.seafoamBlue
  },
  input: {
    fontSize: 23,
    color: Colors.seafoamBlue
  },
});

export default InputName;
