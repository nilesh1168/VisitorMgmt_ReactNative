import React, { useState } from 'react';
import { Dimensions, ToastAndroid, BackHandler } from 'react-native';
import { Container, Header, Content, Text, Left, Right, Drawer, Button, Icon, Body, Title } from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import firebase from '../database/firebase';
import Sidebar from './sidebar'
import SecurityDash from './securitydash';
import AdminDash from './admindash';


export default function Dashboard(props) {

      const showToast = () => {
            ToastAndroid.show("Please Log Out !!", ToastAndroid.LONG);
      };

      useFocusEffect(
            React.useCallback(() => {
                  const onBackPress = () => {
                        if (firebase.auth().currentUser != null) {
                              props.navigation.openDrawer();
                              showToast()
                              return true;
                        }
                        else
                              return false;
                  };

                  BackHandler.addEventListener('hardwareBackPress', onBackPress);

                  return () => { BackHandler.removeEventListener('hardwareBackPress', onBackPress); }
            }, [])
      );

      let content;

      if (props.User != 'Security')
            content = <AdminDash navigation={props.navigation} />
      else
            content = <SecurityDash navigation={props.navigation} />

      return (
            content
      );
}

