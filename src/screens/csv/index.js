import React, { PureComponent } from 'react';
import {SafeAreaView, StyleSheet, Text,ScrollView,TouchableOpacity,Image,AsyncStorage,
  Platform,
  PermissionsAndroid} from 'react-native';

import { Button,View,Toast  } from 'native-base';

import globalStyle from './../../assets/styles';
import { uploadCSV } from './../../services/apiCall';

import DocumentPicker from 'react-native-document-picker';
import Modal from 'react-native-modal';
import ProgressBar from 'react-native-progress/Bar'

import RNFetchBlob from 'rn-fetch-blob';

var RNFS = require('react-native-fs');


class CsvScreen extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      singleFile: '',
      userMobile : '',
      isModalVisible : null,
      download : false
    };
    this.selectOneFile = this.selectOneFile.bind(this);
    this.move = this.move.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
    let self = this;
    AsyncStorage.getItem("userMobile").then(res => {
      self.setState({
        userMobile : res
      })
    })
  }

   async selectOneFile () {
     try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });
      //Printing the log realted to the file
      if (res.type == "text/comma-separated-values") {
        this.setState({
          isModalVisible : 1
        })
        
        await RNFS.readFile(res.uri) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then((result) => {
              var csv = result;
              var lines = csv.split("\r");
             
              for (let i = 0; i < lines.length; i++) {
                lines[i] = lines[i].replace(/\s/, '')
              }
              var result1 = [];
              var emptyList = [];
              var headers = lines[0].toString().split(",");
             
              headers = headers.map(function (h) {
                return h.trim();
              });
              let firstName = headers.indexOf("First_Name");
              let lastName = headers.indexOf("Last_Name");
              let studentType = headers.indexOf("Student_Type");
              let DateOfBirth = headers.indexOf("Date_Of_Birth");
              let CellNumber = headers.indexOf("Cell_Phone_Number");
             
              let index = lines.length;
              lines.splice(index-1);
              for (var i = 1; i < lines.length; i++) {
                var obj = {};
                var currentline = lines[i].split(",");
                for (var j = 0; j < headers.length; j++) {
                  if(currentline[0] === '' &&
                     currentline[1] === '' &&
                     currentline[2] === '' &&
                     currentline[3] === '' &&
                     currentline[4] === '' &&
                     currentline[5] === '') {
                    break;
                  }

                  obj[headers[j]] = currentline[j];
                  if(currentline[j] === '') {
                    emptyList.push(headers[j])
                  } 
                  if(headers.length === j+1) {
                    obj['userMobile'] = this.state.userMobile;
                    result1.push(obj);
                  }
                }
                
              }
              
              if(firstName != -1 && lastName != -1 
                 && studentType != -1 && DateOfBirth != -1 && CellNumber != -1) {
                let filter = result1.filter(
                    a=>a.First_Name === "" || a.Last_Name === "" || a.Student_Type === "" ||
                    a.Date_Of_Birth === "" || a.Cell_Phone_Number === "" 
                  )
                if(filter.length === 0) {
                  let currData=JSON.parse(JSON.stringify(result1));
                  let params = {
                    collection : currData,
                    mobile : this.state.userMobile
                  }
                  uploadCSV('student/uploadStudentData',currData)
                    .then(response => response.json())
                    .then((res)=>{
                      let result = res;
                      if(res.status === 200) {
                        this.setState({
                          isModalVisible : null
                        })
                        this.props.navigation.navigate('Success')
                      }
                    })
                    .catch((err)=>{
                      this.setState({
                        isModalVisible : null
                      }) 
                      Toast.show({
                        text: "Upload CSV failed!",
                        buttonText: "",
                        duration: 1500
                      })
                    })
                } else {
                  this.setState({
                    isModalVisible : null
                  })
                  console.log("error1");
                  throw 'First_Name,Last_Name,Student_Type,Date_Of_Birth,Cell_Phone_Number is mandatory!';
                }
              } else {
                  this.setState({
                    isModalVisible : null
                  })
                  console.log("error2");
                  throw 'First_Name,Last_Name,Student_Type,Date_Of_Birth,Cell_Phone_Number is mandatory!';
              }
              
            });
      } else {
        throw 'Kindly pick the csv file!';
      }
     
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
      } else {
        alert("err "+JSON.stringify(err));
      }
    }
    
  }

  async move() {
    this.setState({
      download : true
    })
    if (Platform.OS === 'ios') {
      this.downloadImage();
    } else {
      try {
        
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.downloadImage()
        } else {
          alert('Storage Permission Not Granted');
         
        }
      } catch (err) {
        alert(err);
      }
    }
  }

  downloadImage(){
    //Main function to download the image
    let date = new Date(); //To add the time suffix in filename
    //Image URL which we want to download
    let image_URL = 'http://3.21.105.57:3001/STUDENT_TEMPLATE.csv';
    
    const { config, fs } = RNFetchBlob;
    let PictureDir = RNFetchBlob.fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:PictureDir +'/'+Math.floor(date.getTime()+date.getSeconds()/2) + '_STUDENT_TEMPLATE.csv',
        description: 'CSV',
      },
    };
    let self = this;
    
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        this.setState({
          download : false
        })
        Toast.show({
          text: "Excel downloaded successfully!.",
          buttonText: "",
          duration: 1500,
          style: {
            fontFamily: "Inter-Regular"
           }
        })
      });
  };

  render() {
    const { download } = this.state;
    return (
      <SafeAreaView style={styles.container}>
      
            <View>
              <Image style={{resizeMode:'center',alignSelf:'center'}} source={require('./../../assets/images/upload.png')}/>
            </View>

            <Text style={{fontFamily: 'Inter-Regular',fontSize:15,color:'#717275',textAlign: 'justify',lineHeight: 25}}>
              You can import a table into Kyool by uploading a .CSV file with tabular data.Most
              spreadsheet applications will allow you to export your spreadsheet as a .CSV file
            </Text> 

            <View style={{height:20}}></View>

            <TouchableOpacity
              activeOpacity={0.5} > 
              <Button block onPress={this.selectOneFile} style={[globalStyle.buttonColor,{width:250,alignSelf: 'center'}]}>
                <Text style={{color : '#fff',fontSize:20,fontFamily: 'Inter-Regular'}}>Choose a .CSV file</Text>
              </Button>
            </TouchableOpacity>
             <View style={{height:20}}></View>
            <TouchableOpacity activeOpacity={0.5} disable={download} >
              <Button block style={[globalStyle.buttonGrey,{width:250,alignSelf: 'center'}]} onPress={this.move}>
               { 
                download ? 
                <Text style={{color : '#000',fontSize:20,fontFamily: 'Inter-Regular'}}>Wait...</Text>
                :
                <Text style={{color : '#000',fontSize:20,fontFamily: 'Inter-Regular'}}>Download Template</Text>
              }
              </Button>
            </TouchableOpacity>
            
            <Modal
              isVisible={this.state.isModalVisible === 1}
            >
              <View style={styles.modalContent}>
                <View> 
                  <Text style={{fontSize:17,color:'grey'}}>
                    Importing .CSV file {"\n"}
                  </Text>
                </View>
                <View>
                  <ProgressBar progress={1} width={null} color={'#87c351'} indeterminate={true}/>
                </View>
              </View>
            </Modal>
       </SafeAreaView>
    )
  }
  
}

export default CsvScreen;

const styles = StyleSheet.create({
  container: {
  	flex:1,
  	padding:15,
    backgroundColor: '#eaf3fa'
  },
  title: {
  	marginTop:100,
    fontSize: 25,
    fontWeight: 'bold',
  },
  button : {
    backgroundColor : '#87c351',
    borderRadius:10
  },
  modalContent: {
    backgroundColor: '#E6E9EF',
    margin: 20,
    padding:10,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height:100,
    width:'80%',
    justifyContent:'center',
    alignSelf:'center'
  }
});