import React, {FC} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import theme from '../../assets/theme/theme';

interface FlatListFooterProps {
  showLoading: boolean;
  showText: boolean;
}

const FlatListFooter: FC<FlatListFooterProps> = ({showLoading, showText}) => {
  return (
    <>
      {showLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.colors.blue} size={20} />
          <Text style={styles.loadingText}>Loading ...</Text>
        </View>
      )}
      {showText && (
        <View style={styles.flatListFooterContainer}>
          <Text style={styles.flatListFooterText}>
            No more data at the moment
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    columnGap: 10,
  },
  loadingText: {
    fontSize: 14,
    color: theme.colors.darkGray,
  },
  flatListFooterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  flatListFooterText: {
    fontSize: 14,
    color: theme.colors.darkGray,
  },
});

export default FlatListFooter;
