import React,{Component} from 'react';
import {StyleSheet, View, Alert, Image} from 'react-native';
import {Header, Spinner, Container, Content, Card, CardItem, Body, Item, Label, Input, Text, Button, H3, Thumbnail} from 'native-base'
import firebase from '../database/firebase';
import { iconUri } from './config'


export default class Signup extends Component{
        constructor(){
                super();
                this.state={
                        displayName:"",
                        email:"",
                        password:"",
                        isLoading: false,
                }
        }
        
        updateInputVal(val,prop){
                const state = this.state;
                state[prop] = val;
                this.setState(state);
        }
        
        registerUser(){
        if(this.state.email==='' && this.state.password===''){
                Alert.alert('Enter details to SignUp!!');
        }else{
                this.setState({isLoading:true,})
                firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(
                (res)=>{
                        res.user.updateProfile({displayName: this.state.displayName})
                        console.log("User Registered Successfully!!");

                        this.setState({
                                isLoading: false,
                                displayName: '',
                                email:'',
                                password:'',
                        })
                                                
                        this.props.navigation.navigate('Login');
                        
                }
                ).catch(error => this.setState({ errorMessage: error.message }))
        }
        }
        
       render(){
        if(this.state.isLoading){
                return (
                        <View styles={styles.preloader}>
                                <Spinner color="red" />
                        </View>
                )
        }
        
       return(
        <Container>
                <Header style={{ backgroundColor:'#43bfe6' }}/>
                <Content padder>
                        <Card transparent>
                                <CardItem header style={{ justifyContent:'center' }}>
                                        <Thumbnail square source={{uri: iconUri}} style={{ height:100, width:100,
                                        resizeMode:'cover' }} />
                                </CardItem>
                                        
                                <CardItem>
                                        <Body>
                                                <Item floatingLabel style={{ marginTop:15, marginBottom:15 }}>
                                                        <Label>Name</Label>
                                                        <Input value={this.state.displayName}
                                                        onChangeText={(val) => this.updateInputVal(val, 'displayName')} />
                                                </Item>                                                    
                                                <Item floatingLabel style={{ marginTop:15, marginBottom:15 }}>
                                                        <Label>Email</Label>
                                                        <Input value={this.state.email}
                                                        onChangeText={(val) => this.updateInputVal(val, 'email')} />
                                                </Item>
                                                <Item floatingLabel style={{ marginTop:15, marginBottom:15 }}>
                                                        <Label>Password</Label>
                                                        <Input value={this.state.password} maxLength={15} secureTextEntry={true} 
                                                        onChangeText={(val) => this.updateInputVal(val, 'password')} />
                                                </Item>
                                        </Body>
                                </CardItem>
                                <CardItem style={{ justifyContent:'center'}}>
                                   <Button onPress={()=> this.registerUser() }>
                                       <Text>SignUp</Text> 
                                   </Button>     
                                </CardItem>
                                <CardItem footer style={{ justifyContent:'center' }}>
                                        <Text>Already Registered? </Text>
                                        <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('Login')}>
                                        Log in
                                        </Text> 
                                </CardItem>
                                
                        </Card>
                </Content>
        </Container>
       ); 
       } 
}

const styles = StyleSheet.create(
{
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  loginText:{
    color:'blue',
  }
}
)
