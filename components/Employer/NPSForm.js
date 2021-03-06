import React,{Component} from 'react';
import {View,SafeAreaView, Image,Text, ScrollView,TextInput,TouchableOpacity,KeyboardAvoidingView,
    Picker,Dimensions,FlatList,AsyncStorage,
    ActionSheetIOS,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions,NavigationActions } from 'react-navigation';
import Loader from '../Loader';
import MainStyles from '../Styles';
import Toast from 'react-native-simple-toast';
import { SERVER_URL } from '../../Constants';
import DateTimePicker from "react-native-modal-datetime-picker";
const { height, width } = Dimensions.get('window');
var myHeaders = new Headers();
myHeaders.set('Accept', 'application/json');
//myHeaders.set('Content-Type', 'application/json');
myHeaders.set('Cache-Control', 'no-cache');
myHeaders.set('Pragma', 'no-cache');
myHeaders.set('Expires', '0');
class NPSFormScreen extends Component{
    constructor(props) {
        super(props);
        var dispensingList = ['WiniFRED','FredNXT','LOTS','Minfos','Simple','Quickscript','Merlin','Other'];
        dispensingList.unshift('Cancel');
        var travelList = ['Travel and accommodation offered','Travel and accommodation NOT offered','Travel and accommodation may be negotiated'];
        travelList.unshift('Cancel');
        this.state={
            loading:true,
            pharm_id:this.props.navigation.getParam("pharm_id"),
            job_id:this.props.navigation.getParam("job_id"),
            timHours:{},
            timeMinutes:{},
            dateDays:{},
            dateMonth:{},
            dateYears:{},
            startDay:'01',
            startMonth:'01',
            startYear:'2019',
            dispensingList:dispensingList,
            travelList:travelList,
            travelAcom:'Travel and accommodation NOT offered',
            disSystem:'WiniFRED',
            disSystemOther:'',
            pOffers:'Yes',
            shiftName:'',
            rate_hour:'',
            rate_annum:'',
            benefits:'',
            roles:'',
            abt_role:'',
            position_name:'',
            position_type:'',
            pharmacy_type:'',
            technician:'',
            scripts:'',
            webster:'',
            listing_role:'',
            isDateTimePickerVisible:false
        }
    }
    async setUserData(){
        let userDataStringfy = await AsyncStorage.getItem('userData');
        let userData = JSON.parse(userDataStringfy);
        this.setState({userData});
    }
    componentWillMount =()=>{
        this.setUserData();
        var timHours = [];
        var timeMinutes = [];
        var dateDays = [];
        var dateMonth = [];
        var dateYears = [];
        for(var i = 1;i<25;i++){
            var k = i;
            if(i < 10){k = '0'+i;}
            timHours.push(''+k);
        }
        for(var i = 1;i<61;i++){
            var k = i;
            if(i < 10){k = '0'+i;}
            timeMinutes.push(''+k);
        }
        for(var i = 1;i<32;i++){
            var k = i;
            if(i < 10){k = '0'+i;}
            dateDays.push(''+k);
        }
        for(var i = 1;i<13;i++){
            var k = i;
            if(i < 10){k = '0'+i;}
            dateMonth.push(''+k);
        }
        for(var i = 2019;i<2031;i++){
            dateYears.push(''+i);
        }
        var currentDate = new Date();
        var startDay = ''+currentDate.getDate();
        var startMonth = ''+(currentDate.getMonth()+1);
        var startYear = ''+currentDate.getFullYear();
        if(startDay < 10){startDay = '0'+startDay;}
        if(startMonth < 10){startMonth = '0'+startMonth;}
        this.setState({timHours,timeMinutes,dateDays,dateMonth,dateYears,currentDate,startDay,startMonth,startYear});
    }
    componentDidMount(){
        if(this.state.job_id){
            fetch(SERVER_URL+'permanent_details?id='+this.state.job_id,{
                method:'GET',
                headers:myHeaders
            })
            .then(res=>res.json())
            .then(response=>{
                console.log(response);
                var r = response.result;
                var startArray = (r.start_date).split('-');
                this.setState({
                    loading:false,
                    pageTitle:'Edit Permanent Position',
                    startDay:startArray[2],
                    startMonth:startArray[1],
                    startYear:startArray[0],
                    travelAcom:r.travel,
                    disSystem:r.dispense,
                    pOffers:r.offer,
                    shiftName:r.name,
                    rate_hour:r.rate_hour,
                    rate_annum:r.rate_annum,
                    benefits:r.benefits,
                    roles:r.roles,
                    abt_role:r.abt_role,
                    position_name:r.position_name,
                    position_type:r.position_type,
                    pharmacy_type:r.pharmacy_type,
                    technician:r.technician,
                    scripts:r.scripts,
                    webster:r.webster,
                    listing_role:r.listing_role,
                    shiftDetails:r.detail,
                    
                });
            })
            .catch(err=>{
                this.setState({loading:false,pageTitle:'New Permanent Position'});
            });
        }
        else{
            this.setState({loading:false,pageTitle:'New Permanent Position'});
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        var parampharm_id = this.props.navigation.getParam("pharm_id");
        var prevEventId = prevProps.navigation.getParam("pharm_id");
        if (parampharm_id != prevState.pharm_id) {
          this.setState({
            pharm_id: parampharm_id
          });
        }
      }
    submitLocumShift = ()=>{
        if(this.state.shiftName == ''){
            Toast.show('Shift name should not be blank',Toast.SHORT);
            return false;
        }
        if(this.state.startDay == ''){
            Toast.show('Please select start day',Toast.SHORT);
            return false;
        }
        if(this.state.startMonth == ''){
            Toast.show('Please select start month',Toast.SHORT);
            return false;
        }
        if(this.state.startYear == ''){
            Toast.show('Please select start year',Toast.SHORT);
            return false;
        }
        if(this.state.shiftDetails == ''){
            Toast.show('Shif details should not be empty',Toast.SHORT);
            return false;
        }
        if(this.state.rate_hour == ''){
            Toast.show('Rate hour should not be empty',Toast.SHORT);
            return false;
        }
        if(this.state.rate_annum == ''){
            Toast.show('Rate annum should not be empty',Toast.SHORT);
            return false;
        }
        if(this.state.benefits == ''){
            Toast.show('Benefits should not be empty',Toast.SHORT);
            return false;
        }
        /*if(this.state.roles == ''){
            Toast.show('Roles should not be empty',Toast.SHORT);
            return false;
        }*/
        if(this.state.abt_role == ''){
            Toast.show('About role should not be empty',Toast.SHORT);
            return false;
        }
        if(this.state.disSystem == ''){
            Toast.show('Please choose dispensing system',Toast.SHORT);
            return false;
        }
        if(this.state.pOffers == ''){
            Toast.show('Please choose pharmacy offers',Toast.SHORT);
            return false;
        }
        if(this.state.travelAcom == ''){
            Toast.show('Please choose travel & accomodation',Toast.SHORT);
            return false;
        }
        if(this.state.position_name == ''){
            Toast.show('Please choose position required',Toast.SHORT);
            return false;
        }
        if(this.state.position_type == ''){
            Toast.show('Please choose position type',Toast.SHORT);
            return false;
        }
        if(this.state.pharmacy_type == ''){
            Toast.show('Please choose pharmacy type',Toast.SHORT);
            return false;
        }
        if(this.state.technician == ''){
            Toast.show('Please choose dispensary technician',Toast.SHORT);
            return false;
        }
        this.setState({loading:true});
        var formdata = new FormData();
        formdata.append('pharm_id',this.state.pharm_id);
        formdata.append('user_id',this.state.userData.id);
        formdata.append('name',this.state.shiftName);
        formdata.append('start_date',this.state.startYear+'-'+this.state.startMonth+'-'+this.state.startDay);
        formdata.append('detail',this.state.shiftDetails);
        formdata.append('rate_hour',this.state.rate_hour);
        formdata.append('rate_annum',this.state.rate_annum);
        formdata.append('benefits',this.state.benefits);
        formdata.append('roles',this.state.roles);
        formdata.append('abt_role',this.state.abt_role);
        formdata.append('dispense',this.state.disSystem);
        formdata.append('dispense_other',this.state.disSystemOther);
        formdata.append('offer',this.state.pOffers);
        formdata.append('travel',this.state.travelAcom);
        formdata.append('position_name',this.state.position_name);
        formdata.append('position_type',this.state.position_type);
        formdata.append('pharmacy_type',this.state.pharmacy_type);
        formdata.append('technician',this.state.technician);
        formdata.append('scripts',this.state.scripts);
        formdata.append('webster',this.state.webster);
        formdata.append('listing_role',this.state.listing_role);
        var actionTYpe = 'add_permanent';
        if(this.state.job_id){
            actionTYpe = 'update_permanent';
            formdata.append('id',this.state.job_id);
        }
        else{
            formdata.append('pharm_id',this.state.pharm_id);
        }
        fetch(SERVER_URL+actionTYpe,{
            method:'POST',
            headers: {
                Accept: 'application/json',
            },
            body:formdata
        })
        .then(res=>{console.log(res);return res.json()})
        .then(response=>{
            this.setState({loading:false});
            setTimeout(()=>{
                Toast.show(response.message,Toast.SHORT);
                this.props.navigation.navigate('JobListE');
            },200)
        })
        .catch(err=>{
            this.setState({loading:false});
            console.log(err);
            Toast.show('Something went wrong',Toast.SHORT);
        });
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    handleDatePicked = date => {
        var changeDate = new Date(date);
        var dd = ''+changeDate.getDate();
        var mm = ''+(changeDate.getMonth()+1);
        var yy = ''+changeDate.getFullYear();
        if(dd < 10){dd = '0'+dd;}
        if(mm < 10){mm = '0'+mm;}
        this.setState({
            startDay:dd,startMonth:mm,startYear:yy
        });
        console.log("A date has been picked: ", dd,mm,yy);
        this.hideDateTimePicker();
    };
    pickerDispenseList = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: this.state.dispensingList,
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if(buttonIndex != 0){
              this.setState({disSystem: this.state.dispensingList[buttonIndex]});
            }
          });
    }
    pickerTravelList = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: this.state.travelList,
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if(buttonIndex != 0){
              this.setState({travelAcom: this.state.travelList[buttonIndex]});
            }
          });
    }
    render(){
        const RemoveHiehgt = height - 52;
        var behavior = (Platform.OS == 'ios')?'padding':'';
        return(
            <SafeAreaView style={{flexDirection:'column',flex:1}}>
                <Loader loading={this.state.loading} />
                <View style={{paddingTop: 15,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}} style={{position:'absolute',left:8,top:8,paddingLeft:5,paddingRight:15,paddingVertical:15}}>
                        <Image source={require('../../assets/blue-back-icon.png')} style={{width:10,height:19}}/>
                    </TouchableOpacity>
                    <Image source={require('../../assets/web-logo.png')} style={{width:205,height:35}}/>
                    <Image source={require('../../assets/header-b.png')} style={{width:'100%',marginTop:15}}/>
                </View>
                <KeyboardAvoidingView style={{flex:1,}} enabled behavior={behavior}>
                    <ScrollView style={{paddingHorizontal:15,height:RemoveHiehgt}} keyboardShouldPersistTaps="always">
                        <View style={{paddingVertical:20,}}>
                            <Text style={{fontFamily:'AvenirLTStd-Heavy',color:'#151515',fontSize:16}}>{this.state.pageTitle}</Text>
                            <Text style={{marginTop:5,fontFamily:'AvenirLTStd-Medium',color:'#676767',fontSize:13,marginBottom:5,}}>
                               For quick, easy and efficient New Permanent Position, please use this form
                            </Text>
                        </View>
                        {/* Locum Registration Heading Ends */}
                        <Image source={require('../../assets/dashed-border.png')} width={'100%'} height={2} />
                        <View style={{justifyContent:'center',alignItems: 'center',paddingVertical:18,flexDirection: 'row'}}>
                            <View style={{paddingVertical:10,paddingHorizontal:10,backgroundColor:'#959595',borderRadius:100}}>
                                <Text style={{fontFamily:'AvenirLTStd-Medium',color:'#FFFFFF',fontSize:12,}}>Select Pharmacy</Text>
                            </View>
                            <View style={{paddingHorizontal:10}}>
                                <Image source={require('../../assets/dashed-b-s.png')} width={100} style={{width:50}}/>
                            </View>
                            <View style={{paddingVertical:10,paddingHorizontal:10,backgroundColor:'#1476c0',borderRadius:100}}>
                                <Text style={{fontFamily:'AvenirLTStd-Medium',color:'#FFFFFF',fontSize:12}}>Shift Details</Text>
                            </View>
                        </View>
                        <Image source={require('../../assets/dashed-border.png')} width={'100%'} height={2}/>
                        {/* BreadCrumbs Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Shift Name
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            style={[MainStyles.TInput]} 
                            returnKeyType={"go"} 
                            ref={(input) => { this.shiftName = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({shiftName:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.shiftName}
                        />
                        {/* Shift Name ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Preferred Start Date
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:10}}>
                            <TextInput 
                                style={[MainStyles.TInput]} 
                                returnKeyType={"next"} 
                                ref={(input) => { this.startDay = input; }} 
                                blurOnSubmit={false}
                                keyboardType={"number-pad"}
                                onChangeText={(text)=>this.setState({startDay:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.startDay}
                                maxLength={2}
                            />
                            <View style={{paddingHorizontal:5}}></View>
                            <TextInput 
                                style={[MainStyles.TInput]} 
                                returnKeyType={"next"} 
                                ref={(input) => { this.startMonth = input; }} 
                                blurOnSubmit={false}
                                keyboardType={"number-pad"}
                                onChangeText={(text)=>this.setState({startMonth:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.startMonth}
                                maxLength={2}
                            />
                            <View style={{paddingHorizontal:5}}></View>
                            <TextInput 
                                style={[MainStyles.TInput]} 
                                returnKeyType={"next"} 
                                ref={(input) => { this.startYear = input; }} 
                                blurOnSubmit={false}
                                keyboardType={"number-pad"}
                                onChangeText={(text)=>this.setState({startYear:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.startYear}
                                maxLength={4}
                            />
                            {/* End Date Year End*/}
                            <View style={{paddingHorizontal:5}}></View>
                            <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            minimumDate={this.state.currentDate}
                            />
                            <TouchableOpacity   onPress={this.showDateTimePicker}>
                            <Image source={require('../../assets/calendar-icon.png')} style={{width:20,height:20}} />
                            </TouchableOpacity>
                            
                        </View>
                        {/* Preferred Start Date Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Shift Details
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            multiline={true}
                            style={[MainStyles.TInput,{height:80}]} 
                            returnKeyType={"go"} 
                            ref={(input) => { this.shiftDetails = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({shiftDetails:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.shiftDetails}
                        />
                        {/* Shift Details Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Pay Rate
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:10}}>
                            <TextInput 
                                placeholder="Per Hour"
                                style={[MainStyles.TInput]} 
                                returnKeyType={"next"} 
                                ref={(input) => { this.rate_hour = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({rate_hour:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.rate_hour}
                            />
                            <View style={{paddingHorizontal:10}}></View>
                            <TextInput 
                                placeholder="Per Annum"
                                style={[MainStyles.TInput]} 
                                returnKeyType={"next"} 
                                ref={(input) => { this.rate_annum = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({rate_annum:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.rate_annum}
                            />
                        </View>
                        {/* Pay Rate Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Benefits 
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            placeholder="Benefits"
                            style={[MainStyles.TInput]} 
                            returnKeyType={"next"} 
                            ref={(input) => { this.benefits = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({benefits:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.benefits}
                        />
                        {/* Benefits Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                        About the role
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            multiline={true}
                            style={[MainStyles.TInput,{height:80}]} 
                            returnKeyType={"go"} 
                            ref={(input) => { this.abt_role = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({abt_role:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.abt_role}
                        />
                        {/* About the role Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Dispensing System
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        {
                            Platform.OS == 'android' && 
                            <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                <Picker
                                selectedValue={this.state.disSystem}
                                style={{
                                    flex:1,
                                    paddingVertical:2,
                                    height:30,
                                }}
                                mode="dropdown"
                                textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                itemStyle={MainStyles.TInput}
                                onValueChange={(itemValue, itemIndex) => this.setState({disSystem: itemValue})}>
                                    <Picker.Item label="Choose" value="" />
                                    {
                                    this.state.dispensingList.map((item,key)=>{
                                        return (
                                        <Picker.Item key={'key-'+key} label={''+item} value={''+item} />
                                        )
                                    })
                                    }
                                </Picker>
                            </View>
                        }
                        {
                            Platform.OS == 'ios' && 
                            <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerDispenseList()}}>
                                <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.disSystem}</Text>
                            </TouchableOpacity>
                            
                        }
                        {
                            this.state.disSystem == 'Other' && 
                            <View>
                                <View style={{marginTop:15}}></View>
                                <TextInput 
                                    style={[MainStyles.TInput]} 
                                    returnKeyType={"go"} 
                                    ref={(input) => { this.disSystemOther = input; }} 
                                    blurOnSubmit={false}
                                    onChangeText={(text)=>this.setState({disSystemOther:text})} 
                                    placeholder="Dispensing System Other"
                                    placeholderTextColor="#bebebe" 
                                    underlineColorAndroid="transparent" 
                                    value={this.state.disSystemOther}
                                />
                            </View>
                        }
                        {/* Dispensing System Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Pharmacy Offers Pharmacotherapy
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper]} onPress={()=>{this.setState({pOffers:'Yes'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                    {this.state.pOffers == 'Yes' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginLeft:40}]} onPress={()=>{this.setState({pOffers:'No'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                   {this.state.pOffers == 'No' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>No</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Pharmacy Offers Pharmacotherapy Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Travel and Accommodation (non-metro)
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        {
                            Platform.OS == 'android' && 
                            <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                <Picker
                                selectedValue={this.state.travelAcom}
                                style={{
                                    flex:1,
                                    paddingVertical:2,
                                    height:30,
                                }}
                                mode="dropdown"
                                textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                itemStyle={MainStyles.TInput}
                                onValueChange={(itemValue, itemIndex) => this.setState({travelAcom: itemValue})}>
                                    <Picker.Item label="Choose" value="" />
                                    {
                                    this.state.travelList.map((item,key)=>{
                                        return (
                                        <Picker.Item key={'key-'+key} label={''+item} value={''+item} />
                                        )
                                    })
                                    }
                                </Picker>
                            </View>
                        }
                        {
                            Platform.OS == 'ios' && 
                            <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerTravelList()}}>
                                <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.travelAcom}</Text>
                            </TouchableOpacity>
                            
                        }
                        {/* Travel and Accommodation (non-metro) Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Position Required
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper]} onPress={()=>{this.setState({position_name:'Manager'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                    {this.state.position_name == 'Manager' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Manager</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginLeft:10}]} onPress={()=>{this.setState({position_name:'Pharmacist'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                   {this.state.position_name == 'Pharmacist' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Pharmacist</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginLeft:10}]} onPress={()=>{this.setState({position_name:'Pharmacist in charge'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                   {this.state.position_name == 'Pharmacist in charge' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Pharmacist in charge</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper]} onPress={()=>{this.setState({position_name:'Intern'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                    {this.state.position_name == 'Intern' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Intern</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start'}]} onPress={()=>{this.setState({position_name:'Phamacy Assistant'});}}>
                                <View style={[MainStyles.checkBoxStyle,{marginRight:3}]}>
                                   {this.state.position_name == 'Phamacy Assistant' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel,{fontSize:12}]}>Phamacy Assistant</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start'}]} onPress={()=>{this.setState({position_name:'Dispensary Technician'});}}>
                                <View style={[MainStyles.checkBoxStyle,{marginRight:3}]}>
                                   {this.state.position_name == 'Dispensary Technician' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel,{fontSize:12}]}>Dispensary Technician</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper]} onPress={()=>{this.setState({position_name:'Retail Manager'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                    {this.state.position_name == 'Retail Manager' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Retail Manager</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start'}]} onPress={()=>{this.setState({position_name:'Phamacy Nurse'});}}>
                                <View style={[MainStyles.checkBoxStyle,{marginRight:3}]}>
                                   {this.state.position_name == 'Phamacy Nurse' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Phamacy Nurse</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start'}]} onPress={()=>{this.setState({position_name:'Stock Handler'});}}>
                                <View style={[MainStyles.checkBoxStyle,{marginRight:3}]}>
                                   {this.state.position_name == 'Stock Handler' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Stock Handler</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper]} onPress={()=>{this.setState({position_name:'Admin'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                    {this.state.position_name == 'Admin' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Admin</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start'}]} onPress={()=>{this.setState({position_name:'Retail Assistant'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                   {this.state.position_name == 'Retail Assistant' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Retail Assistant</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper]} onPress={()=>{this.setState({position_name:'PIC'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                    {this.state.position_name == 'PIC' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>PIC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper]} onPress={()=>{this.setState({position_name:'PIC2'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                   {this.state.position_name == 'PIC2' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>PIC2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start'}]} onPress={()=>{this.setState({position_name:'Other'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                   {this.state.position_name == 'Other' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Other</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Position Required Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Position Type
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{marginTop:10}]} onPress={()=>{this.setState({position_type:'Permanent Full Time'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                    {this.state.position_type == 'Permanent Full Time' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Permanent Full Time</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginTop:10}]} onPress={()=>{this.setState({position_type:'Permanent Part Time'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                   {this.state.position_type == 'Permanent Part Time' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Permanent Part Time</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginTop:10}]} onPress={()=>{this.setState({position_type:'Locum'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                   {this.state.position_type == 'Locum' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Locum</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Position Type Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Type Of Pharmacy
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            placeholder="Medical Centre"
                            style={[MainStyles.TInput]} 
                            returnKeyType={"next"} 
                            ref={(input) => { this.pharmacy_type = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({pharmacy_type:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.pharmacy_type}
                        />
                        {/* Type Of Pharmacy Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Is there a dispensary technician?
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper]} onPress={()=>{this.setState({technician:'Yes'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                    {this.state.technician == 'Yes' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginLeft:40}]} onPress={()=>{this.setState({technician:'No'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                   {this.state.technician == 'No' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>No</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Is there a dispensary technician? Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Approx. Scripts Per Day
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            placeholder="Type Scripts"
                            style={[MainStyles.TInput]} 
                            returnKeyType={"next"} 
                            ref={(input) => { this.scripts = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({scripts:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.scripts}
                        />
                        {/* Approx. Scripts Per Day Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Webster Packs or similar
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            placeholder="None"
                            style={[MainStyles.TInput]} 
                            returnKeyType={"next"} 
                            ref={(input) => { this.webster = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({webster:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.webster}
                        />
                        {/* Webster Packs or similar Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14,lineHeight: 18,}}>
                            Are You listing this role exclusively with Pharmacy SOS? (Roles listed exclusively with Pharmacy SOS recieve priority)
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper]} onPress={()=>{this.setState({listing_role:'Yes'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                    {this.state.listing_role == 'Yes' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginLeft:40}]} onPress={()=>{this.setState({listing_role:'No'});}}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                   {this.state.listing_role == 'No' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>No</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Is there a dispensary technician? Ends */}
                        <View style={{
                            justifyContent:'center',
                            alignItems:'center',
                            marginTop:26
                        }}>
                            <TouchableOpacity style={[MainStyles.psosBtn,MainStyles.psosBtnSm]} onPress={()=>{this.submitLocumShift()}}>
                                <Text style={MainStyles.psosBtnText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginTop:5}} onPress={()=>{
                                this.props.navigation.goBack();
                            }}>
                                <Text style={{color:'#1476c0',textDecorationLine:'underline',textDecorationColor:'#1476c0',textDecorationStyle:'solid'}}>Previous</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:20}}></View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}
export default NPSFormScreen;