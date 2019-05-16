/**
 * Pharmasy SOS App
 * 
 *
 * @format
 * @flow
 */
import React from 'react';
import { ScrollView, TouchableOpacity,View,SafeAreaView,ImageBackground,Image,Text,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator, DrawerItems, createStackNavigator } from 'react-navigation';
import { DashboardScreen,AboutScreen,ProfileScreen,PharmacyScreen,
    NotificationsScreen,SupportScreen, WebsiteScreen,TwitterScreen,FacebookScreen,
    ShareAppScreen,LogoutScreen,AppliedScreen
} from './Screens';
let userData = {
    fname:'',
    email:'',
    user_img:require('../../assets/default-u-icon.png')
};
setUserData = async()=>{
    await AsyncStorage.getItem('userData').then(val=>{
        console.log(val);
        userData = JSON.parse(val);
    });
}
setUserData();
import SplashScreen from '../Splash';
import LocumReg1Screen from '../LocumReg1';
import LocumReg2Screen from '../LocumReg2';
/**Employer Screens Starts */
import EmployerScreen from '../SignScreens/EmployerReg';
import NewLocumShiftScreen from '../Employer/NewLocumShift';
import NLSFormScreen from '../Employer/NLSForm';
import NewPermScreen from '../Employer/NewPermShift';
import NPSFormScreen from '../Employer/NPSForm';
import JobListE from '../Employer/JobList';
import LocumListScreen from '../Employer/LocumList';
import LocumDetailScreen from '../Employer/LocumDetails';
import EChatListScreen from '../Employer/EChatList';
import ChatScreen from '../Employer/ChatSingle';
import Reviews from '../Employer/Reviews';
import PayInvoice from '../Employer/PayInvoice';
/**Employer Screens ends */
/**Locum Screens Starts */
import JobListL from '../Locum/OpenJobs';
import JobDetailScreen from '../Locum/JobDetails';
import SuccessLocum from '../Locum/Success';
import ETimeSheet from '../Locum/ETimeSheet';
/**Locum Screens ends */
import Registration from '../Registration';
import Login from '../SignScreens/Login';

