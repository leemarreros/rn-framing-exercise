/**
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import Button from '../components/Button';
import WelcomeName from '../components/WelcomeName';
import InputName from '../components/InputName';
import Colors from '../utils/Colors';
import ImagePlaceholder from '../utils/ImagePlaceholder';
const logo = '../images/logo.png';
const profilePath = '../images/profile.png';
const changeIcon = '../images/change.png';
const profilePicSize = 220;

const App = () => {
  const [profilePic, setProfilePic] = useState(ImagePlaceholder.profilePic64);
  const [editingMode, setEditingMode] = useState(false);
  const [userName, setUserName] = useState('');
  const [isRoundedProfile, setShapeProfile] = useState(true);

  return (
    <SafeAreaView style={styles.containerApp}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
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
                  onPress={() => setShapeProfile(false)}
                  style={[styles.buttonLeft, styles.squareButton]}
                />
              )}
              {editingMode && (
                <TouchableOpacity
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
                source={{uri: `data:image/jpeg;base64,${profilePic}`}}
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
                  onPress={() => {
                    ImagePicker.openPicker({
                      width: 300,
                      height: 400,
                      cropping: true,
                      includeBase64: true,
                    }).then(image => {
                      setProfilePic(image.data);
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
      </View>
      <View style={styles.button}>
        <Button
          title={editingMode ? 'Publish' : 'Edit Profile'}
          onPress={() => setEditingMode(!editingMode)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerApp: {
    flex: 1,
    backgroundColor: Colors.indigoBlue,
    flexDirection: 'column',
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
    alignItems: 'center',
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
  newPictureText: {
    color: Colors.seafoamBlue,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    marginTop: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
