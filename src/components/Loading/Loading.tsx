import React from 'react';
import {StyleSheet, Text, Image, ViewStyle} from 'react-native';
import {Overlay, OverlayProps} from 'react-native-elements';
import theme from '../../assets/theme/theme';
import DefaultProfilePhoto from '../../assets/images/loading.gif';

interface LoadingProps extends OverlayProps {
  isVisible: boolean;
}

const Loading: React.FC<LoadingProps> = ({isVisible, ...rest}) => {
  return (
    <Overlay
      isVisible={isVisible}
      backdropStyle={styles.backdropStyle}
      overlayStyle={styles.overlayStyle}>
      <Image source={DefaultProfilePhoto} style={styles.loading} />
      <Text style={styles.waitingText}>Please wait...</Text>
      <Text style={styles.waitingText}>Your request is being processed</Text>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  backdropStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loading: {
    width: 50,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  overlayStyle: {
    backgroundColor: theme.colors.white,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    elevation: 10,
    shadowColor: theme.colors.black,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 20,
    marginBottom: 15,
  },
  waitingText: {
    fontSize: 13,
    color: theme.colors.primaryColor,
  },
});

export default Loading;
