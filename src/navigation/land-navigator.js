import {createStackNavigator} from 'react-navigation-stack';

import LandScreen from '../screens/landing';

// const LandingNavConfig = {
//   initialRouteParams: 'Landing',
//   header: null,
//   headerMode: 'none',
// };

const RouteConfigs = {
  Landing: {
    screen: LandScreen
  }
};



const LandingNavigator = createStackNavigator(RouteConfigs);

export default LandingNavigator;

