import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import FramePreview from '../components/FramePreview';
import {arrayFrameNames, FrameNamesType} from '../../types/types';

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
      {arrayFrameNames.map((frameName: FrameNamesType, index: number) => {
        return (
          <FramePreview
            frameName={frameName}
            key={index.toString()}
            isRoundedProfile={isRoundedProfile}
            pictureUpdated={pictureUpdated}
            updateMainPicture={updateMainPicture}
            frameNumber={index}
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
