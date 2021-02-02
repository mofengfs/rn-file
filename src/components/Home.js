import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView, View, Platform, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Card from './Card';
import * as fs from '../helpers/fs';
import { COLOR, SIZE, SHADOW } from '../constants';

const Home = ({ startEditing, external, setExternal }) => {
  const [fileDeleted, setFileDeleted] = useState('');
  const [files, setFiles] = useState(null);
  useEffect(() => {
    (async () => {
      const newFiles = await fs.getFiles(external = external);
      setFiles(newFiles);
    })();
  }, [fileDeleted, external]);

  const onPress = () => startEditing();

  const toggleExternal = async () => {
    try {
      if (!external) {
        let [readGranted, writeGranted] = await Promise.all([PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE), PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)]);
        if (!readGranted || !writeGranted) {
          const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]);
          if (granted["android.permission.READ_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED && granted["android.permission.WRITE_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED) {
            setExternal(true);
          }
        } else {
          setExternal(true);
        }
      } else {
        setExternal(!external);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Notes ({(!files || !files.length) ? 0 : files.length})</Text>
        {Platform.OS === 'android' &&
          <TouchableOpacity onPress={toggleExternal} style={external ? styles.activeButton : styles.inactiveButton}>
            <Text style={styles.buttonText}>External</Text>
          </TouchableOpacity>
        }
      </View>
      <ScrollView>
        {files && files.map(f => <Card key={f.name} file={f} startEditing={startEditing} setFileDeleted={setFileDeleted} external={external}/>)}
      </ScrollView>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Icon name='plus' size={SIZE.large * 1.8} color={COLOR.info} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
    padding: 8,
  },
  scrollView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: COLOR.info,
    borderBottomWidth: 0.7,
    paddingBottom: 4,
    marginBottom: 8,
    alignItems: 'center'
  },
  header: {
    fontSize: SIZE.large,
    fontFamily: 'JosefinSlabRegular',
    color: COLOR.foreground,
  },
  button: {
    backgroundColor: COLOR.colorBackground,
    position: 'absolute',
    right: 16,
    bottom: 16,
    borderRadius: SIZE.large * 0.9,
    ...SHADOW,
  },
  buttonText: {
    fontSize: SIZE.small,
    fontFamily: 'JosefinSlabRegular',
    color: COLOR.foreground,
  },
  activeButton: {
    backgroundColor: COLOR.colorBackground,
    // borderColor: COLOR.info,
    // borderWidth: 0.5,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  inactiveButton: {
    borderColor: COLOR.info,
    borderWidth: 0.5,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  }
});

export default Home;
