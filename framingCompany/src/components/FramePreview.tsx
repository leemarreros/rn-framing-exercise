import React, {useEffect, useState} from 'react';
import {Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {getImageWithFrame} from '../services/frames';
import Colors from '../utils/Colors';

interface Props {
  pictureBase64: string;
  isRoundedProfile: boolean;
  selectAFrame: (frameNumber: number) => void;
  frameNumber: number;
  frameName: string;
}

const FramePreview: React.FC<Props> = ({
  pictureBase64,
  isRoundedProfile,
  selectAFrame,
  frameNumber,
  frameName,
}) => {
  const [picturePerFrame, setPicturePerFrame] = useState(pictureBase64);

  useEffect(() => {
    const shape = isRoundedProfile ? 'Round' : 'Square';
    if (frameNumber !== 0) {
      getImageWithFrame(pictureBase64, shape, frameNumber)
        .then(data => {
          if (data !== undefined) {
            const {response} = data;
            console.log('response no r', response.substring(0, 10))
            console.log('response r', response.replace('data:image/jpeg;base64,', '').substring(0, 20))
            setPicturePerFrame(response.replace('data:image/png;base64,', ''));
          }
        })
        .catch(error => console.log('Error in Getting Frame', error));
    }
    setPicturePerFrame(pictureBase64);
    return () => {};
  }, [pictureBase64, isRoundedProfile]);

  return (
    <TouchableOpacity
      onPress={() => selectAFrame(frameNumber)}
      style={styles.frame}>
      <Text style={styles.frameName}>{frameName}</Text>
      <Image
        source={{uri: `data:image/jpeg;base64,${picturePerFrame}`}}
        style={[styles.pic, isRoundedProfile ? styles.rounded : null]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  frame: {
    marginRight: 15,
  },
  frameName: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Helvetica',
    marginBottom: 5,
    color: Colors.seafoamBlue,
  },
  rounded: {
    borderRadius: 80 / 2,
  },
  pic: {
    width: 80,
    height: 80,
  },
});

export default FramePreview;