/*Static Screen */
import TnCScreen from '../Termscondition';
import PrivacyScreen from '../Privacy';
const drawerItemStyle = { 
    height: 50, 
    textAlign: 'left' 
};
const drawerLabelStyle = { 
    margin: 0, 
    fontSize: 14, 
    fontFamily: 'AvenirLTStd-Light',
    paddingHorizontal:10
};
    const Drawer = createDrawerNavigator({
        Home:{
            screen:DashboardScreen
        },
        Profile:{
            screen:ProfileScreen
        },
        Pharmacy:{
            screen:PharmacyScreen,
            /*navigationOptions: {
                title: 'Pharmacy',
                drawerLabel: ({ tintColor, focused }) => {
                    if(userData.user_type == 'employer'){
                        return 'Pharmacy';
                    }
                    return null;
                },
                drawerIcon: ({ tintColor, focused }) => {
                    if(userData.user_type == 'employer'){
                        return <Image source={require('../../assets/phar-d-icon.png')} style={{width:18,height:16}} />;
                    }
                    return null;
                }
            }*/
        },
        Applied:{
            screen:AppliedScreen,
            /*navigationOptions: {
                title: 'Applied Jobs',
                drawerLabel: ({ tintColor, focused }) => {
                    if(userData.user_type == 'locum'){
                        return 'Applied Jobs';
                    }
                    return null;
                },
                drawerIcon: ({ tintColor, focused }) => {
                    if(userData.user_type == 'locum'){
                        return <Image source={require('../../assets/applied-d-icon.png')} style={{width:18,height:16}} />;
                    }
                    return null;
                }
            }*/
        },
        Notifications:{
            screen:NotificationsScreen
        },
        Website:{
            screen:WebsiteScreen
        },
        Twitter:{
            screen:TwitterScreen
        },
        Facebook:{
            screen:FacebookScreen
        },
        ShareApp:{
            screen:ShareAppScreen
        },
        Support:{
            screen:SupportScreen
        },
        About:{
            screen:AboutScreen
        },
        Logout:{
            screen:LogoutScreen
        },
    },
        {
            initialRouteName: 'Home',
            overlayColor: 'rgba(0, 0, 0, 1)',
            drawerWidth: 250,
            contentComponent: props =>{
                return (<SafeAreaView>
                    <ScrollView style={{padding:0}}>
                        {/* <TouchableOpacity style={{ paddingLeft: 20,justifyContent:'flex-end',position:'absolute',right:-50 }} onPress={props.navigation.closeDrawer}>
                            <Icon name="bars" style={{ fontSize: 20, color: '#147dbf' }} />
                        </TouchableOpacity> */}
                        {/* <ImageBackground source={require('../../assets/defaul-p-bg.png')} style={{
                            height:180,
                            backgroundColor:'rgba(29, 123, 195, 0.8)',
                            justifyContent:'flex-end',
                            paddingBottom: 15,
                            paddingHorizontal:10
                        }}>
                            <View>
                                <Image source={{uri:userData.user_img}} style={{width:60,height:60,marginBottom:7,borderRadius:100}}/>
                                <Text style={{color:'#feffff',fontFamily:'AvenirLTStd-Light',marginBottom:5}}>{userData.fname} {userData.lname}</Text>
                                <Text style={{color:'#feffff',fontFamily:'AvenirLTStd-Light'}}>{userData.email}</Text>
                            </View>
                        </ImageBackground> */}
                        <DrawerItems 
                            {...props}
                            //itemStyle={drawerItemStyle}
                            //activeTintColor={'#1d7bc3'}
                            //inactiveTintColor={'#151515'}
                            activeBackgroundColor={'#FFFFFF'}
                            itemsContainerStyle={{ paddingHorizontal: 0 }}
                            //labelStyle={drawerLabelStyle}
                            iconContainerStyle={{ marginHorizontal: 0, marginLeft: 16 }}
                            
                        />
        
                    </ScrollView>
                </SafeAreaView>
                );
            }
                
    });
const Navigation = createStackNavigator({
    Splash: {
        screen: SplashScreen
    },
    Home: {
        screen: Drawer,
    },
    Registration: {
        screen: Registration,
    },
    LocumReg1:{
        screen:LocumReg1Screen
    },
    LocumReg2:{
        screen:LocumReg2Screen
    },
    /*Employer Navigations Starts */
    EmployerReg:{
        screen:EmployerScreen
    },
    NewLocumShift:{
        screen:NewLocumShiftScreen
    },
    NLSForm:{
        screen:NLSFormScreen
    },
    NewPermShift:{
        screen:NewPermScreen
    },
    NPSForm:{
        screen:NPSFormScreen
    },
    JobListE:{
        screen:JobListE
    },
    LocumList:{
        screen:LocumListScreen
    },
    LocumDetails:{
        screen:LocumDetailScreen
    },
    EChatList:{
        screen:EChatListScreen
    },
    ChatScreen:{
        screen:ChatScreen
    },
    Reviews:{
        screen:Reviews
    },
    PayInvoice:{
        screen:PayInvoice
    },
    /*Employer Navigations Ends */

    /*Locum Navigations Starts */
    OpenJobs:{
        screen:JobListL
    },
    JobDetails:{
        screen:JobDetailScreen
    },
    SuccessApply:{
        screen:SuccessLocum
    },
    ETimeSheet:{
        screen:ETimeSheet
    },
    /*Locum Navigations Ends */
    Login:{
        screen:Login
    },
    
    /**Static Screens */
    TnC:{
        screen:TnCScreen
    },
    Privacy:{
        screen:PrivacyScreen
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Splash',
    containerOptions: {
        style: {backgroundColor: '#147dbf',flex: 1}
    }
});
export default Navigation;