'use strict';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './home';
import MapDemo from './mapDemo';
import GeolocationDem from './geolocationDemo';
import SearchDemo from './searchDemo';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    MapDemo: {
      screen: MapDemo,
    },
    GeolocationDem: {
      screen: GeolocationDem,
    },
    SearchDemo: {
      screen: SearchDemo,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);