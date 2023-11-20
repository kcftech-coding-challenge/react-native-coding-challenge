import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {RootStackParamList} from '../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ReadScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Read'
>;

interface ReadProps {
  navigation: ReadScreenNavigationProp;
  route: any;
}

const Read: React.FC<ReadProps> = ({route}): JSX.Element => {
  return (
    <View style={styles.readContainer}>
      <Image source={{uri: route.params.url}} style={styles.postImage} />
      <Text style={styles.postTitleText}>{route.params.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  readContainer: {
    flex: 1,
    padding: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postTitleText: {
    fontSize: 14,
    color: '#000000',
    paddingTop: 10,
  },
});

export default Read;
