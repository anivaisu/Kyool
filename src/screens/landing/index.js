import React, { PureComponent } from 'react';
import { 
 SafeAreaView,
 StyleSheet, 
 Text,
 View,
 ScrollView,
 Keyboard,
 ImageBackground,
 KeyboardAvoidingView,
 Image,
 TouchableOpacity,
 StatusBar,
 AsyncStorage  } from 'react-native';

import { Card,Input, Item,Content,Container,Button,Toast  } from 'native-base';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Header } from 'react-navigation-stack';

import globalStyle from './../../assets/styles';
import { userlogin } from './../../services/apiCall';

import base64 from 'react-native-base64'

class LandScreen extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      userMobile : '',
      otp : '',
      submitted : false,
      next : false
    }
    this.textChange = this.textChange.bind(this);
    this.login = this.login.bind(this);
    this.next = this.next.bind(this);
    this.Prev = this.Prev.bind(this);
  }

  Prev() {
    this.setState({
      next:false
    })
  }

  next() {
    if(this.state.userMobile != '') {
      this.setState({
        next : true
      })
    } else {
      Toast.show({
        text: "Please Enter Valid Mobile Number",
        buttonText: "",
        duration: 1500,
        style: {
          fontFamily: "Inter-Regular"
         }
      })
    }
   
  }

  textChange(e,name) {
    let value = (name === 'userMobile') ? e.nativeEvent.text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : e.nativeEvent.text;
    this.setState({
        [name]: value
    },()=>{
      if(name === 'userMobile') {
        if(value.length === 12) {
          Keyboard.dismiss()
        }
      }
      else {
        if(value.length === 6) {
          Keyboard.dismiss()
        }
      }
    })
  }

  login() {
    let mobile = this.state.userMobile.split("-");
    let userMobile1 = mobile[0]+mobile[1]+mobile[2];
    let params = {
      userMobile : mobile[0]+mobile[1]+mobile[2],
      userOTP : this.state.otp
    }
    if(this.state.userMobile && this.state.otp) {
      this.setState({
        submitted : true
      })
      userlogin('login/verifyMobileNo',params)
      .then(response => response.json())
      .then((res)=>{
        
        let result = res;
        let self = this;
        if(res.status === 200) {
          let encode = base64.encode(this.state.userMobile)
          AsyncStorage.setItem('userMobile', userMobile1, () => {
             self.props.navigation.navigate("Students");
          })
        } else {
          throw 'Login Failed'
        }
        
      }).catch((err)=>{
        Toast.show({
          text: "Login failed!",
          buttonText: "",
          duration: 1500
        })
        this.setState({
          submitted : false 
        })
      })
    } else {
      Toast.show({
        text: "Please Enter Valid Mobile Number and Verification Code",
        buttonText: "",
        duration: 1500
      })
    }
  }

  render() {
    const { submitted } = this.state;
    return (
      <View style={{ flex: 1 }}>
         
            <View style={{ flex: 2}}>
              <ImageBackground source={require('./../../assets/images/banner.png')} style={styles.image}>
              </ImageBackground>
            </View>
            
            <View style={{ flex: 3,backgroundColor: '#c4eea1',padding:0,}}>
               
               <Card style={{margin:0,height:'100%',padding:20,borderTopLeftRadius: 15,borderTopRightRadius: 15,elevation:20}}>
                  <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={0}>
                    <Text style={styles.textCenter}>Welcome to</Text>
                      <View style={{padding:20}}>
                        <Image style={{height:50,alignSelf:'center'}} 
                        resizeMode = 'center'
                        source={require('./../../assets/images/logo-min.png')}/>
                      </View> 

                      { this.state.next && <Text style={{textAlign:'center',fontSize:15,color:'#727f90',fontFamily: 'Inter-Regular'}}>
                      Please key in the verification code &nbsp; K-123456 to login the app.</Text>}

                      { !this.state.next && <Text style={{textAlign:'center',fontSize:15,color:'#727f90',fontFamily: 'Inter-Regular'}}>
                      Enter your mobile number to authenticate your account</Text>}
                      
                      <View style={{height:20}}></View>
                      
                      
                      <View style={{padding:5}}>
                        { !this.state.next && 
                          <Item regular style={styles.textBox}>
                            <Input placeholder='xxx-xxx-xxxx' 
                                   style={{fontFamily:'Inter-Regular',fontSize:16}}
                                   maxLength={12} keyboardType="numeric" name="userMobile" 
                                   placeholderTextColor={'#919EB4'}
                                   value={this.state.userMobile} onChange={(e) => this.textChange(e, 'userMobile')} />
                          </Item>
                        }
                        
                        {
                          this.state.next && 
                          <Item regular style={styles.textBox}>
                            <Text style={styles.prefix}>K-</Text>
                            <Input style={{paddingLeft:0,fontFamily:'Inter-Regular',fontSize:16}} placeholder='Enter 6-digit code' 
                                    placeholderTextColor={'#919EB4'}
                                    maxLength={6} keyboardType="numeric" name="otp" 
                                    value={this.state.otp} onChange={(e) => this.textChange(e, 'otp')} />
                          </Item>
                        }
                       
                        <View style={{height:20}}></View>
                        {
                          this.state.next && 
                          <View style={{flex:1,flexDirection:'row',alignSelf:'center',padding:15}}>
                            
                              <Button block onPress={this.Prev} style={[globalStyle.buttonColor,{width:100,flexWrap: "wrap",alignSelf:'center'}]}>
                                  <Text style={{color:'#fff',fontSize:17,fontFamily:'Inter-Medium'}}>Previous</Text> 
                              </Button>
                            
                              <View style={{width:10}}></View>
                              
                              <Button block style={[globalStyle.buttonColor,{width:100,flexWrap: "wrap",alignSelf:'center'}]}  onPress={this.login}>
                                {!submitted ? 
                                  <Text style={{color:'#fff',fontSize:17,fontFamily:'Inter-Medium'}}>Continue</Text> 
                                : <Text style={{color:'#fff',fontSize:17,fontFamily:'Inter-Medium'}}>Wait...</Text>}
                              </Button>
                             
                          </View>
                        }

                        {
                          !this.state.next && 
                          <TouchableOpacity>
                            <Button block style={[globalStyle.buttonColor,{width:250,flexWrap: "wrap",alignSelf:'center'}]}  onPress={this.next}>
                              <Text style={{color:'#fff',fontSize:17,fontFamily:'Inter-Medium'}}>Continue</Text>
                            </Button>
                          </TouchableOpacity>
                        }

                      </View>
                   
                  </KeyboardAvoidingView>
                </Card>
              
            </View>
          
      </View>
    )
  }
  
} 

export default LandScreen;

const styles = {
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  headerStyle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 24
  },
  elementsContainer: {
    backgroundColor: '#ecf5fd',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24
  },
  textCenter : {
    textAlign: 'center',
    fontSize : 30,
    elevation:0,
    color:'#42526c',
    fontFamily: 'Inter-Medium',
  },
  textBox : {
    height : 40,
    fontFamily: 'Inter-Regular'
  },
  prefix: {
    paddingHorizontal: 5,
    color: '#919EB4',
    fontSize : 16,
    fontFamily: 'Inter-Regular'
  }
  
}