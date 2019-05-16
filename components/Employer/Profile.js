import React,{Component} from 'react';
import {View,ImageBackground, Image,Text,StyleSheet,TextInput,
    Dimensions,ScrollView, TouchableOpacity,Picker,Platform,AsyncStorage,
    SafeAreaView } from 'react-native';
import MainStyles from '../Styles';
import Loader from '../Loader';
import Toast from 'react-native-simple-toast';
import { SERVER_URL } from '../../Constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import Header from '../Navigation/Header';
const { height, width } = Dimensions.get('window');
class Profile extends Component{
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            isEditing:false,
            CountryList:['Australia','New Zealand'],
            stateList:['VIC','NSW','QLD','ACT','TAS','NT','WA','SA','North Island','South Island'],
            userData:{
                user_img:''
            }
        }
    }
    async saveDetails(key,value){
        await AsyncStorage.setItem(key,value);
    }
    async setUserData(){
        let userDataStringfy = await AsyncStorage.getItem('userData');
        let userData = JSON.parse(userDataStringfy);
        this.setState({
            userData,
            fname:userData.fname,
            lname:userData.lname,
            user_img:userData.user_img,
            email:userData.email,
            phone:userData.phone,
            address:userData.address,
            city:userData.city,
            state:userData.state,
            country:userData.country,
            postal:userData.postal,
            user_type:userData.user_type
        });
    }
    pickFile = ()=>{
        const options = {
            title: 'Select File',
            storageOptions: {
              skipBackup: false,
              path: 'images',
            },
            maxWidth:400,
            maxHeight:400,
            mediaType:'photo',
            quality:0.7,
            allowsEditing:true,
          };
          
          /**
           * The first arg is the options object for customization (it can also be null or omitted for default options),
           * The second arg is the callback which sends object: response (more info in the API Reference)
           */
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.setState({
                profilePicName:response.fileName,
                fileData:{data:response.data,name:response.fileName},
                user_img: response.uri,
              });
            }
          });
    }
    componentDidMount(){
        this.setUserData();
        setTimeout(()=>{
            this.setState({loading:false});
        },1000);
    }
    updateProfile = ()=>{
        this.setState({loading:true});
        var formdata = new FormData();
        formdata.append('user_id',this.state.userData.id);
        formdata.append('fname',this.state.fname);
        formdata.append('lname',this.state.lname);
        formdata.append('address',this.state.address);
        formdata.append('city',this.state.city);
        formdata.append('state',this.state.state);
        formdata.append('postal',this.state.postal);
        formdata.append('country',this.state.country);
        fetch(SERVER_URL+'update_emp_profile',{
            method:'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formdata
        })
        .then((res)=>res.json())
        .then((response)=>{
            if(response.status == 200){
                Toast.show(response.message,Toast.SHORT);
                this.saveDetails('userData',JSON.stringify(response.result));
            }
            else{
                Toast.show(response.message,Toast.SHORT);
            }
            this.setState({loading:false});
        })
        .catch((err)=>{
            console.log(err);
            this.setState({loading:false});
        });
    }
    render(){
        const RemoveHiehgt = height - 50;
        return (
            <SafeAreaView style={{flex:1,backgroundColor:'#f0f0f0'}}>
                <Loader loading={this.state.loading} />
                <Header pageName="Profile" style={{elevation:5,
                    shadowColor:'#000000',
                    shadowOffset:3,
                    shadowOpacity:0.8,
                    shadowRadius:3,}} />
                <ScrollView style={{flex:1,backgroundColor:'#FFFFFF',height:RemoveHiehgt}}>
                    <View style={{backgroundColor:'#1d7bc3',paddingHorizontal:10,flexDirection:'row',alignItems:'center'}}>
                        <View style={{width:100,height:100,borderRadius: 100,justifyContent:'center',alignItems:'center',marginBottom: 10,marginTop:20,elevation:50}}>
                            {
                                this.state.user_img != '' && 
                                <ImageBackground  source={{uri:this.state.user_img}} style={{overflow:'hidden',width:100,height:100,borderRadius: 100}}></ImageBackground>
                            }
                            <TouchableOpacity style={{
                                    width:25,
                                    height:25,
                                    backgroundColor:'#FFFFFF',
                                    position: 'absolute',
                                    right:1,
                                    bottom:1,
                                    borderWidth: 2,
                                    borderColor: '#FFFFFF',
                                    borderRadius:100,
                                    alignItems:'center',
                                    justifyContent: 'center',
                            }} onPress={()=>{this.pickFile()}}>
                                <Image source={require('../../assets/camera-icon.png')} style={{width:15,height:14}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems:'center',marginLeft: 15}}>
                            <View style={{alignItems:'center',flexDirection:'row'}}>
                                <Text style={{fontFamily:'AvenirLTStd-Meduim',color:'#FFFFFF',fontSize:16}}>{this.state.fname} {this.state.lname}</Text>
                                <TouchableOpacity style={{marginLeft:10}} onPress={()=>{
                                    if(this.state.isEditing == true){this.setState({isEditing:false});}
                                    else{this.setState({isEditing:true});}
                                    }}>
                                    <Image source={require('../../assets/pencil-white-icon.png')} style={{width:12,height:12}} />
                                </TouchableOpacity>
                            </View>
                            <View style={{justifyContent:'flex-start'}}>
                                <Text style={{fontFamily:'AvenirLTStd-Meduim',color:'#FFFFFF',fontSize:16,textAlign:'left'}}>{this.state.phone}</Text>
                            </View>
                        </View>
                    </View>
                    {this.state.isEditing == false && <View style={{paddingHorizontal:20}}>
                        <View style={MainStyles.locumProfileItemWrapper}>
                            <Text style={MainStyles.LPIHeading}>Mobile Number</Text>
                            <Text style={MainStyles.LPISubHeading}>{this.state.phone}</Text>
                        </View>
                        <View style={MainStyles.locumProfileItemWrapper}>
                            <Text style={MainStyles.LPIHeading}>Email</Text>
                            <Text style={MainStyles.LPISubHeading}>{this.state.email}</Text>
                        </View>
                        <View style={MainStyles.locumProfileItemWrapper}>
                            <Text style={MainStyles.LPIHeading}>Address</Text>
                            <Text style={MainStyles.LPISubHeading}>{this.state.address} {this.state.city} {this.state.state}, {this.state.country} {this.state.postal} </Text>
                        </View>
                    </View>} 
                    {
                        this.state.isEditing == true && 
                        <View style={{paddingHorizontal:20}}>
                            <View style={{marginTop:15}}></View>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                                Name
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
                                <TextInput 
                                    style={MainStyles.TInput} 
                                    placeholder="First Name" 
                                    returnKeyType={"go"} 
                                    ref={(input) => { this.fname = input; }} 
                                    blurOnSubmit={false}
                                    onChangeText={(text)=>this.setState({fname:text})} 
                                    placeholderTextColor="#bebebe" 
                                    underlineColorAndroid="transparent" 
                                    value={this.state.fname}
                                />
                                <View style={{paddingHorizontal:10}}></View>
                                <TextInput 
                                    style={MainStyles.TInput} 
                                    placeholder="Last Name" 
                                    returnKeyType={"go"} 
                                    ref={(input) => { this.lname = input; }} 
                                    blurOnSubmit={false}
                                    onChangeText={(text)=>this.setState({lname:text})} 
                                    placeholderTextColor="#bebebe" 
                                    underlineColorAndroid="transparent" 
                                    value={this.state.lname}
                                />
                            </View>
                            {/* First & Last Name Ends */}
                            <View style={{marginTop:15}}></View>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                                Address
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{marginTop:10}}></View>
                            <TextInput 
                                style={MainStyles.TInput} 
                                placeholder="Street Address" 
                                returnKeyType={"go"} 
                                ref={(input) => { this.address = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({address:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.address}
                            />
                            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
                                <TextInput 
                                    style={MainStyles.TInput} 
                                    placeholder="City" 
                                    returnKeyType={"go"} 
                                    ref={(input) => { this.city = input; }} 
                                    blurOnSubmit={false}
                                    onChangeText={(text)=>this.setState({city:text})} 
                                    placeholderTextColor="#bebebe" 
                                    underlineColorAndroid="transparent" 
                                    value={this.state.city}
                                />
                                <View style={{paddingHorizontal:5}}></View>
                                {
                                    Platform.OS == 'android' && 
                                    <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                        <Picker
                                        selectedValue={this.state.state}
                                        style={{
                                            flex:1,
                                            paddingLeft: 10,
                                            paddingVertical:2,
                                            height:30,
                                        }}
                                        textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                        itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                        itemStyle={MainStyles.TInput}
                                        onValueChange={(itemValue, itemIndex) => this.setState({state: itemValue})}>
                                            {
                                            this.state.stateList.map(item=>{
                                                return (
                                                <Picker.Item key={'key-'+item} label={item} value={item} />
                                                )
                                            })
                                            }
                                        </Picker>
                                    </View>
                                }
                                {
                                    Platform.OS == 'ios' && 
                                    <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                        <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.state}</Text>
                                    </TouchableOpacity>
                                    
                                }
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
                                <TextInput 
                                    style={MainStyles.TInput} 
                                    placeholder="Postal / Zipcode" 
                                    returnKeyType={"go"} 
                                    ref={(input) => { this.postal = input; }} 
                                    blurOnSubmit={false}
                                    onChangeText={(text)=>this.setState({postal:text})} 
                                    placeholderTextColor="#bebebe" 
                                    underlineColorAndroid="transparent" 
                                    value={this.state.postal}
                                />
                                <View style={{paddingHorizontal:5}}></View>
                                {
                                    Platform.OS == 'android' && 
                                    <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                        <Picker
                                        selectedValue={this.state.country}
                                        style={{
                                            flex:1,
                                            paddingLeft: 10,
                                            paddingVertical:2,
                                            height:30,
                                        }}
                                        textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                        itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                        itemStyle={MainStyles.TInput}
                                        onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
                                            {
                                            this.state.CountryList.map(item=>{
                                                return (
                                                <Picker.Item key={'key-'+item} label={item} value={item} />
                                                )
                                            })
                                            }
                                        </Picker>
                                    </View>
                                }
                                {
                                    Platform.OS == 'ios' && 
                                    <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                        <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.country}</Text>
                                    </TouchableOpacity>
                                    
                                }
                            </View>
                            {/* Address Ends */}
                            <View style={{marginTop:15}}></View>
                            <View style={{justifyContent:'center',alignItems:'center',marginTop: 10,marginBottom:15}}>
                                <TouchableOpacity style={[MainStyles.psosBtn,MainStyles.psosBtnSm]} onPress={()=>{this.updateProfile()}}>
                                    <Text style={[MainStyles.psosBtnText,{fontFamily:'AvenirLTStd-Light',fontSize:15}]}>Update Detail</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const currentStyles = StyleSheet.create({

})
export default Profile;