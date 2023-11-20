import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Button} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppProvider from './contexts/appContext';
import Home from './screens/HomeScreen';
import Add from './screens/AddScreen';
import Read from './screens/ReadScreen';
import theme from './assets/theme/theme';

library.add(fab, fas, far);

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.blue}
        barStyle={'light-content'}
        translucent={false}
        networkActivityIndicatorVisible={true}
        showHideTransition={'slide'}
        hidden={false}
      />
      <GestureHandlerRootView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={({navigation}) => ({
                    headerRight: () => (
                      <Button
                        onPress={() => navigation.navigate('Add')}
                        title="Create"
                      />
                    ),
                  })}
                />
                <Stack.Screen name="Add" component={Add} />
                <Stack.Screen name="Read" component={Read} />
              </Stack.Navigator>
            </NavigationContainer>
          </AppProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
  },
});

export default App;
