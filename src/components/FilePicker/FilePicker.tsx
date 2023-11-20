import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCloudArrowUp} from '@fortawesome/free-solid-svg-icons';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import theme from '../../assets/theme/theme';

interface FilePickerProps {
  file: string;
  setFile: (file: string) => void;
  editable?: boolean;
  style?: StyleProp<ViewStyle>;
}

const FilePicker: FC<FilePickerProps> = ({
  file,
  setFile,
  editable = true,
  style,
}) => {
  const handleChooseFile = () => {
    const options: ImageLibraryOptions = {
      maxHeight: 250,
      maxWidth: 350,
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.info('Image picker was canceled');
      } else if (response.errorMessage) {
        console.info('Image picker error: ', response.errorMessage);
      } else {
        const firstAsset = response.assets?.[0];
        if (firstAsset) {
          const fileType = firstAsset.type;
          const base64String = firstAsset.base64;
          if (fileType && base64String) {
            setFile(`data:${fileType};base64,${base64String}`);
          }
        }
      }
    });
  };

  return (
    <TouchableHighlight
      onPress={() => editable && handleChooseFile()}
      activeOpacity={0.5}
      underlayColor={editable ? 'transparent' : theme.colors.gray}
      style={[
        styles.filePickerClickableContainer,
        !editable && {backgroundColor: theme.colors.gray},
      ]}>
      <>
        <FontAwesomeIcon
          icon={faCloudArrowUp}
          size={30}
          style={styles.uploadIcon}
        />
        <Text style={styles.uploadText}>Select file</Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  filePickerContainer: {
    flex: 1,
    marginBottom: 20,
  },
  filePickerClickableContainer: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
  },
  uploadIcon: {
    color: theme.colors.gray,
  },
  uploadText: {
    fontSize: 14,
    color: theme.colors.darkGray,
    paddingTop: 5,
  },
});

export default FilePicker;
