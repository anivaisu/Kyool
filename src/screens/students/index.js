import React, { PureComponent } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
  ScrollView,
  FlatList,
  ActivityIndicator} from 'react-native';
import { 
  Container,
  Item, 
  Input, 
  Icon,
  Card, 
  Left,
  Right,
  CardItem,
  Thumbnail,
  Body, 
  Content,
  Grid,
  color,
  

  Col,Footer } from 'native-base';

import { Avatar,Overlay,Button } from 'react-native-elements';
import Modal from 'react-native-modal';

import _ from 'lodash';
import { getAll } from './../../services/apiCall';

class StudentsScreen extends PureComponent {
  allList;
  constructor(props) {
    super(props)
    this.state = {
      studentList : [],
      userMobile : "",
      isModalVisible : null,
      studentId : null,
      loading : true,
      searchList : false,
      allList : [],
      search : null
    }
    this.renderList = this.renderList.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
    this.next = this.next.bind(this);
    this.getData = this.getData.bind(this);
    this.openModal = this.openModal.bind(this);
    this.edit = this.edit.bind(this);
    let self = this;
    this.textChange = this.textChange.bind(this);
    // this.onChangeText = _.debounce(this.onChangeText.bind(this), 1500);
    this.onChangeText = this.onChangeText.bind(this);
    this.cancel = this.cancel.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.endReached = this.endReached.bind(this);
    AsyncStorage.getItem("userMobile").then(res => {
      self.setState({
        userMobile : res
      })
      self.getData();
    })
  }

  componentDidMount() {
    this.props.navigation.setParams({Grid:false});
    const {navigation} = this.props;
      navigation.addListener ('willFocus', () =>{
      // do whatever you want to do when focused
      this.setState({
        loading : true
      })
      this.getData();
    });
  }

  textChange(e) {
    let value = e.nativeEvent.text
    let allList = this.state.allList;
    if(value.length > 0) {
      this.setState({
        search : e.nativeEvent.text,
        searchList : true
      },()=>{
        // if (value.length >= 2) {
          this.onChangeText(value);
        // } else {
        //   this.cancel();
        // }
      })
    } else {
      this.cancel();
    }
   
  }

  onChangeText(text) {
    let value = text.toLowerCase();
    let list = this.state.allList.filter(function (str) { 
      return (str.First_Name.toLowerCase().indexOf(value) > -1 || 
                   str.Last_Name.toLowerCase().indexOf(value) > -1 || 
                   str.Student_Group.toLowerCase().indexOf(value) > -1 || 
                   str.Batch_Name.toLowerCase().indexOf(value) > -1 ||
                   str.Email.toLowerCase().indexOf(value) > -1 ||
                   str.Cell_Phone_Number.toLowerCase().indexOf(value) > -1 ||
                   str.Parent_1_Contact_Name.toLowerCase().indexOf(value) > -1 ||
                   str.Parent_2_Contact_Name.toLowerCase().indexOf(value) > -1
                   ) 
    })
   
    this.setState({
      studentList : list,
      searchList : false,
      endloaded : false
    })
  }

  cancel() {
    let allList = this.allList
    let data = {};
    data.studentList = this.allList;
    data.search = null;
    data.searchList = false
    this.setState(data)
  }

  next(student) {
    this.setState({
      isModalVisible : null
    })
    this.props.navigation.navigate('ProfileDetails',{studentId:student.studentId})
  }

  edit(student) {
    this.setState({
      isModalVisible : null
    })
    this.props.navigation.navigate('EditDetails',{studentId:this.state.studentId})
  }

  openModal(params) {
    this.setState({
      isModalVisible : 5,
      studentId : params.studentId
    })
  }

  getData() {
    let params = {
        userMobile : this.state.userMobile
    }
    
    getAll('student/readStudentData',params)
      .then(response => response.json())
      .then((res)=>{
        let result = res;

        if(res.status === 200) {
          let items = res.response.data.Items;
          this.allList = res.response.data.Items;
          if(items.length === 0) {
            this.props.navigation.navigate('Csv');
          }
          this.setState({
            studentList : items,
            loading : false,
            allList : items
          })
        }
      })
      .catch((err)=>{
      })
  }

