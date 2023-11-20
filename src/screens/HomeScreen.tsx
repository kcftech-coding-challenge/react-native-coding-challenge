import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppContext} from '../contexts/appContext';
import PostCard from '../components/Cards/PostCard';
import FlatListFooter from '../components/FlatListFooter/FlatListFooter';
import theme from '../assets/theme/theme';
import {RootStackParamList} from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeProps {
  navigation: HomeScreenNavigationProp;
}

const Home: React.FC<HomeProps> = ({navigation}): JSX.Element => {
  let totalPosts = 500;
  let recordsPerPage = 5;
  const totalPages = totalPosts / recordsPerPage;
  const appContext = useContext(AppContext);
  const {list, fetchData} = appContext;
  const [pageNumber, setPageNumber] = useState<number>(0);

  const loadNextPage = () => {
    if (pageNumber <= totalPages) {
      setPageNumber(pageNumber => pageNumber + 1);
    }
  };

  useEffect(() => {
    fetchData(pageNumber, recordsPerPage);
  }, [pageNumber]);

  useEffect(() => {
    fetchData(pageNumber, recordsPerPage);
  }, []);

  return (
    <FlatList
      data={list}
      renderItem={({item}) => (
        <PostCard
          {...item}
          onClick={() => navigation.navigate('Read', {...item})}
        />
      )}
      keyExtractor={(_, index) => index.toString()}
      ItemSeparatorComponent={() => <View style={styles.itemSeperator}></View>}
      ListEmptyComponent={
        <View>
          <Text>No posts found</Text>
        </View>
      }
      ListHeaderComponent={
        <View style={styles.postsHeadingContainer}>
          <Text style={styles.postsHeadingText}>Your photos</Text>
        </View>
      }
      ListFooterComponent={() => (
        <FlatListFooter
          showLoading={pageNumber <= totalPages}
          showText={pageNumber === totalPages}
        />
      )}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.1}
    />
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  postsHeadingContainer: {
    padding: 15,
  },
  postsHeadingText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: theme.colors.black,
  },
  itemSeperator: {
    margin: 7.5,
  },
});

export default Home;
