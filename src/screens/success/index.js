import React, { PureComponent } from 'react';
import {SafeAreaView, StyleSheet, Text,View,Image} from 'react-native';


import { Button,Icon } from 'native-base';
import globalStyle from './../../assets/styles'
import { Title } from 'native-base';

class SuccessScreen extends PureComponent {

  constructor(props) {
    super(props);
    this.move = this.move.bind(this);
  }

  move() {
    this.props.navigation.navigate('Students');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 3, flexDirection: 'row'}}>
          <Image style={{resizeMode:'center'}} source={require('./../../assets/images/succesfull.png')}/>
        </View>
        
        <View style={{ flex: 2,padding:15}}>
          <Title style={{color:'#415270',textAlign:'center',fontSize:25}}>Successfully Imported</Title>

          <View style={{width:'80%',alignSelf:'center',padding:10}}>
            <Text style={{color:'#919dad',textAlign:'center',lineHeight:25}}>Records have been successfully imported from .CSV file</Text>
          </View>
          
          <Button block onPress={this.move} style={[globalStyle.buttonColor,{width:250,alignSelf: 'center'}]}>
            <Text style={{color : '#fff',fontSize:20}}>View Records</Text>
          </Button>
        </View>
      </View>
    )
  }
  
}

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
  	flex:1,
  	padding:50,
  	alignItems:"center",
  },
  title: {
  	marginTop:100,
    fontSize: 25,
    fontWeight: 'bold',
  },
});