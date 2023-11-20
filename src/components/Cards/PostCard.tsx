import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import theme from '../../assets/theme/theme';

interface PostCardProps {
  title: string;
  url: string;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  url,
  onClick,
}): JSX.Element => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.postContainer}>
        <Image source={{uri: url}} style={styles.postImage} />
        <Text style={styles.postTitleText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    marginLeft: 15,
    elevation: 10,
    shadowColor: theme.colors.black,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 20,
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

export default PostCard;
