import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Card from './Card';
import * as fs from '../helpers/fs';
import { COLOR, SIZE, SHADOW } from '../constants';

const Home = ({ startEditing }) => {
  const [fileDeleted, setFileDeleted] = useState('');
  const [files, setFiles] = useState(null);
  useEffect(() => {
    (async () => {
      const newFiles = await fs.getFiles();
      setFiles(newFiles);
    })();
  }, [fileDeleted]);

  const onPress = () => startEditing();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notes ({(!files || !files.length) ? 0 : files.length})</Text>
      <ScrollView>
        {files && files.map(f => <Card key={f.name} file={f} startEditing={startEditing} setFileDeleted={setFileDeleted} />)}
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
  header: {
    fontSize: SIZE.large,
    fontFamily: 'JosefinSlabRegular',
    color: COLOR.foreground,
    borderColor: COLOR.info,
    borderBottomWidth: 0.7,
    paddingBottom: 4,
    marginBottom: 8,
  },
  button: {
    backgroundColor: COLOR.colorBackground,
    position: 'absolute',
    right: 16,
    bottom: 16,
    borderRadius: SIZE.large * 0.9,
    ...SHADOW,
  }
});

export default Home;
