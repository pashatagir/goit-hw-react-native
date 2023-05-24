import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './Screens/AuthScreens/LoginScreen';
import { RegistrationScreen } from './Screens/AuthScreens/RegistrationScreen';
import { Home } from './Screens/MainScreens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { CommentsScreen } from './Screens/NestedScreens/CommentsScreen';
import { MapScreen } from './Screens/NestedScreens/MapScreen';

const AuthStack = createStackNavigator();

export const useRoute = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Registration" component={RegistrationScreen} />

        <AuthStack.Screen name="Home" component={Home} />
        <AuthStack.Screen name="Map" component={MapScreen} />
        <AuthStack.Screen name="Comments" component={CommentsScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
