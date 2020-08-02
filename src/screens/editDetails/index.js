import React, { PureComponent } from 'react';
import {SafeAreaView, StyleSheet,View, Text,ScrollView,ActivityIndicator,TouchableOpacity} from 'react-native';
import { Input, Item,Title,Toast,CardItem,Card, 
  Left,
  Right, } from 'native-base';
import { Avatar,Badge } from 'react-native-elements';

import { getAll } from './../../services/apiCall';

import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  quality : 0.1
};

class EditDetailsScreen extends PureComponent {
 isModalVisible = null;
  constructor(props) {
    super(props);
    let date = new Date();
    this.currentDate = date.getFullYear() +'-'+(date.getMonth().length < 1 ? '0'+(date.getMonth()+1) : (date.getMonth()+1))+'-'+((date.getDate().length < 1) ? '0'+date.getDate() : date.getDate());
    this.state = {
      First_Letter : '',
      studentId : '',
      Id_No : '',
      First_Name : '',
      Last_Name:'',
      Gender:'',
      Student_Type : '',
      Student_Group : '',
      Date_Of_Birth : '',
      Cell_Phone_Number : '',
      Email : '',
      Color__Code : '',
      Address_1_Door_No : '',
      Address_1_Block_Name : '',
      Address_1_Street : '',
      Address_Optional:'',
      Address_City : '',
      Address_State : '',
      Address_Country : '',
      Parent_1_Contact_Name : '',
      Parent_1_Phone : '',
      Parent_1_Email : '',
      Parent_1_Address_Door_No : '',
      Parent_1_Address_Block_Name : '',
      Parent_1_Address_Block_Street : '',
      Parent_1_Address_2_Optional : '',
      Parent_1_City : '',
      Parent_1_State : '',
      Parent_2_Contact_Name : '',
      Parent_2_Phone : '',
      Parent_2_Email : '',
      Parent_2_Address_Door_No : '',
      Parent_2_Address_Block_Name : '',
      Parent_2_Address_Street :'',
      Parent_2_Address_Optional : '',
      Parent_2_City : '',
      Parent_2_State : '',
      Guardian_Name : '',
      Guardian_Email : '',
      Guardian_Phone : '',
      Guardian_Address_Door_No : '',
      Guardian_Address_Block_Name : '',
      Guardian_Address_Street : '',
      Guardian_Address_Optional : '',
      Guardian_Address_City : '',
      Guardian_Address_State : '',
      Join_Date : '',
      Batch_Name : '',
      Custom_Field_Name_1 : '',
      Custom_Field_Name_2 : '',
      loading : true,
      isModalVisible : null,
      avatarSource : null,
      Profile_Image : null,
      validEmail:true,
      validParent1Email:true,
      validParent2Email:true,
      validEmergnecyEmail:true
    }
    this.loading = true;
    this.update = false;
    this.isModalVisible = null;
    this.studId = this.props.navigation.getParam('studentId');
    this.openModal = this.openModal.bind(this);
    this.getData = this.getData.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.choosePhoto = this.choosePhoto.bind(this);

  }

  componentDidMount() {
    this.getData();
    this.props.navigation.setParams({ 
      update : this._handleFilterPress.bind(this),
      clicked : false 
    });
    this.setState({
      studentId : this.studId
    })
  }

  openModal() {
    this.setState({
      isModalVisible : 5
    })
  }

