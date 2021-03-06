/**
 * Pharmasy SOS App
 * "react-native-push-notification": "^3.1.3",
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
import DrawerBody from './DrawerBody';
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
import AddPharmacy from '../Employer/AddPharmacy';
/**Employer Screens ends */
/**Locum Screens Starts */
import JobListL from '../Locum/OpenJobs';
import JobDetailScreen from '../Locum/JobDetails';
import SuccessLocum from '../Locum/Success';
import ETimeSheet from '../Locum/ETimeSheet';
import LocumAvail from '../Locum/LocumAvail';
import TimeSheetList from '../Locum/MyeTimeSheet';
/**Locum Screens ends */
import Registration from '../Registration';
import Login from '../SignScreens/Login';
import ForgotPasswordScreen from '../SignScreens/Forgot';
/*Static Screen */
import TnCScreen from '../Termscondition';
import IntroScreenEmployer from '../IntroImagesEmployer';
import IntroScreenLocum from '../IntroImagesLocum';
import PrivacyScreen from '../Privacy';
import ContactSupportScreen from '../ContactSupport';
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
    MyeTimeSheet:{
        screen:TimeSheetList
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
    ContactSupport:{
        screen:ContactSupportScreen
    },
    Logout:{
        screen:LogoutScreen
    },
},
    {
        initialRouteName: 'Home',
        overlayColor: 'rgba(0, 0, 0, 1)',
        drawerWidth: 250,
        contentComponent: props =>(
            <DrawerBody props={props} />
        )
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
    AddPharmacy:{
        screen:AddPharmacy
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
    LocumAvail:{
        screen:LocumAvail
    },
    /*Locum Navigations Ends */
    Login:{
        screen:Login
    },
    ForgotPassword:{
        screen:ForgotPasswordScreen
    },
    /**Static Screens */
    TnC:{
        screen:TnCScreen
    },
    Privacy:{
        screen:PrivacyScreen
    },
    IntroEmployer:{
        screen:IntroScreenEmployer
    },
    IntroLocum:{
        screen:IntroScreenLocum
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Splash',
    containerOptions: {
        style: {backgroundColor: '#147dbf',flex: 1}
    }
});
export default Navigation;