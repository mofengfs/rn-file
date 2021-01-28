import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import * as fs from '../helpers/fs';
import { COLOR, SIZE } from '../constants';

const Editor = ({ stopEditing, fileName }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  useEffect(() => {
    (async () => {
      if (!fileName) {
        const newName = nanoid();
        // TODO: check name collision
        setName(newName);
      } else {
        await fs.init();
        const content = await fs.readFile(fileName);
        setContent(content);
        setName(fileName);
      }
    })();
  }, []);

  const onPressClose = () => stopEditing();
  const onPressSave = async () => {
    if (fileName) await fs.updateFile(fileName, name, content)
    else await fs.createFile(name, content)
    stopEditing();
  };

  const onEndEditingName = () => {
    if (!name) {
      if (fileName) setName(fileName)
      else setName(nanoid())
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onPressClose}>
          <Icon name='close' size={SIZE.large} color={COLOR.danger} />
        </TouchableOpacity>
        <TextInput style={styles.header} value={name} onChangeText={setName} onEndEditing={onEndEditingName} />
        <TouchableOpacity onPress={onPressSave}>
          <Icon name='check' size={SIZE.large} color={COLOR.foreground} />
        </TouchableOpacity>
      </View>
      <TextInput placeholder='Enter your note here...' style={styles.content} value={content} onChangeText={setContent} multiline={true}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
    padding: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    borderColor: COLOR.foreground,
    borderBottomWidth: 1,
    color: COLOR.foreground,
    fontSize: SIZE.normal,
    fontFamily: 'JosefinSlabRegular',
    flex: 1,
    marginHorizontal: 20,
  },
  content: {
    textAlign: 'justify',
    margin: 8,
    fontSize: SIZE.small,
    fontFamily: 'JosefinSlabRegular',
    color: COLOR.foreground,
    flex: 1,
    textAlignVertical: 'top',
  }
});

export default Editor;