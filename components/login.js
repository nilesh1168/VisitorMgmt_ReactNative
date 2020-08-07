import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Spinner, Container, Header, Content, Card, CardItem, Body, Form, Text, Item, Label, Input, Button, H3, View, Thumbnail, Icon, Picker } from 'native-base';
import firebase from '../database/firebase';
import { iconUri } from './config'

export default class Login extends Component {
        constructor() {
                super();
                this.state = {
                        email: '',
                        password: '',
                        isLoading: false,
                }
        }

        updateInputVal(val, prop) {
                const state = this.state;
                state[prop] = val;
                this.setState(state);
        }

        userLogin() {
                if (this.state.email === '' && this.state.password === '') {
                        Alert.alert('Enter details to SignIn!!')
                } else {
                        this.setState({ isLoading: true });
                        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
                                (res) => {
                                        console.log(res);
                                        console.log('User Logged Successfully!!');
                                        this.setState({
                                                isLoading: false,
                                                email: '',
                                                password: '',
                                        })
                                        this.props.navigation.navigate('Statistics')
                                }
                        ).catch(error => this.setState({ errorMessage: error.message }))
                }
        }

        render() {
                if (this.state.isLoading) {
                        return (
                                <View style={styles.preloader}>
                                        <Spinner color="red" />
                                </View>
                        )
                }
                return (
                        <Container>
                                <Header style={{ backgroundColor: '#43bfe6' }} />
                                <Content padder contentContainerStyle={styles.container} >
                                        <Card transparent>
                                                <CardItem header style={{ justifyContent: 'center' }}>
                                                        <Thumbnail square source={{ uri: iconUri }} style={{
                                                                height: 100, width: 100,
                                                                resizeMode: 'cover'
                                                        }} />
                                                </CardItem>
                                                <CardItem>
                                                        <Body>
                                                                <Item floatingLabel style={{ marginTop: 15, marginBottom: 15, }}>
                                                                        <Label>Email</Label>
                                                                        <Input value={this.state.email}
                                                                                onChangeText={(val) => this.updateInputVal(val, 'email')} />
                                                                </Item>
                                                                <Item floatingLabel style={{ marginTop: 15, marginBottom: 15 }}>
                                                                        <Label>Password</Label>
                                                                        <Input value={this.state.password} maxLength={15} secureTextEntry={true}
                                                                                onChangeText={(val) => this.updateInputVal(val, 'password')} />
                                                                </Item>
                                                        </Body>
                                                </CardItem>
                                                <CardItem style={{ justifyContent: 'center' }}>
                                                        <Button onPress={() => this.userLogin()}>
                                                                <Text>Log In</Text>
                                                        </Button>
                                                </CardItem>
                                                <CardItem footer style={{ justifyContent: 'center' }}>
                                                        <Text>Don't have account? </Text>
                                                        <Text onPress={() => this.props.navigation.navigate('Signup')}
                                                                style={{ color: 'blue' }}>
                                                                Sign up
                                                                </Text>
                                                </CardItem>
                                        </Card>
                                </Content>
                        </Container>
                );
        }
}

const styles = StyleSheet.create({
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
        container: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,

                justifyContent: 'center',
        }
});
