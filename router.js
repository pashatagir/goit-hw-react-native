import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './Screens/AuthScreens/LoginScreen';
import { RegistrationScreen } from './Screens/AuthScreens/RegistrationScreen';
import { Home } from './Screens/MainScreens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { CommentsScreen } from './Screens/NestedScreens/CommentsScreen';
import { MapScreen } from './Screens/NestedScreens/MapScreen';
import { CameraScreen } from './Screens/NestedScreens/CameraScreen';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './redux/auth/authSelectors';
import { useEffect } from 'react';
import { authUpdateStatus } from './redux/auth/authOperations';

const AuthStack = createStackNavigator();

export const Routing = () => {
  const { isCurrentUser } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUpdateStatus());
  }, []);
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        {!isCurrentUser && (
          <>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen
              name="Registration"
              component={RegistrationScreen}
            />
          </>
        )}
        {isCurrentUser && <AuthStack.Screen name="Home" component={Home} />}
        <AuthStack.Screen name="Map" component={MapScreen} />
        <AuthStack.Screen name="Comments" component={CommentsScreen} />
        <AuthStack.Screen name="Camera" component={CameraScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
