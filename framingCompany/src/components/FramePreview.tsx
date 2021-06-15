import React, {useEffect, useState} from 'react';
import {Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {responseFrameI, ShapeEnum, ShapeType} from '../../types/types';

import {getImageWithFrame} from '../services/frames';
import Colors from '../utils/Colors';

interface Props {
  pictureUpdated: string;
  isRoundedProfile: boolean;
  frameNumber: number;
  frameNumberActive: number;
  frameName: string;
  updateMainPicture: Function;
  setFrameNumberActive: Function;
}

const FramePreview: React.FC<Props> = ({
  pictureUpdated,
  isRoundedProfile,
  frameNumber,
  frameName,
  updateMainPicture,
  frameNumberActive,
  setFrameNumberActive,
  editingMode,
}) => {
  const [picturePerFrame, setPicturePerFrame] = useState(pictureUpdated);

  useEffect(() => {
    console.log('editingMode', editingMode)
    const shape: ShapeType = isRoundedProfile
      ? ShapeEnum.ROUND
      : ShapeEnum.SQUARE;
    if (frameNumber !== 0) {
      getImageWithFrame(pictureUpdated, shape, frameNumber)
        .then((data: responseFrameI) => {
          if (data !== undefined) {
            const {response} = data;
            setPicturePerFrame(response.replace('data:image/png;base64,', ''));
            if (frameNumber === frameNumberActive) {
              updateMainPicture(response.replace('data:image/png;base64,', ''));
            }
          }
        })
        .catch((error: Error) => {
          throw new Error('Error in Getting Frame');
        });
    }
    setPicturePerFrame(pictureUpdated);


  }, [pictureUpdated, isRoundedProfile, editingMode]);

  return (
    <TouchableOpacity
      testID="buttonFramePreview"
      onPress={() => {
        updateMainPicture(picturePerFrame)
        setFrameNumberActive(frameNumber)
      }}
      style={styles.frame}>
      <Text style={styles.frameName}>{frameName}</Text>
      <Image
        testID="imageCarrousel"
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
