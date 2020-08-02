import React, { PureComponent } from 'react';
import {SafeAreaView, StyleSheet, Text,View,ScrollView,TouchableOpacity,AsyncStorage,ActivityIndicator} from 'react-native';
import { Card, CardItem, Icon,Button,Title } from 'native-base';
import { Avatar,Badge } from 'react-native-elements';

import { getAll } from './../../services/apiCall';

class ProfileDetailsScreen extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      studentId : null,
      studentDetails : null,
      loading : true
    }
    this.next = this.next.bind(this);
    this.getData = this.getData.bind(this);
    this.studId = this.props.navigation.getParam('studentId');
    this.getData();
  }

  componentDidMount() {
    const {navigation} = this.props;
      navigation.addListener ('willFocus', () =>{
      // do whatever you want to do when focused
      this.getData();
    });
  }

  next() {
    this.props.navigation.navigate('EditDetails',{studentId : this.studId})
  }

  getData() {
    let params = {
        studentId : this.studId
    }
    
    
    getAll('student/getStudentInfo',params)
      .then(response => response.json())
      .then((res)=>{
        let result = res;
       
        if(res.status === 200) {
          let items = res.response.data.Item;
          this.setState({
            studentDetails : items,
            loading : false
          })
        }
      })
      .catch((err)=>{
      })
  }

  renderDetails() {
    const { studentDetails } = this.state;
    return (
      
        <View>
         
          <Avatar
                rounded
                icon={{name: 'edit', type: 'Entypo',color:'#000',size:20}}
                onPress={this.next}
                activeOpacity={0.1}
                containerStyle={{width:30,height:30,position:'absolute',margin:10,backgroundColor:'#e7eaef',elevation:10,right:10}}
              />
          {
            studentDetails.Profile_Image ? 
            <View style={{marginTop:20,height:100,flex:1,flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
              <Avatar
                  size="large"
                  rounded
                  source={{
                    uri:
                      studentDetails.Profile_Image
                  }}
                  activeOpacity={0.7}
                  containerStyle={{backgroundColor:studentDetails.Color__Code,position:'absolute'}}
                />
                <Badge badgeStyle={{backgroundColor:'#504e4f',padding:8,borderRadius:4,borderColor:'#504e4f'}}
                  containerStyle={{position:'relative',bottom:-33}} 
                  value={<Text style={{color:'#fff',fontFamily: 'Inter-Regular',fontSize:12}}>
                    {studentDetails.Student_Group}
                  </Text>} />
               
            </View>
            : <View style={{marginTop:20,height:100,flex:1,flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
              <Avatar
                  size="large"
                  rounded
                  title={studentDetails.First_Letter}
                  activeOpacity={0.7}
                  containerStyle={{backgroundColor:studentDetails.Color__Code,position:'absolute'}}
                />
              <Badge badgeStyle={{backgroundColor:'#504e4f',padding:8,borderRadius:4,borderColor:'#504e4f'}}
                containerStyle={{position:'relative',bottom:-33}} 
                value={<Text style={{color:'#fff',fontFamily: 'Inter-Regular',fontSize:12}}>
                  {studentDetails.Student_Group}
                </Text>} />
               
            </View>
          }
          <Text style={{textAlign:'center',fontFamily: 'Inter-Medium',color:'#3F5174',fontSize:22}}>
          {studentDetails.First_Name} {studentDetails.Last_Name}
          </Text>

          <View style={{flex:1,flexDirection:'row',padding:10,top:10}}>

              <View style={{flex:1,alignItems:'center'}}>
                <Avatar
                    rounded
                    icon={{name: 'angle-double-right', type: 'font-awesome',color:'#000'}}
                    activeOpacity={0.1}
                    containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                  />
              </View>

              <View style={{flex:1,alignItems:'center'}}>
                <Avatar
                    rounded
                    icon={{name: 'light-down', type: 'entypo',color:'#000'}}
                    activeOpacity={0.1}
                    containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                  />
              </View>

              <View style={{flex:1,alignItems:'center'}}>
                <Avatar
                    rounded
                    icon={{name: 'users', type: 'font-awesome',color:'#000'}}
                    activeOpacity={0.1}
                    containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                  />
              </View>
            </View> 


          <View style={{flexDirection:'row',paddingTop:10}}>
            <View style={{flex:2,alignItems: 'center',textAlign:'center'}}>
              <Text note style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>Joined On</Text>
              <Text style={{fontSize:14,fontFamily: 'Inter-Medium',color:'#3F5174'}}>{studentDetails.Join_Date ? studentDetails.Join_Date : '---'}</Text>
            </View>

            <View style={{flex:2,alignItems: 'center',textAlign:'center'}}>
              <Text note style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>Student ID</Text>
              <Text style={{fontSize:14,fontFamily: 'Inter-Medium',color:'#3F5174'}}>{studentDetails.Id_No ? studentDetails.Id_No : '---'}</Text>
            </View>

            <View style={{flex:2,alignItems: 'center',textAlign:'center'}}>
              <Text note style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>Date of Birth</Text>
              <Text style={{fontSize:14,fontFamily: 'Inter-Medium',color:'#3F5174'}}>{studentDetails.Date_Of_Birth ? studentDetails.Date_Of_Birth : '---'}</Text>
            </View>
          </View>

           
          <View style={{padding:15}}>
            <Card>
              <CardItem style={{backgroundColor:'#ecedf2'}}>
                <Avatar
                    rounded
                    icon={{name: 'mobile', type: 'font-awesome',color:'#000'}}
                    activeOpacity={0.1}
                    containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                  />
                <Text style={{paddingLeft:10,fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Cell_Phone_Number ? this.state.studentDetails.Cell_Phone_Number : '---'}</Text>
               </CardItem>

               <CardItem style={{backgroundColor:'#ecedf2'}}>
                <Avatar
                    rounded
                    icon={{name: 'email', type: 'Fontisto',color:'#000'}}
                    activeOpacity={0.1}
                    containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                  />
                <Text style={{paddingLeft:10,fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Email ? this.state.studentDetails.Email : '---'}</Text>
               </CardItem>

               <CardItem style={{backgroundColor:'#ecedf2',lineHeight:10}}>
                <Avatar
                    rounded
                    icon={{name: 'location', type: 'evilicon',color:'#000'}}
                    activeOpacity={0.7}
                    containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                  />
                <View style={{flex:1,flexDirection:"row",flexWrap:"wrap",paddingLeft:10}}>
                {this.state.studentDetails.Address_1_Block_Name && <Text style={{fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Address_1_Block_Name},</Text>}
                {this.state.studentDetails.Address_1_Street && <Text style={{fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Address_1_Street},</Text>}
                {this.state.studentDetails.Address_Country && <Text style={{fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Address_Country},</Text>}
                {this.state.studentDetails.Address_City && <Text style={{fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Address_City}</Text>}
                </View>
               </CardItem>
            </Card>

           
          </View>

          <View>
            <Card style={{height:'100%',backgroundColor:'#dfe7f2',padding:20,borderTopLeftRadius: 15,borderTopRightRadius: 15,elevation:20}}>
              <Title style={{fontFamily: 'Inter-Medium',color:'#3F5174',fontSize:18}}> Primary Contacts </Title>
              <View style={{top:10}}>
                <Card style={{elevation:1}}>
                  <CardItem header style={{backgroundColor:'#eee'}}>
                    <Text style={{fontSize:18,fontFamily: 'Inter-Medium',color:'#3F5174'}}>{this.state.studentDetails.Parent_1_Contact_Name ? this.state.studentDetails.Parent_1_Contact_Name : '---'}</Text>
                  </CardItem>
                  <CardItem>
                    <Icon active name="mobile" type="Entypo" style={{fontSize:15}}/>
                    <Text style={{fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_1_Phone ? this.state.studentDetails.Parent_1_Phone : '---'}</Text>
                  </CardItem>
                  <CardItem>
                    <Icon active name="email" type="Fontisto" style={{fontSize:15}}/>
                    <Text style={{fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_1_Email ? this.state.studentDetails.Parent_1_Email : '---'}</Text>
                  </CardItem>
                  <CardItem >
                    <Icon active name="location" type="EvilIcons" style={{fontSize:20}}/>
                    <View style={{flex:1,flexDirection:"row",flexWrap:"wrap"}}>
                      {this.state.studentDetails.Parent_1_Address_Block_Name && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_1_Address_Block_Name},</Text>}
                      {this.state.studentDetails.Parent_1_Address_Block_Street && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_1_Address_Block_Street},</Text>}
                      {this.state.studentDetails.Parent_1_City && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_1_City},</Text>}
                      {this.state.studentDetails.Parent_1_State && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_1_State}</Text>}
                    </View>
                  </CardItem>
                </Card>
             
              
                <Card style={{elevation:1}}>
                  <CardItem header style={{backgroundColor:'#eee'}}>
                    <Text style={{fontSize:18,fontFamily: 'Inter-Medium',color:'#3F5174'}}>{this.state.studentDetails.Parent_2_Contact_Name ? this.state.studentDetails.Parent_2_Contact_Name : '---'}</Text>
                  </CardItem>
                  <CardItem>
                    <Icon active name="mobile" type="Entypo" style={{fontSize:15}}/>
                    <Text style={{fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_2_Phone ? this.state.studentDetails.Parent_2_Phone : '---'}</Text>
                  </CardItem>
                  <CardItem>
                    <Icon active name="email" type="Fontisto" style={{fontSize:15}}/>
                    <Text style={{fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_2_Email ? this.state.studentDetails.Parent_2_Email : '---'}</Text>
                  </CardItem>
                  <CardItem>
                    <Icon active name="location" type="EvilIcons" style={{fontSize:20}}/>
                    <View style={{flex:1,flexDirection:"row",flexWrap:"wrap"}}>
                      {this.state.studentDetails.Parent_2_Address_Block_Name && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_2_Address_Block_Name},</Text>}
                      {this.state.studentDetails.Parent_2_Address_Block_Street && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_2_Address_Block_Street},</Text>}
                      {this.state.studentDetails.Parent_2_City && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_2_City},</Text>}
                      {this.state.studentDetails.Parent_2_State && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Parent_2_State}</Text>}
                    </View>
                  </CardItem>
                </Card>
              </View>

              <Title style={{fontFamily: 'Inter-Medium',color:'#3F5174',fontSize:18,paddingTop:20}}> Emergency Contacts </Title>
              <View style={{top:10}}>
                <Card style={{elevation:1}}>
                  <CardItem header style={{backgroundColor:'#eee'}}>
                    <Text style={{fontSize:18,fontFamily: 'Inter-Medium',color:'#3F5174'}}>{this.state.studentDetails.Guardian_Name ? this.state.studentDetails.Guardian_Name : '---'}</Text>
                  </CardItem>
                  <CardItem>
                    <Icon active name="mobile" type="Entypo" style={{fontSize:15}}/>
                    <Text style={{fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Guardian_Phone ? this.state.studentDetails.Guardian_Phone : '---'}</Text>
                  </CardItem>
                  <CardItem>
                    <Icon active name="email" type="Fontisto" style={{fontSize:15}}/>
                    <Text style={{fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Guardian_Email ? this.state.studentDetails.Guardian_Email : '---'}</Text>
                  </CardItem>
                  <CardItem>
                    <Icon active name="location" type="EvilIcons" style={{fontSize:20}}/>
                    <View style={{flex:1,flexDirection:"row",flexWrap:"wrap"}}>
                      {this.state.studentDetails.Guardian_Address_Block_Name && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Guardian_Address_Block_Name},</Text>}
                      {this.state.studentDetails.Guardian_Address_Street && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Guardian_Address_Street},</Text>}
                      {this.state.studentDetails.Guardian_City && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Guardian_City},</Text>}
                      {this.state.studentDetails.Guardian_State && <Text style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Guardian_State}</Text>}


                    </View>
                  </CardItem>
                </Card>
              </View>

              <Title style={{paddingTop:20,fontSize:18,fontFamily: 'Inter-Medium',color:'#3F5174'}}>Others</Title>
              <View style={{top:10}}>
                <Card style={{elevation:1}}>
                  <View style={{padding:7,marginLeft:10}}>
                     <Title style={{fontSize:18,fontFamily: 'Inter-Medium',color:'#3F5174'}}>Detail 1</Title>
                     <Text style={{paddingTop:10,fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Custom_Field_Name_1 && this.state.studentDetails.Custom_Field_Name_1}</Text>
                  </View>
                  <View style={{padding:7,marginLeft:10}}>
                     <Title style={{fontSize:18,fontFamily: 'Inter-Medium',color:'#3F5174'}}>Detail 2</Title>
                     <Text style={{paddingTop:10,fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{this.state.studentDetails.Custom_Field_Name_2 && this.state.studentDetails.Custom_Field_Name_2}</Text>
                  </View>
                </Card>
              </View>
            </Card>
          </View>
      </View>
    )
  }

  render() {
    const studentDetails = this.state.studentDetails;
    const isLoading = this.state.loading;
    return !isLoading ? (
      <View style={{flex:1,backgroundColor:'#eaf3fa'}}>
        <ScrollView>
          {studentDetails && this.renderDetails()}
        </ScrollView>
      </View>
    ) : (
        <View style={{flex:1,backgroundColor:'#eaf3fa',justifyContent:'center'}}>
          <ActivityIndicator size="large" color="#42526c" />
        </View>
      )
  } 
}

export default ProfileDetailsScreen;

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