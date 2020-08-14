import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Root } from 'native-base';
import Font, { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Signup from './components/signup'
import Login from './components/login'
import Dashboard from './components/dashboard'
import Sidebar from './components/sidebar'
import Statistics from './components/stats'
import Prev_Visits from './components/prev_visits'
import Sel_Date from './components/dates'
import Guards from './components/guards';
import Add_Guard from './components/add_guard';
import Guard_Profile from './components/guard_profile';
import firebase from './database/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

export default function App() {

        const [user, setUser] = useState('Security');

        const [loaded] = useFonts({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                ...Ionicons.font,
        });


        firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                        setUser(user.displayName)
                }
                else
                        setUser('Security')
        })



        if (!loaded) {
                return <AppLoading />;
        }
        else {
                return (<Root>
                        <NavigationContainer>
                                <Drawer.Navigator drawerType="front" initialRouteName='Dashboard' drawerContent={(props) => <Sidebar {...props} User={user} />}>

                                        <Drawer.Screen name="Signup" component={Signup} />

                                        <Drawer.Screen name="Login" component={Login} />

                                        <Drawer.Screen name="Dashboard">
                                                {props => <Dashboard {...props} User={user} />}
                                        </Drawer.Screen>

                                        <Drawer.Screen name='Statistics' component={Statistics} />

                                        <Drawer.Screen name="Prev_visits" component={Prev_Visits} />

                                        <Drawer.Screen name="Select_Date" component={Sel_Date}/>

                                        <Drawer.Screen name="Guards" component={Guards} />

                                        <Drawer.Screen name="Add_Guard" component={Add_Guard} />

                                        <Drawer.Screen name="Guard Profile" component={Guard_Profile} />
                                </Drawer.Navigator>
                        </NavigationContainer>
                </Root>);
        }
}
