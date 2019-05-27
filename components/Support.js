import React,{Component} from 'react';
import {View,ImageBackground, Image,Text,StyleSheet,TextInput,Dimensions,ScrollView, TouchableOpacity,SafeAreaView } from 'react-native';
import MainStyles from './Styles';
import Header from './Navigation/Header';
const { height, width } = Dimensions.get('window');
class Support  extends Component{
    constructor(props) {
        super(props);

        this.state={loading:false,showingQA:'q1'}
    }
    componentDidMount(){
    }
    render(){

        const RemoveHiehgt = height - 50;
        return (

            <SafeAreaView style={{flex:1,backgroundColor:'#f0f0f0'}}>
              <Header pageName="Support" />
                <ScrollView style={{height:RemoveHiehgt,flex:1}}>
                <View style={{paddingVertical:2,backgroundColor:'#FFFFFF',marginTop:1,paddingHorizontal:10}}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={{fontFamily:'AvenirLTStd-Medium',fontSize:17,color:'#151515',marginTop:2,flexWrap:'wrap'}}>How can we help you ?</Text>
                  </View>
                </View>


                
                <View style={{paddingHorizontal:10, marginTop:8}}>
                  <View style={styles.qnaWrapper}>
                      <TouchableOpacity style={[(this.state.showingQA == 'q1')?{backgroundColor:'#147dbf'}:'',styles.qnaHeadingWrapper]} onPress={()=>{
                          this.setState({showingQA:'q1'});
                        }}
                      >
                        <Text style={[styles.qnaHeading,(this.state.showingQA == 'q1')?{color:'#FFFFFF'}:{color:'#147dbf'}]}>Question ?</Text>
                        <Image source={require('../assets/s-d-arrow.png')} style={{width:18,height:9}}/>
                      </TouchableOpacity>
                      {
                        this.state.showingQA == 'q1' && 
                        <View style={{paddingVertical:10,paddingHorizontal:10}}>
                          <Text style={{fontFamily:'AvenirLTStd-Medium',fontSize:13,color:'#151515'}}>Lorem Nothing Text</Text>
                        </View>
                      }
                  </View>
                  {/* Q1 */}
                  <View style={styles.qnaWrapper}>
                      <TouchableOpacity style={[(this.state.showingQA == 'q2')?{backgroundColor:'#147dbf'}:'',styles.qnaHeadingWrapper]} onPress={()=>{
                          this.setState({showingQA:'q2'});
                        }}
                      >
                        <Text style={[styles.qnaHeading,(this.state.showingQA == 'q2')?{color:'#FFFFFF'}:{color:'#147dbf'}]}>Question ?</Text>
                        <Image source={require('../assets/s-d-arrow.png')} style={{width:18,height:9}}/>
                      </TouchableOpacity>
                      {
                        this.state.showingQA == 'q2' && 
                        <View style={{paddingVertical:10,paddingHorizontal:10}}>
                          <Text style={{fontFamily:'AvenirLTStd-Medium',fontSize:13,color:'#151515'}}>Lorem Nothing Text</Text>
                        </View>
                      }
                  </View>
                   {/* Q2 */}


                 <View style={styles.qnaWrapper}>
                      <TouchableOpacity style={[(this.state.showingQA == 'q3')?{backgroundColor:'#147dbf'}:'',styles.qnaHeadingWrapper]} onPress={()=>{
                          this.setState({showingQA:'q3'});
                        }}
                      >
                        <Text style={[styles.qnaHeading,(this.state.showingQA == 'q3')?{color:'#FFFFFF'}:{color:'#147dbf'}]}>Question ?</Text>
                        <Image source={require('../assets/s-d-arrow.png')} style={{width:18,height:9}}/>
                      </TouchableOpacity>
                      {
                        this.state.showingQA == 'q3' && 
                        <View style={{paddingVertical:10,paddingHorizontal:10}}>
                          <Text style={{fontFamily:'AvenirLTStd-Medium',fontSize:13,color:'#151515'}}>Lorem Nothing Text</Text>
                        </View>
                      }
                  </View>
                 {/* Q3 */}

                 <View style={styles.qnaWrapper}>
                      <TouchableOpacity style={[(this.state.showingQA == 'q4')?{backgroundColor:'#147dbf'}:'',styles.qnaHeadingWrapper]} onPress={()=>{
                          this.setState({showingQA:'q4'});
                        }}
                      >
                        <Text style={[styles.qnaHeading,(this.state.showingQA == 'q4')?{color:'#FFFFFF'}:{color:'#147dbf'}]}>Question ?</Text>
                        <Image source={require('../assets/s-d-arrow.png')} style={{width:18,height:9}}/>
                      </TouchableOpacity>
                      {
                        this.state.showingQA == 'q4' && 
                        <View style={{paddingVertical:10,paddingHorizontal:10}}>
                          <Text style={{fontFamily:'AvenirLTStd-Medium',fontSize:13,color:'#151515'}}>Lorem Nothing Text</Text>
                        </View>
                      }
                  </View>
                  {/* Q4 */}

                  <View style={styles.qnaWrapper}>
                      <TouchableOpacity style={[(this.state.showingQA == 'q5')?{backgroundColor:'#147dbf'}:'',styles.qnaHeadingWrapper]} onPress={()=>{
                          this.setState({showingQA:'q5'});
                        }}
                      >
                        <Text style={[styles.qnaHeading,(this.state.showingQA == 'q5')?{color:'#FFFFFF'}:{color:'#147dbf'}]}>Question ?</Text>
                        <Image source={require('../assets/s-d-arrow.png')} style={{width:18,height:9}}/>
                      </TouchableOpacity>
                      {
                        this.state.showingQA == 'q5' && 
                        <View style={{paddingVertical:10,paddingHorizontal:10}}>
                          <Text style={{fontFamily:'AvenirLTStd-Medium',fontSize:13,color:'#151515'}}>Lorem Nothing Text</Text>
                        </View>
                      }
                  </View>
                  {/*Q5*/}

                  <View style={styles.qnaWrapper}>
                      <TouchableOpacity style={[(this.state.showingQA == 'q6')?{backgroundColor:'#147dbf'}:'',styles.qnaHeadingWrapper]} onPress={()=>{
                          this.setState({showingQA:'q6'});
                        }}
                      >
                        <Text style={[styles.qnaHeading,(this.state.showingQA == 'q6')?{color:'#FFFFFF'}:{color:'#147dbf'}]}>Question ?</Text>
                        <Image source={require('../assets/s-d-arrow.png')} style={{width:18,height:9}}/>
                      </TouchableOpacity>
                      {
                        this.state.showingQA == 'q6' && 
                        <View style={{paddingVertical:10,paddingHorizontal:10}}>
                          <Text style={{fontFamily:'AvenirLTStd-Medium',fontSize:13,color:'#151515'}}>Lorem Nothing Text</Text>
                        </View>
                      }
                  </View>
                  {/*Q6*/}

                  <View style={styles.qnaWrapper}>
                      <TouchableOpacity style={[(this.state.showingQA == 'q7')?{backgroundColor:'#147dbf'}:'',styles.qnaHeadingWrapper]} onPress={()=>{
                          this.setState({showingQA:'q7'});
                        }}
                      >
                        <Text style={[styles.qnaHeading,(this.state.showingQA == 'q7')?{color:'#FFFFFF'}:{color:'#147dbf'}]}>Question ?</Text>
                        <Image source={require('../assets/s-d-arrow.png')} style={{width:18,height:9}}/>
                      </TouchableOpacity>
                      {
                        this.state.showingQA == 'q7' && 
                        <View style={{paddingVertical:10,paddingHorizontal:10}}>
                          <Text style={{fontFamily:'AvenirLTStd-Medium',fontSize:13,color:'#151515'}}>Lorem Nothing Text</Text>
                        </View>
                      }
                  </View>
                </View>
                
              </ScrollView>

        </SafeAreaView>
       );
    }
}
const styles = StyleSheet.create({
    qnaWrapper:{
      flex: 1,
      marginBottom:5,
      backgroundColor: '#FFFFFF',
      borderColor:'#1d7bc3',
      borderWidth:1,
      borderRadius:4
    },
    qnaHeadingWrapper:{
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    qnaHeading:{
      fontFamily:'AvenirLTStd-Medium',
      fontSize:18,
      flexWrap:'wrap',
      paddingVertical:10
    }
});
export default Support;