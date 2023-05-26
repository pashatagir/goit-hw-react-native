import { PostsScreen } from './PostsScreen';
import { CreatePostsScreen } from './CreatePostsScreen';
import { ProfileScreen } from './ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ArrowLeftIcon,
  GridIcon,
  LogOutIcon,
  PlusIcon,
  UserIcon,
} from '../../Components/Icons';
import { MapScreen } from '../NestedScreens/MapScreen';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../redux/auth/authOperations';

const Tab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerShown: true,
        tabBarLabel: () => null,
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingHorizontal: 16,
          boxShadow: '0px -0.5px 0px rgba(0, 0, 0, 0.3)',
          paddingLeft: 45,
          position: 'absolute',
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused }) => <GridIcon focused={focused} />,
          headerTitleAlign: 'center',
          headerRight: () => (
            <LogOutIcon
              onPress={() => {
                dispatch(authLogout());
              }}
            />
          ),
          headerRightContainerStyle: { paddingRight: 16 },
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused }) => <PlusIcon focused={focused} />,
          headerTitleAlign: 'center',
          headerTitle: 'Create post',
          headerLeft: () => (
            <ArrowLeftIcon onPress={() => navigation.navigate('Posts')} />
          ),
          headerLeftContainerStyle: { paddingLeft: 16 },

          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <UserIcon focused={focused} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
