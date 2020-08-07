import React,{useState, useEffect} from 'react';
import { Container, Header, Body, Content, Text ,Left, Right, Thumbnail, Icon, Button, ListItem, Footer, FooterTab,CardItem, Card } from "native-base";
import { iconUri } from './config';
import { Alert } from "react-native";
import firebase from '../database/firebase';
import { CommonActions } from '@react-navigation/native';



export default function Sidebar(props) {
        //console.log(props);
        let user=props.User;

        const signOut = () => {
                firebase.auth().signOut().then(function() {
                        props.navigation.navigate("Dashboard");
                }).catch(function(error) {
                        Alert.alert(error); 
                });
                props.navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'Dashboard' },
                          ],
                        })
                      );
        }
      let content = <Card transparent>
                                <CardItem button onPress={() => props.navigation.navigate('Login')}>
                                <Left><Icon active style={{ color:"#185480" }} active type='AntDesign' name="login" /></Left>
                                <Text>Log In</Text>
                                <Body />
                                <Right>
                                <Icon active type='FontAwesome5' name='arrow-right' />
                                </Right>
                                </CardItem>

                                <CardItem button onPress={() => props.navigation.navigate('Dashboard')}>
                                <Left><Icon style={{ color:"#185480" }} active type='FontAwesome5' name="home" /></Left>
                                <Text>Dashboard</Text>
                                <Body />
                                <Right>
                                <Icon active type='FontAwesome5' name='arrow-right' />
                                </Right>
                                </CardItem>
                    </Card>
                    
      if(user!='Security'){
        content = <Card transparent>
                                <CardItem button onPress={() => props.navigation.navigate('Dashboard')}>
                                <Left><Icon style={{ color:"#185480" }} active type='FontAwesome5' name="home" /></Left>
                                <Text>Dashboard</Text>
                                <Body />
                                <Right>
                                <Icon active type='FontAwesome5' name='arrow-right' />
                                </Right>
                                </CardItem>
                                <CardItem button onPress={() => props.navigation.navigate('Statistics')}>
                                <Left><Icon style={{ color:"#185480" }} active type='AntDesign' name="areachart" /></Left>
                                <Text>Statistics</Text>
                                <Body />
                                <Right>
                                <Icon active type='FontAwesome5' name='arrow-right' />
                                </Right>
                                </CardItem>
                                <CardItem button onPress={() => props.navigation.navigate('Guards')}>
                                <Left><Icon style={{ color:"#185480" }} active type='FontAwesome5' name="user-shield" /></Left>
                                <Text>Guards</Text>
                                <Body />
                                <Right>
                                <Icon active type='FontAwesome5' name='arrow-right' />
                                </Right>
                                </CardItem>
                                <CardItem button onPress={() => props.navigation.navigate('Prev_visits')}>
                                <Left><Icon style={{ color:"#185480" }} active type='MaterialIcons' name="history" /></Left>
                                <Text>Visits</Text>
                                <Body />
                                <Right>
                                <Icon active type='FontAwesome5' name='arrow-right' />
                                </Right>
                                </CardItem>
                                <CardItem button onPress={()=> signOut() }>
                                <Left><Icon style={{ color:"#185480" }} active type='AntDesign' name="logout" /></Left>
                                <Text>Logout</Text>
                                <Body />
                                <Right>
                                <Icon active type='FontAwesome5' name='arrow-right' />
                                </Right>
                                </CardItem>   
                        </Card>
      }              
                                                      
      return(  
      <Container>
        <Header style={{ height:'auto', backgroundColor: "#43bfe6" }}>
                <Left />
                <Body style={{ marginLeft:50, paddingTop:20, paddingBottom:20  }}>
                        <Thumbnail square source={{uri: iconUri}} style={{ height:100, width:100,
                                                                resizeMode:'cover' }} />
                </Body>
                <Right />
        </Header>
        <Content padder>
                {content}   
        </Content>
        <Footer >
                <FooterTab style={{ justifyContent:'center', paddingTop:15, backgroundColor: "#43bfe6"}}>
                       <Text style={{ color:"#185480" }}><Icon style={{ fontSize: 18, color:'white' }} active type='AntDesign' name='copyright' />  Visits, 2020</Text>
                </FooterTab>
        </Footer>
      </Container>
      );
}