  renderList() {
    const { studentList,searchList } = this.state;
    return !searchList ? studentList.length != 0 ?  <FlatList
          data={this.state.studentList}
          renderItem={({ item }) => (
             <View style={{padding:5}}>
                <Card>
                    <CardItem style={{backgroundColor:'#edf0f5',flexDirection:'row'}}>
                      <TouchableOpacity style={{flex:2}} onPress={()=>this.next(item)}>
                        <Left  style={{flex:2}}>
                          {
                            item.Profile_Image ? <Avatar
                              size="medium"
                              rounded
                               source={{
                                  uri:
                                    item.Profile_Image
                                }}
                              onPress={()=>this.next(item)}
                              activeOpacity={0.7}
                              containerStyle={{backgroundColor:item.Color__Code}}
                            /> : <Avatar
                              size="medium"
                              rounded
                              title={item.First_Letter}
                              onPress={()=>this.next(item)}
                              activeOpacity={0.7}
                              // 8d44ad
                              titleStyle = {{fontFamily:'Inter-Regular',fontSize:20}}
                              containerStyle={{backgroundColor:item.Color__Code,width:45,height:45}}
                            /> 
                          }
                          <Body>
                            <Text style={{fontFamily: 'Inter-SemiBold',color:'#3F5174',fontSize:14}}>{item.First_Name}&nbsp;{item.Last_Name}</Text>
                            <Text note style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A',paddingTop:5}}>{item.Student_Group ? item.Student_Group : '---'}&nbsp;{item.Batch_Name ? item.Batch_Name : '---'}</Text>
                          </Body>
                        </Left>
                      </TouchableOpacity>
                     
                      <Right style={{flex:0.5}}>
                         <Avatar
                            rounded
                            icon={{name: 'dots-three-vertical', type: 'entypo',color:'#000',size:15}}
                            onPress={()=>this.openModal(item)}
                            activeOpacity={0.1}
                            containerStyle={{width:28,height:28,backgroundColor:'#e7eaef',elevation:10}}
                          />
                      </Right>
                    </CardItem>
                </Card>
            </View>
          )}
          //Setting the number of column
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.endReached}
          
