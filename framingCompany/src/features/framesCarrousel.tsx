import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '../utils/Colors';

const framesList = [
  {frameNumber: 0, frameName: 'None'},
  {frameNumber: 1, frameName: '1'},
  {frameNumber: 2, frameName: '2'},
  {frameNumber: 3, frameName: '3'},
  {frameNumber: 4, frameName: '4'},
];

interface PropsFrame {
  pictureBase64: string;
  isRoundedProfile: boolean;
  selectAFrame: (frameNumber: number) => void;
  frameNumber: number;
  frameName: string;
}

interface PropsCarrousel {
  editingMode: boolean;
  isRoundedProfile: boolean;
  pictureBase64: string;
}

const Frame: React.FC<PropsFrame> = ({
  pictureBase64,
  isRoundedProfile,
  selectAFrame,
  frameNumber,
  frameName,
}) => {
  return (
    <TouchableOpacity
      onPress={() => selectAFrame(frameNumber)}
      style={stylesFrame.frame}>
      <Text style={stylesFrame.frameName}>{frameName}</Text>
      <Image
        source={{uri: `data:image/jpeg;base64,${pictureBase64}`}}
        style={[stylesFrame.pic, isRoundedProfile ? stylesFrame.rounded : null]}
      />
    </TouchableOpacity>
  );
};

const stylesFrame = StyleSheet.create({
  frame: {
    marginRight: 15,
  },
  frameName: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
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

const FramesCarrousel: React.FC<PropsCarrousel> = ({
  editingMode,
  isRoundedProfile,
  pictureBase64,
}) => {
  return editingMode ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.scrollStyle}>
      {framesList.map((frame, index) => {
        const {frameNumber, frameName} = frame;
        return (
          <Frame
            frameName={frameName}
            key={index.toString()}
            isRoundedProfile={isRoundedProfile}
            pictureBase64={pictureBase64}
            selectAFrame={frameNumber => console.log(frameNumber)}
            frameNumber={frameNumber}
          />
        );
      })}
    </ScrollView>
  ) : null;
};

const styles = StyleSheet.create({
  scroll: {
    height: '100%',
    width: '95%',
  },
  scrollStyle: {
    alignItems: 'center',
  },
});

export default FramesCarrousel;
