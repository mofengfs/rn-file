import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Pressable, Modal, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as fs from '../helpers/fs';
import { COLOR, SIZE, SHADOW } from '../constants';

const Card = ({ file, startEditing, setFileDeleted }) => {
  const [visible, setVisible] = useState(false);
  const onPress = () => startEditing(file.name);
  const onLongPress = () => setVisible(true);
  const onCancel = () => setVisible(false);
  const onDelete = async () => {
    await fs.deleteFile(file.name);
    setFileDeleted(file.name);
    setVisible(false);
  };

  return (
    <>
      <Modal visible={visible} transparent={true}>
        <View style={styles.container}>
          <View style={styles.dialogContainer}>
            <Text style={styles.text}>Delete {file.name}?</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={onCancel} style={styles.button}>
                <Icon name='close' size={SIZE.large} color={COLOR.foreground} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete} style={{ ...styles.button, borderColor: COLOR.danger }}>
                <Icon name='check' size={SIZE.large} color={COLOR.danger} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.card}>
        <Text style={styles.name}>{file.name}</Text>
        <Text style={styles.content}>{file.head}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.transparentBackground,
    padding: 8,
    justifyContent: 'center',
  },
  dialogContainer: {
    backgroundColor: COLOR.background,
    margin: 8,
    padding: 8,
    borderRadius: 8,
    ...SHADOW,
  },
  text: {
    textAlign: 'center',
    fontSize: SIZE.normal,
    fontFamily: 'JosefinSlabRegular',
    color: COLOR.foreground,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 8,
    marginTop: 16,
    marginBottom: 4,
    borderRadius: 6,
    borderColor: COLOR.foreground,
    borderWidth: 1,
  },
  card: {
    backgroundColor: COLOR.colorBackground,
    padding: 16,
    margin: 8,
    minHeight: 3 * SIZE.normal,
    borderRadius: 8,
  },
  content: {
    fontSize: SIZE.small,
    fontFamily: 'JosefinSlabLight',
    color: COLOR.foreground,
    marginHorizontal: 16,
  },
  name: {
    fontSize: SIZE.normal,
    fontFamily: 'JosefinSlabRegular',
    color: COLOR.info,
    borderColor: COLOR.info,
    borderBottomWidth: 0.5,
    paddingBottom: 6,
    marginBottom: 8,
  }
});

export default Card;