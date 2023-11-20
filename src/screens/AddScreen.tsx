import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import {useMutation} from 'react-query';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FilePicker from '../components/FilePicker/FilePicker';
import Loading from '../components/Loading/Loading';
import {RootStackParamList} from '../types';

type AddScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Add'
>;

interface AddProps {
  navigation: AddScreenNavigationProp;
  route: any;
}

interface AddFormData {
  title: string;
  description: string;
  photo: string;
}

const Add: React.FC<AddProps> = ({navigation}): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<AddFormData>({
    title: '',
    description: '',
    photo: '',
  });

  const onChangeText = (key: keyof AddFormData, value: string) => {
    setFormData(prevData => ({...prevData, [key]: value}));
  };

  const createPostMutation = useMutation((formData: AddFormData) =>
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }),
  );

  const submitForm = async () => {
    setIsLoading(true);
    try {
      if (formData.title === '') {
        throw Error(`Please enter post title`);
      } else if (formData.description === '') {
        throw Error(`Please enter post description`);
      } else if (formData.photo === '') {
        throw Error(`Please select post photo`);
      } else {
        await createPostMutation.mutateAsync(formData);
        Alert.alert('Success', 'Post created successfully', [
          {text: 'Okay', onPress: () => navigation.goBack()},
        ]);
      }
    } catch (error: any) {
      Alert.alert('Failure', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.createContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Loading isVisible={isLoading} />
          <Text style={styles.labelText}>Post Title</Text>
          <TextInput
            value={formData.title}
            onChangeText={text => onChangeText('title', text)}
            placeholder="Please enter title"
            style={styles.inputText}
          />
          <Text style={styles.labelText}>Description</Text>
          <TextInput
            value={formData.description}
            onChangeText={text => onChangeText('description', text)}
            placeholder="Please enter description"
            multiline
            style={styles.inputTextArea}
          />
          <Text style={styles.labelText}>Image</Text>
          <FilePicker
            file={formData.photo}
            setFile={photo => onChangeText('photo', photo)}
            style={styles.inputTextArea}
          />
          {formData.photo !== '' && (
            <Image
              source={{uri: formData.photo}}
              style={styles.selectedImage}
            />
          )}
          <Button title="Submit" onPress={submitForm} />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  createContainer: {
    flex: 1,
    padding: 20,
  },
  labelText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#000000',
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#c1c1c1',
    backgroundColor: '#ffffff',
    fontSize: 14,
    color: '#000000',
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    marginBottom: 10,
  },
  inputTextArea: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#c1c1c1',
    backgroundColor: '#ffffff',
    fontSize: 14,
    color: '#000000',
    padding: 15,
    marginBottom: 10,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default Add;
