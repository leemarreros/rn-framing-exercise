/**
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import Button from '../components/Button';
import WelcomeName from '../components/WelcomeName';
import InputName from '../components/InputName';
import FramesCarrousel from '../features/framesCarrousel';
import Colors from '../utils/Colors';
import ImagePlaceholder from '../utils/ImagePlaceholder';

const height = Dimensions.get('window').height;
const logo = '../images/logo.png';
const changeIcon = '../images/change.png';
const profilePicSize = 220;

const App = () => {
  const [pictureUpdated, updatePicture] = React.useState(
    ImagePlaceholder.profilePic64,
  );
  const [mainPicture, updateMainPicture] = React.useState(
    ImagePlaceholder.profilePic64,
  );
  const [editingMode, setEditingMode] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [isRoundedProfile, setShapeProfile] = React.useState(true);
  const [frameNumberActive, setFrameNumberActive] = React.useState(0);

  useEffect(() => {
    updateMainPicture(pictureUpdated);
  }, [pictureUpdated]);

  return (
    <SafeAreaView style={styles.containerApp}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              testID="logoImage"
              source={require(logo)}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.welcomeName}>
            {editingMode ? (
              <InputName
                userName={userName}
                editingMode={editingMode}
                setUserName={setUserName}
              />
            ) : (
              <WelcomeName
                title={`Hello${userName === '' ? '' : ' '}${userName}!`}
              />
            )}
          </View>
          <View style={styles.userPictureContainer}>
            <View style={styles.top}>
              <View style={styles.squareRoundButtons}>
                {editingMode && (
                  <TouchableOpacity
                    testID="buttonShapeSquare"
                    onPress={() => setShapeProfile(false)}
                    style={[styles.buttonLeft, styles.squareButton]}
                  />
                )}
                {editingMode && (
                  <TouchableOpacity
                    testID="buttonShapeRound"
                    onPress={() => setShapeProfile(true)}
                    style={[styles.buttonLeft, styles.roundedButton]}
                  />
                )}
              </View>
              <View
                style={[
                  styles.userPictureWrap,
                  isRoundedProfile ? styles.userPictureWrapRounded : null,
                ]}>
                <Image
                  testID="mainPicture"
                  source={{uri: `data:image/jpeg;base64,${mainPicture}`}}
                  style={[
                    styles.userPicture,
                    isRoundedProfile ? styles.userPictureRounded : null,
                  ]}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.changePictureButton}>
                {editingMode && (
                  <TouchableOpacity
                    testID="buttonChangePicture"
                    onPress={() => {
                      ImagePicker.openPicker({
                        width: 300,
                        height: 300,
                        cropping: true,
                        includeBase64: true,
                      })
                        .then(image => {
                          // @ts-ignore
                          updatePicture(image.data);
                        })
                        .catch((error: Error) => {
                          throw new Error('Image Picker didn\'t respond.');
                        });
                    }}
                    activeOpacity={0.75}>
                    <Image
                      style={styles.changeIcon}
                      source={require(changeIcon)}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View style={styles.carrousel}>
            <FramesCarrousel
              setFrameNumberActive={setFrameNumberActive}
              frameNumberActive={frameNumberActive}
              updateMainPicture={updateMainPicture}
              editingMode={editingMode}
              isRoundedProfile={isRoundedProfile}
              pictureUpdated={pictureUpdated}
            />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title={editingMode ? 'Publish' : 'Edit Profile'}
            onPress={() => setEditingMode(!editingMode)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerApp: {
    flex: 1,
    backgroundColor: Colors.indigoBlue,
  },
  scrollViewStyle: {
    flexDirection: 'column',
    ...(Platform.OS === 'android' ? {height: height} : {flex: 1}),
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
    justifyContent: 'center',
  },
  top: {
    flexDirection: 'row',
    width: '100%',
  },
  squareRoundButtons: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonLeft: {
    width: 35,
    height: 35,
    backgroundColor: Colors.melon,
    borderWidth: 5,
    borderColor: Colors.seafoamBlue,
    opacity: 0.6,
  },
  squareButton: {},
  roundedButton: {
    borderRadius: 35 / 2,
  },
  userPictureWrap: {
    width: profilePicSize,
    height: profilePicSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.seafoamBlue,
    borderWidth: 5,
  },
  userPictureWrapRounded: {
    borderRadius: profilePicSize / 2,
  },
  changePictureButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.65,
  },
  changeIcon: {
    width: 35,
    height: 35,
  },
  userPicture: {
    width: profilePicSize - 10,
    height: profilePicSize - 10,
  },
  userPictureRounded: {
    borderRadius: profilePicSize - 10 / 2,
  },
  carrousel: {
    width: '100%',
    flex: 1.5,
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
