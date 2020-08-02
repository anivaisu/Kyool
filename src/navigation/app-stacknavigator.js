import { createStackNavigator,HeaderBackButton } from 'react-navigation-stack';
import { StatusBar,TouchableOpacity } from 'react-native';

import CsvScreen from '../screens/csv';
import ReorderingScreen from '../screens/reordering';
import SuccessScreen from '../screens/success';
import StudentsScreen from '../screens/students';
import ProfileDetailsScreen from '../screens/profileDetails';
import EditDetailsScreen from '../screens/editDetails';

import { Button,Text } from 'native-base';

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';
import { Icon } from 'native-base'

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});



const StackNavConfig = {
  initialRouteParams: 'Students',
  defaultNavigationOptions: ({ navigation }) => {
      return {
          default:StatusBar.setBackgroundColor('#eaf3fa'),
          headerStyle: {
              backgroundColor: '#eaf3fa'
          },
          headerTintColor: '#42526c',
          headerTitleStyle: {
              // fontWeight: 'bold',
              fontFamily: 'Inter-Bold',
              textAlign: 'center',
              flexGrow: 1,
          },
          headerRight: (
            <View style={styles.iconContainer}>
              <Icon
                style={{ paddingLeft: 40, color: '#42526c',fontSize:25 }}
                type="FontAwesome"
                name="list"
                size={25}
                onPress={() => navigation.navigate('Students')}
              />
             
            </View>
          ),
          headerLeft: (
            <Image style={{marginLeft:20,marginTop:5}} source={require('./../assets/images/logo-1.png')}/>
          ),

      };
  }
};

const RouteConfigs = {
  Csv: {
    screen: CsvScreen,
    navigationOptions: {
        headerTitle: 'People',
    }
  },
  Reorder: {
    screen: ReorderingScreen,
    navigationOptions: {
        headerTitle: 'People',
    }
  },
  Success: {
    screen: SuccessScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  Students: {
    screen: StudentsScreen,
    navigationOptions : ({ navigation }) => {
        const isGrid = navigation.getParam('Grid');
        return {
          headerTitle: 'Player Roster',
          headerRight: isGrid ? (
            <View style={styles.iconContainer}>
              <Icon
                style={{ paddingLeft: 20, color: '#42526c',fontSize:25,paddingTop:3 }}
                type="FontAwesome"
                name="cloud-upload"
                onPress={() => navigation.navigate('Csv')}
              />
              
            </View> 
          ) : (
            <View style={styles.iconContainer}>
              <Icon
                style={{ paddingLeft: 20, color: '#42526c',fontSize:25,paddingTop:3 }}
                type="FontAwesome"
                name="cloud-upload"
                size={20}
                onPress={() => navigation.navigate('Csv')}
              />
              
            </View>
          )
        };
    }
  },
  ProfileDetails: {
    screen: ProfileDetailsScreen,
    
    navigationOptions : ({ navigation }) => {
      return {
          headerTitle: 'Profile Details',
          headerLeft: (<HeaderBackButton onPress={_ => navigation.goBack(null)}/>),
          headerRight : <View></View>
      }
    }
  },
  EditDetails: {
    screen: EditDetailsScreen,
    navigationOptions : ({ navigation }) => {
      let clicked =  navigation.getParam('clicked');
      return {
          headerTitle: <Text style={{fontFamily:'Inter-Bold',color:'#42526c',fontSize:18}}>Edit Details</Text>,
          headerTintColor :'#42526c',
          headerLeft: (<HeaderBackButton onPress={_ => navigation.goBack(null)}/>),
          headerRight : <View style={{flex:1,flexDirection:'row'}}>
            <TouchableOpacity>
              <Button  small rounded onPress={() => navigation.goBack()} style={{backgroundColor : '#87c351',marginRight:10}} >
                <Text style={{color:'#fff',fontSize:13,fontFamily:'Inter-Medium',textTransform: 'capitalize'}}>Cancel</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity disabled={clicked}>
              <Button  small rounded onPress={() => navigation.getParam('update')()} style={{backgroundColor : '#87c351',marginRight:10}} >
                {
                  clicked ?  <Text style={{color:'#fff',fontSize:13,fontFamily:'Inter-Medium',textTransform: 'capitalize'}}>Wait...</Text>
                  : <Text style={{color:'#fff',fontSize:13,fontFamily:'Inter-Medium',textTransform: 'capitalize'}}>Done</Text>
                }
              </Button>
            </TouchableOpacity>
          </View>
      }
    }
  }
};

const AppStackNavigator = createStackNavigator(RouteConfigs,StackNavConfig);

export default AppStackNavigator;