      /> : 
    <View style={{padding:10}}>
        <Text style={{textAlign:'center',fontSize:18,color:'#42526c'}}>No data</Text>
    </View>
    :
   <View style={{flex:1,backgroundColor:'#eaf3fa',justifyContent:'center',margin:10}}>
      <ActivityIndicator size="large" color="#42526c" />
    </View>
    
  }

  renderFooter = () => {
   //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (this.state.endloaded) return null;
    return (
      <ActivityIndicator size="large" color="#42526c" />
    );
  }

  endReached() {
    this.setState({
      endloaded : true
    })
  }


  renderGrid() {
    const { searchList } = this.state;
    return !searchList ? this.state.studentList.length != 0 ? (
      <FlatList
          data={this.state.studentList}
          renderItem={({ item }) => (
              <View style={{padding:3,flexWrap: "wrap"}}>
                <Card style={{height:155,width:155,backgroundColor:'#edf0f5'}}>
                  <Avatar
                      rounded
                      icon={{name: 'dots-three-vertical', type: 'entypo',color:'#000',size:15}}
                      onPress={()=>this.openModal(item)}
                      activeOpacity={0.1}
                      containerStyle={{width:28,height:28,position:'absolute',margin:5,backgroundColor:'#e7eaef',elevation:10,right:0}}
                    />
                  
                    <View style={{padding:13,justifyContent: 'center',alignItems: 'center'}}>
                      {
                        item.Profile_Image ? <Avatar
                          size="medium"
                          rounded
                           source={{
                              uri:
                                item.Profile_Image
                            }}
                          onPress={()=>this.next(item)}
                          activeOpacity={0.7}
                          containerStyle={{backgroundColor:item.Color__Code}}
                        /> : <Avatar
                            size="medium"
                            rounded
                            title={item.First_Letter}
                            onPress={()=>this.next(item)}
                            activeOpacity={0.7}
                            
                            titleStyle = {{fontFamily:'Inter-Regular',fontSize:20}}
                            containerStyle={{backgroundColor:item.Color__Code,width:45,height:45}}
                          /> 
                      }
                      <View style={{padding:5,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{textAlign:'center',fontFamily: 'Inter-SemiBold',color:'#3F5174',fontSize:14}}>{item.First_Name}&nbsp;{item.Last_Name}</Text>
                        <Text note style={{fontSize:13,paddingTop:2,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{item.Student_Group ? item.Student_Group : '---'}</Text>
                        <Text note style={{fontSize:13,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>{item.Batch_Name ? item.Batch_Name : '---'}</Text>
                      </View>
                    </View>
                  
                </Card>
              </View>
          )}
          //Setting the number of column
          horizontal={false}
          keyExtractor={(item, index) => item.studentId}
          numColumns={2}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          
          ListFooterComponent={this.renderFooter}
          onEndReached={this.endReached}
      />
    ) : (
      <View style={{padding:10}}>
        <Text style={{textAlign:'center',fontSize:18,color:'#42526c'}}>No data</Text>
      </View>
    ) : <View style={{flex:1,backgroundColor:'#eaf3fa',justifyContent:'center',margin:10}}>
      <ActivityIndicator size="large" color="#42526c" />
    </View>
  } 

  render() {
    const isGrid = this.props.navigation.getParam('Grid');
    const isLoading = this.state.loading;
      return !isLoading ? (
         
            <View style={{padding:15,flex:1,backgroundColor:'#eaf3fa'}}>
              <Item regular style={{height:40,backgroundColor:'#fff',elevation:0.5}}>
                  <Icon type="AntDesign" name='search1' style={{color:'#919EB4'}}/>
                  <Input style={{fontFamily:'Inter-Regular',fontSize:16,color:'#919EB4'}}
                   placeholder='Search' name="search"
                   value={this.state.search}
                   onChange={(e) => this.textChange(e)} 
                  />
                  {
                    this.state.search && 
                    <Button
                      icon={
                        <Icon
                          name="close"
                          type="EvilIcons"
                          size={15}
                          color="#000"
                        />
                      }
                      onPress={this.cancel}
                      title=""
                      buttonStyle={{backgroundColor:'transparent'}}
                    />
                  }
                  
              </Item>

                { isGrid ? this.renderGrid() : this.renderList() }
                  
                    
                  
             <Modal
                isVisible={this.state.isModalVisible === 5}
                style={[styles.bottomModal]}
                onBackdropPress={() => this.setState({isModalVisible: null})}

              >
                
                <View style={[styles.modalContent]}>
                  <Avatar
                      rounded
                      icon={{name: 'close', type: 'Entypo',color:'#000'}}
                      activeOpacity={0.1}
                      onPress={() => this.setState({isModalVisible: null})}
                      containerStyle={{width:30,height:30,alignSelf: 'flex-end',right:10,backgroundColor:'#e7eaef',elevation:1}}
                    />
                  <TouchableOpacity onPress={this.edit}>
                    <CardItem style={{backgroundColor:'#E6E9EF'}} >
                      <Avatar
                        rounded
                        icon={{name: 'edit', type: 'Entypo',color:'#000'}}
                        activeOpacity={0.1}
                        containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                      />
                      <View>
                        <Text style={{paddingLeft:15,fontFamily: 'Inter-Medium',color:'#3F5174',fontSize:17}}>Edit Profile</Text>
                        <Text note style={{paddingLeft:15,fontSize:14,fontFamily:'Inter-Regular',color:'#6E7F9A'}}>Change information for this profile</Text>
                      </View>
                      
                    </CardItem>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <CardItem style={{backgroundColor:'#E6E9EF'}}>
                      <Avatar
                        rounded
                        icon={{name: 'level-up', type: 'entypo',color:'#000'}}
                        activeOpacity={0.1}
                        containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                      />
                      
                      <View>
                        <Text style={{paddingLeft:15,fontFamily: 'Inter-Medium',color:'#3F5174',fontSize:17}}>Change level</Text>
                        <Text note style={{paddingLeft:15,fontSize:14,fontFamily: 'Inter-Regular',color:'#6E7F9A'}}>Moved to different group</Text>
                      </View>
                    </CardItem>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <CardItem style={{backgroundColor:'#E6E9EF'}}>
                      <Avatar
                        rounded
                        icon={{name: 'archive', type: 'Feather',color:'#000'}}
                        activeOpacity={0.1}
                        containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                      />
                      
                      <View>
                        <Text style={{paddingLeft:15,fontFamily: 'Inter-Medium',color:'#3F5174',fontSize:17}}>Archieve</Text>
                        <Text note style={{paddingLeft:15,fontSize:14,fontFamily:'Inter-Regular',color:'#6E7F9A'}}>Remove from the list and archieve</Text>
                      </View>
                    </CardItem>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <CardItem style={{backgroundColor:'#E6E9EF'}}>
                      <Avatar
                        rounded
                        icon={{name: 'location-arrow', type: 'font-awesome',color:'#000'}}
                        activeOpacity={0.1}
                        containerStyle={{backgroundColor:'#e7eaef',elevation:10}}
                      />
                      
                      <View>
                        <Text style={{paddingLeft:15,fontFamily: 'Inter-Medium',color:'#3F5174',fontSize:17}}>Get in Touch</Text>
                        <Text note style={{paddingLeft:15,fontSize:14,fontFamily:'Inter-Regular',color:'#6E7F9A'}}>Send message or provide tasks</Text>
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

export default StudentsScreen;

const styles = StyleSheet.create({
  container: {
  	flex:1,
  	padding:50,
  	alignItems:"center",
    backgroundColor : '#eaf3fa'
  },
  modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
  	marginTop:100,
    fontSize: 25,
    fontWeight: 'bold',
  },
 
  modalContent: {
    backgroundColor: '#E6E9EF',
    padding: 5,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 15,borderTopRightRadius: 15,elevation:20,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  }
});