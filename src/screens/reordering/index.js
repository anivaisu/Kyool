import React, { PureComponent } from 'react';
import {SafeAreaView, StyleSheet, Text,View} from 'react-native';
import { Icon,Button } from 'native-base';

class ReorderingScreen extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return  (
      <View style={styles.container}>
          <Text style={{fontSize:18,padding:10,color:'#42526c'}}> Map & Reorder Imported Fields</Text>

          <View style={{ flex: 0.1,flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>

            <View style={{ flex: 4,flexDirection:'row'}}>
              <Icon
                style={{paddingLeft:10,color: '#42526c' }}
                type="Entypo"
                name="grid"
                size={30}
              />
              <Text style={{justifyContent: 'center',fontSize:15,padding:3}}>Drag and drop the list</Text>
            </View>

            <View style={{ flex: 2}} >
              <Button rounded light style={{width:140,backgroundColor:'#e8ebf2'}}>
                <Icon
                  style={{color: '#42526c',fontSize:17 }}
                  type="AntDesign"
                  name="arrowsalt"
                  size={10}
                />
                <Text>Primary</Text>
              </Button>
            </View>
          </View>
      </View>
    )
  } 
}

export default ReorderingScreen;

const styles = StyleSheet.create({
  container: {
  	flex:1
  },
  title: {
  	marginTop:100,
    fontSize: 25,
    fontWeight: 'bold',
  },
});