  _handleFilterPress() {
     this.props.navigation.setParams({ 
      clicked : true 
    });
    let avatarSource = this.state.avatarSource != null ? this.state.avatarSource.split(",")[1] : null;
    let params = this.state;
    delete params['loading'];
    delete params['avatarSource'];
    delete params['isModalVisible'];
    delete params['Profile_Image'];
    let uploadImage = {
      Profile_Image : avatarSource,
      studentId : this.state.studentId
    }
    if(avatarSource) {
      getAll('student/updateStudentImage',uploadImage)
       .then(response => response.json())
        .then((res)=>{
          let result = res;
           
          getAll('student/editStudentInfo',params)
            .then(response => response.json())
            .then((res)=>{
              let result = res;
              let self = this;
              if(res.status === 200) {
                Toast.show({
                  text: "Updated successfully!",
                  buttonText: "",
                  duration: 1500
                })
                self.props.navigation.goBack(null);
              } else {
                this.props.navigation.setParams({ 
                  clicked : false 
                });
                throw 'Update Failed'
              }
              
            }).catch((err)=>{
              Toast.show({
                text: "Update failed!",
                buttonText: "",
                duration: 1500
              })
            })
        }).catch((err)=>{
           this.props.navigation.setParams({ 
            clicked : false 
          });
        })
    } else {
      getAll('student/editStudentInfo',params)
        .then(response => response.json())
        .then((res)=>{
          let result = res;
          let self = this;
          if(res.status === 200) {
            Toast.show({
              text: "Update success!",
              buttonText: "",
              duration: 1500
            })
            self.props.navigation.goBack(null);
          } else {
            throw 'Update Failed'
          }
          
        }).catch((err)=>{
          this.props.navigation.setParams({ 
            clicked : false 
          });
          Toast.show({
            text: "Update failed!",
            buttonText: "",
            duration: 1500
          })
        })
    }
    

    
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
          
          this.loading = false;
          this.setState({
            First_Letter : items.First_Letter ? items.First_Letter : '',
            studentId : items.studentId ? items.studentId : '',
            Id_No : items.Id_No ? items.Id_No : '',
            First_Name : items.First_Name ? items.First_Name : '',
            Last_Name:items.Last_Name ? items.Last_Name : '',
            Gender:items.Gender ? items.Gender : '',
            Student_Type : items.Student_Type ? items.Student_Type : '',
            Student_Group : items.Student_Group ? items.Student_Group : '',
            Date_Of_Birth : items.Date_Of_Birth ? items.Date_Of_Birth : '',
            Cell_Phone_Number : items.Cell_Phone_Number ? items.Cell_Phone_Number : '',
            Email : items.Email ? items.Email : '',
            Address_1_Door_No : items.Address_1_Door_No ? items.Address_1_Door_No : '',
            Address_1_Block_Name : items.Address_1_Block_Name ? items.Address_1_Block_Name : '',
            Address_1_Street : items.Address_1_Street ? items.Address_1_Street : '',
            Address_Optional:items.Address_Optional ? items.Address_Optional : '',
            Address_City : items.Address_City ? items.Address_City : '',
            Address_State : items.Address_State ? items.Address_State : '',
            Address_Country : items.Address_Country ? items.Address_Country : '',
            Color__Code : items.Color__Code ? items.Color__Code : '',
            Parent_1_Contact_Name : items.Parent_1_Contact_Name ? items.Parent_1_Contact_Name : '',
            Parent_1_Phone : items.Parent_1_Phone ? items.Parent_1_Phone : '',
            Parent_1_Email : items.Parent_1_Email ? items.Parent_1_Email : '',
            Parent_1_Address_Door_No : items.Parent_1_Address_Door_No ? items.Parent_1_Address_Door_No : '',
            Parent_1_Address_Block_Name : items.Parent_1_Address_Block_Name ? items.Parent_1_Address_Block_Name : '',
            Parent_1_Address_Block_Street : items.Parent_1_Address_Block_Street ? items.Parent_1_Address_Block_Street : '',
            Parent_1_Address_2_Optional : items.Parent_1_Address_2_Optional ? items.Parent_1_Address_2_Optional : '',
            Parent_1_City : items.Parent_1_City ? items.Parent_1_City : '',
            Parent_1_State : items.Parent_1_State ? items.Parent_1_State : '',
            Parent_2_Contact_Name : items.Parent_2_Contact_Name ? items.Parent_2_Contact_Name : '',
            Parent_2_Phone : items.Parent_2_Phone ? items.Parent_2_Phone : '',
            Parent_2_Email : items.Parent_2_Email ? items.Parent_2_Email : '',
            Parent_2_Address_Door_No : items.Parent_2_Address_Door_No ? items.Parent_2_Address_Door_No : '',
            Parent_2_Address_Block_Name : items.Parent_2_Address_Block_Name ? items.Parent_2_Address_Block_Name : '',
            Parent_2_Address_Street :items.Parent_2_Address_Street ? items.Parent_2_Address_Street : '',
            Parent_2_Address_Optional : items.Parent_2_Address_Optional ? items.Parent_2_Address_Optional : '',
            Parent_2_City : items.Parent_2_City ? items.Parent_2_City : '',
            Parent_2_State : items.Parent_2_State ? items.Parent_2_State : '',
            Guardian_Name : items.Guardian_Name ? items.Guardian_Name : '',
            Guardian_Email : items.Guardian_Email ? items.Guardian_Email :'',
            Guardian_Phone : items.Guardian_Phone ? items.Guardian_Phone : '',
            Guardian_Address_Door_No : items.Guardian_Address_Door_No ? items.Guardian_Address_Door_No : '',
            Guardian_Address_Block_Name : items.Guardian_Address_Block_Name ? items.Guardian_Address_Block_Name : '',
            Guardian_Address_Street : items.Guardian_Address_Street ? items.Guardian_Address_Street : '',
            Guardian_Address_Optional : items.Guardian_Address_Optional ? items.Guardian_Address_Optional : '',
            Guardian_Address_City : items.Guardian_Address_City ? items.Guardian_Address_City : '',
            Guardian_Address_State : items.Guardian_Address_State ? items.Guardian_Address_State : '',
            Join_Date : items.Join_Date ? items.Join_Date : '',
            Batch_Name : items.Batch_Name ? items.Batch_Name : '',
            Custom_Field_Name_1 : items.Custom_Field_Name_1 ? items.Custom_Field_Name_1 : '',
            Custom_Field_Name_2 : items.Custom_Field_Name_2 ? items.Custom_Field_Name_2 : '',
            Profile_Image : items.Profile_Image ? items.Profile_Image : '',
            loading : false
          })
        }
      })
      .catch((err)=>{
      })
  }

  textChange(e,name) {
    // if(e.nativeEvent.text.indexOf("-") != -1) {
    //   e.nativeEvent.text = e.nativeEvent.text
    // }
    let value = (name === 'Cell_Phone_Number' || name === 'Parent_1_Phone' || name === 'Parent_2_Phone' ||  name === 'Guardian_Phone') ? 
     e.nativeEvent.text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : e.nativeEvent.text;
     console.log("value",value,name);
    this.setState({
        [name]: value
    })
    if(name === 'Email' || name === 'Parent_1_Email' || name === 'Parent_2_Email' || name === 'Guardian_Email'){
      let key = (name === 'Email') ? 'validEmail' : (name === 'Parent_1_Email') ? 'validParent1Email' : (name === 'Parent_2_Email') ? 'validParent2Email' : (name === 'Guardian_Email') ? 'validEmergnecyEmail' : '';
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(e.nativeEvent.text)) {
        this.setState({
          [key] : true
        })
      } else {
        this.setState({
          [key] : false
        })
      }
    }
  }


  takePhoto() {
    ImagePicker.launchCamera(options,(response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source.uri,
          isModalVisible : null
        });
      }
      // Same code as in above section!
    });
  }

  choosePhoto() {
    ImagePicker.showImagePicker((response) => {
      
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
         const source = { uri: 'data:image/jpeg;base64,' + response.data };
     
        this.setState({
          avatarSource: source.uri,
          isModalVisible : null
        });
      }
    });
  }

  render() {
    const loading = this.state.loading;
    const avatarSource = this.state.avatarSource ? this.state.avatarSource : this.state.Profile_Image;
    
    return !loading ? (
      <View style={{flex:1,backgroundColor:'#eaf3fa'}}>
        <ScrollView>
            { 
              (avatarSource)
                ? <View style={{marginTop:20,height:100,flex:1,flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
                    <Avatar
                      size="large"
                      rounded
                      source={{
                        uri:
                          avatarSource
                      }}
                      activeOpacity={0.7}
                      containerStyle={{position:'absolute',backgroundColor:this.state.Color__Code}}
                     />

                    <Avatar
                      rounded
                      icon={{name: 'camera', type: 'font-awesome',color:'#000',size:13}}
                      onPress={this.choosePhoto}
                      activeOpacity={0.1}
                      containerStyle={{fontSize:20,width:25,height:25,position:'relative',backgroundColor:'#E6E9EF',elevation:10,right:-30,bottom:-25}}
                    /> 
                  </View>
                : <View style={{marginTop:20,height:100,flex:1,flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
                    <Avatar
                      size="large"
                      rounded
                      title={this.state.First_Letter}
                      activeOpacity={0.7}
                      containerStyle={{position:'absolute',backgroundColor:this.state.Color__Code}}
                     />

                    <Avatar
                      rounded
                      icon={{name: 'camera', type: 'font-awesome',color:'#000',size:13}}
                      onPress={this.choosePhoto}
                      activeOpacity={0.1}
                      containerStyle={{fontSize:20,width:25,height:25,position:'relative',backgroundColor:'#E6E9EF',elevation:10,right:-30,bottom:-25}}
                    /> 
                  </View>
            }

          <View style={styles.view}>
            <Text style={styles.label}>First Name</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="name" value={this.state.First_Name}
                  onChange={(e) => this.textChange(e, 'First_Name')}/>
              </Item>
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Last Name</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="name" value={this.state.Last_Name}
                  onChange={(e) => this.textChange(e, 'Last_Name')}/>
              </Item>
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}> Student ID</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} editable={false} placeholder='' name="Id" value={this.state.Id_No}
                onChange={(e) => this.textChange(e, 'Id_No')}/>
              </Item>
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Phone number</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} maxLength={12} keyboardType="numeric" placeholder='' name="Cell_Phone_Number" 
                value={this.state.Cell_Phone_Number} onChange={(e) => this.textChange(e, 'Cell_Phone_Number')}/>
              </Item>
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Email Id</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Email" value={this.state.Email} 
                onChange={(e) => this.textChange(e, 'Email')}
                onBlur = {
                  (e) => {
                    //Conditions or Regex
                    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(this.state.email);
                  } 
                }
              />
              </Item>
              {!this.state.validEmail && <Text note style={{color:'red',fontFamily:'Inter-Regular',paddingTop:3}}>Enter valid Email Id</Text>}
              
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Address</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Address_City" value={this.state.Address_City}
                onChange={(e) => this.textChange(e, 'Address_City')}/>
              </Item>
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Joined On</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.Join_Date}
                  mode="date"
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                  minDate="1945-01-01"
                  maxDate={this.currentDate}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  androidMode="spinner"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: -50,
                      borderWidth : 0
                    },

                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({'Join_Date': date})}}
                />
              </Item>
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Date Of Birth</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.Date_Of_Birth}
                  mode="date"
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                  minDate="1945-01-01"
                  maxDate={this.currentDate}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  androidMode="spinner"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: -50,
                      borderWidth : 0
                    }
                  }}
                  onDateChange={(date) => {this.setState({'Date_Of_Birth': date})}}
                />
              </Item>
            </View>
          </View>

          <Title style={styles.title}>Primary Contacts</Title>

          <View style={styles.view}>
            <Text style={styles.label}>Parent Name1</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Parent_1_Contact_Name" value={this.state.Parent_1_Contact_Name}
                onChange={(e) => this.textChange(e, 'Parent_1_Contact_Name')} />
              </Item>
            </View>
          </View>


          <View style={styles.view}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} maxLength={12} keyboardType="numeric"  placeholder='' name="Parent_1_Phone" value={this.state.Parent_1_Phone}
                onChange={(e) => this.textChange(e, 'Parent_1_Phone')}/>
              </Item>
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Email Id</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Parent_1_Email" value={this.state.Parent_1_Email}
                onChange={(e) => this.textChange(e, 'Parent_1_Email')}/>
              </Item>
              {!this.state.validParent1Email && <Text note style={{color:'red',fontFamily:'Inter-Regular',paddingTop:3}}>Enter valid Email Id</Text>}
              
            </View>

          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Address</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Parent_1_City" value={this.state.Parent_1_City}
                onChange={(e) => this.textChange(e, 'Parent_1_City')}/>
              </Item>
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Parent Name2</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Parent_2_Contact_Name" 
                 value={this.state.Parent_2_Contact_Name} onChange={(e) => this.textChange(e, 'Parent_2_Contact_Name')}/>
              </Item>
            </View>
          </View>


          <View style={styles.view}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} maxLength={12} keyboardType="numeric" placeholder='' name="Parent_2_Phone" 
                 value={this.state.Parent_2_Phone} onChange={(e) => this.textChange(e, 'Parent_2_Phone')} />
              </Item>
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Email Id</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder=''  name="Parent_2_Email" 
                value={this.state.Parent_2_Email} onChange={(e) => this.textChange(e, 'Parent_2_Email')}/>
              </Item>
              {!this.state.validParent2Email && <Text note style={{color:'red',fontFamily:'Inter-Regular',paddingTop:3}}>Enter valid Email Id</Text>}
              
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Address</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Parent_2_City" 
                 value={this.state.Parent_2_City} onChange={(e) => this.textChange(e, 'Parent_2_City')}/>
              </Item>
            </View>
          </View>

          <Title style={styles.title}>Emergency Contacts</Title>

          <View style={styles.view}>
            <Text style={styles.label}>Guardian Name</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Guardian_Name" 
                value={this.state.Guardian_Name} onChange={(e) => this.textChange(e, 'Guardian_Name')}/>
              </Item>
            </View>
          </View>


          <View style={styles.view}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} maxLength={12} keyboardType="numeric" placeholder='' name="Guardian_Phone" 
                 value={this.state.Guardian_Phone} onChange={(e) => this.textChange(e, 'Guardian_Phone')}/>
              </Item>
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Email Id</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Guardian_Email" 
                 value={this.state.Guardian_Email} onChange={(e) => this.textChange(e, 'Guardian_Email')}/>
              </Item>
               {!this.state.validEmergnecyEmail && <Text note style={{color:'red',fontFamily:'Inter-Regular',paddingTop:3}}>Enter valid Email Id</Text>}
              
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Address</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Guardian_Address_Street" 
                 value={this.state.Guardian_Address_Street} onChange={(e) => this.textChange(e, 'Guardian_Address_Street')}/>
              </Item>
            </View>
          </View>

          <Title style={styles.title}>Others</Title>

          <View style={styles.view}>
            <Text style={styles.label}>Detail 1</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Custom_Field_Name_1" 
                 value={this.state.Custom_Field_Name_1} onChange={(e) => this.textChange(e, 'Custom_Field_Name_1')}/>
              </Item>
            </View>
          </View>

          <View style={styles.view}>
            <Text style={styles.label}>Detail 2</Text>
            <View style={styles.content}>
              <Item regular style={styles.input}>
                <Input style={{borderWidth:0,fontFamily:'Inter-Regular'}} placeholder='' name="Custom_Field_Name_2" 
                 value={this.state.Custom_Field_Name_2} onChange={(e) => this.textChange(e, 'Custom_Field_Name_2')}/>
              </Item>
            </View>
          </View>

        </ScrollView>

        <Modal
            isVisible={this.state.isModalVisible === 5}
            style={styles.bottomModal}
            onBackdropPress={() => this.setState({isModalVisible: null})}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={this.takePhoto}>
                <CardItem style={{backgroundColor:'#E6E9EF'}}>
                  <Avatar
                    rounded
                    icon={{name: 'camera', type: 'font-awesome',color:'#000'}}
                    activeOpacity={0.1}
                    containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                  />
                  <View>
                    <Text style={{paddingLeft:15}}>Take Photo</Text>
                  </View>
                </CardItem>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.choosePhoto}>
                <CardItem style={{backgroundColor:'#E6E9EF'}}>
                  <Avatar
                    rounded
                    icon={{name: 'select1', type: 'antdesign',color:'#000'}}
                    activeOpacity={0.1}
                    containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                  />
                  <View>
                    <Text style={{paddingLeft:15}}>Choose Photo</Text>
                  </View>
                </CardItem>

              </TouchableOpacity>
            </View>
        </Modal>
      </View>
    ) : (
        <View style={{flex:1,backgroundColor:'#eaf3fa',justifyContent:'center'}}>
          <ActivityIndicator size="large" color="#42526c" />
        </View>
      )
  }
}

export default EditDetailsScreen;

const styles = StyleSheet.create({
  container: {
  	flex:1,
  	backgroundColor:'#eaf3fa'
  },
  title: {

  	paddingLeft:17,
    paddingTop : 15,
    paddingBottom : 10,
    fontFamily: 'Inter-Medium',
    color : '#3F5174',
    fontSize :18
    // color:'#42526c',
    // fontWeight: 'bold',
  },
  input : {
    width:'auto',height:35
  },
  view : {
    paddingTop:10,
    paddingLeft:15
  },
  content : {
    margin:5
  },
  label : {
    fontFamily: 'Inter-Regular',
    color:'#6E7F9A',
    fontSize:14
  },
  modalContent: {
    backgroundColor: '#E6E9EF',
    padding: 10,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 15,borderTopRightRadius: 15,elevation:20
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  }
});