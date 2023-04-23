import React from 'react';
import { PostsScreen } from './PostsScreen';
import { CreatePostsScreen } from './CreatePostsScreen';
import { ProfileScreen } from './ProfileScreen';
import { styles } from '../styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ArrowLeftIcon,
  GridIcon,
  LogOutIcon,
  PlusIcon,
  UserIcon,
} from '../../Components/Icons';
import { CommentsScreen } from './CommentsScreen';

const Tab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerShown: true,
        tabBarLabel: () => null,
        tabBarStyle: styles.tabMenu,
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused }) => <GridIcon focused={focused} />,
          headerTitleAlign: 'center',
          headerRight: () => (
            <LogOutIcon onPress={() => navigation.navigate('Login')} />
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
          backBehavior: 'order',
          headerLeft: () => (
            <ArrowLeftIcon onPress={() => navigation.navigate('Posts')} />
          ),
          headerLeftContainerStyle: { paddingLeft: 16 },

          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          tabBarIcon: ({ focused }) => <UserIcon focused={focused} />,
          headerTitleAlign: 'center',
          headerTitle: 'Comments',
          backBehavior: 'order',
          headerLeft: () => (
            <ArrowLeftIcon onPress={() => navigation.navigate('Posts')} />
          ),
          headerLeftContainerStyle: { paddingLeft: 16 },
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
};
