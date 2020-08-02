import React, {Component} from 'react';
import { StatusBar,SafeAreaView,StyleSheet  } from 'react-native';

import { Root } from 'native-base';
import Navigator from './navigation';

import SplashScreen from 'react-native-splash-screen';

const THEME_COLOR = '#285E29';
const BAR_HEIGHT = StatusBar.currentHeight;


class App extends Component {
	constructor(props: Props) {
	    super(props);

	    this.state = {
	      splashScreenTimer: null
	    };
	}

	componentDidMount() {
	    let splashScreenTimer = setInterval(this.hideSplashScreen, 1500);
	    this.setState({ splashScreenTimer });
	    console.disableYellowBox = true;

	    // SafeAreaView.setStatusBarHeight(0);
	    
	    // you can also add sound here :D
	}

	hideSplashScreen = () => {
	    SplashScreen.hide();
	    clearInterval(this.state.splashScreenTimer);
	}

	render() {
		return (
			<>
				<SafeAreaView style={styles.topSafeArea}>
					<Root style={styles.statusBar}>
						<StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#eaf3fa" translucent = {false}/>
						<Navigator />
					</Root>
				</SafeAreaView>
			</>
		)
	}


}

// const App = () => <Root><Navigator /></Root>;

export default App;

const styles = StyleSheet.create({
    topSafeArea: {
        flex: 1, 
        backgroundColor: THEME_COLOR
    }, 
    bottomSafeArea: {
        flex: 1, 
        backgroundColor: THEME_COLOR
    },
     statusBar: {
        height: BAR_HEIGHT
    }
});
