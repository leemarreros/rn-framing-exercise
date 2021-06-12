import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import FramePreview from '../components/FramePreview';

const framesList = [
  {frameNumber: 0, frameName: 'None'},
  {frameNumber: 1, frameName: 'San Francisco'},
  {frameNumber: 2, frameName: 'Flower'},
  {frameNumber: 3, frameName: 'Square'},
];

interface PropsCarrousel {
  editingMode: boolean;
  isRoundedProfile: boolean;
  pictureUpdated: string;
  updateMainPicture: Function;
}

const FramesCarrousel: React.FC<PropsCarrousel> = ({
  editingMode,
  isRoundedProfile,
  pictureUpdated,
  updateMainPicture,
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
          <FramePreview
            frameName={frameName}
            key={index.toString()}
            isRoundedProfile={isRoundedProfile}
            pictureUpdated={pictureUpdated}
            updateMainPicture={updateMainPicture}
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
