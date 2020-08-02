import {createAppContainer, createSwitchNavigator} from 'react-navigation';


import AppStackNavigator from './app-stacknavigator';
// import LandingNavigator from './land-navigator';
import LandScreen from '../screens/landing';

const RootNavigator = createSwitchNavigator(
  {
    App: AppStackNavigator,
    land : {
    	screen : LandScreen
    }
  },
  {
    initialRouteName: 'land',
  }
);

export default createAppContainer(RootNavigator);

