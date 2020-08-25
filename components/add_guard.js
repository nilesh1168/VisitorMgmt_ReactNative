import React, { useEffect, useCallback } from 'react'
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content, Text, Card, CardItem, Item, Label, Input, Thumbnail, Spinner, View } from 'native-base'
import { Formik } from 'formik'
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker';
import firebase from '../database/firebase'
import * as Progress from 'react-native-progress';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler, ActivityIndicator, StyleSheet } from 'react-native';

const db = firebase.firestore();


export default function Add_Guard(props) {
    const [ready,setReady] = React.useState(false);
    const [isguard, setIsguard] = React.useState(props.route.params.isguard)
    const [guard, setGuard] = React.useState(isguard ? props.route.params.guard : null)
    const [selectedImage, setSelectedImage] = React.useState(props.route.params.isguard ? { localUri: props.route.params.guard.picURL, remoteUri: null } : null);
    const [progress, setProgess] = React.useState(0);
    const [showprogress, setShowprogress] = React.useState(false);

    useEffect(() => {
        if (props.route.params.isguard) {
            setIsguard(true)
            setGuard(props.route.params.guard)
            setSelectedImage({ localUri: props.route.params.guard.picURL, remoteUri: null })
        }
        else {
            setIsguard(false)
            setSelectedImage(null)
        }
        setReady(true)
    }, [props.route.params])

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setReady(false)
                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => { BackHandler.removeEventListener('hardwareBackPress', onBackPress); }
        }, [])
    );

    let initialValues = {
        name: '',
        mobile: '',
        aadhaar: '',
        address: '',
    }
    if (isguard) {
        initialValues = {
            name: guard.name,
            mobile: guard.mobile.toString(),
            aadhaar: guard.aadhaar.toString(),
            address: guard.address,
        }
    }

    let uploadToFirebase = (blob, uri) => {
        return new Promise((resolve, reject) => {
            var storageRef = firebase.storage().ref();

            var uploadTask = storageRef.child('uploads/' + uri.substr(uri.lastIndexOf('/') + 1)).put(blob, {
                contentType: 'image/jpeg'
            })
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgess(progress);
                    setShowprogress(true);
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function (error) {
                    console.log(error);
                }, function () {
                    blob.close();
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        setProgess(0);
                        setShowprogress(false);
                        alert("Added Guard!!")
                        setSelectedImage(null);
                        resolve(downloadURL);
                    });
                });
        });
    }

    let uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                // return the blob
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                // something went wrong
                reject(new Error('uriToBlob failed'));
            };
            // this helps us get a blob
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access Gallery is Required!!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled == true) {
            return;
        }

        if (Platform.OS === 'web') {
            let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
            setSelectedImage({ localUri: pickerResult.uri, remoteUri });
        }
        else {
            setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });

        }
    }

    let uploadImage = (values, actions) => {
        uriToBlob(selectedImage.localUri).then((blob) => {
            uploadToFirebase(blob, selectedImage.localUri).then((dloadURL) => {
                db.collection("guards").doc(values['aadhaar']).set({
                    name: values['name'],
                    mobile: parseInt(values['mobile']),
                    aadhaar: parseInt(values['aadhaar']),
                    address: values['address'],
                    picURL: dloadURL,
                })
                console.log(values)
                actions.resetForm()
                props.navigation.navigate('Guards')
            })
        })
    }

    if(!ready)
    return(
        <View><Spinner></Spinner></View>
    )

    return (
        <Container>
            <Header style={{ backgroundColor: "#43bfe6" }}>
                <Left>
                    <Button transparent onPress={() => props.navigation.openDrawer()}><Icon name="menu" /></Button>
                </Left>
                <Body>
                    <Title>Add Guard</Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <Card transparent>
                    {selectedImage &&
                        <CardItem header style={{ justifyContent: 'center' }}>
                            <Thumbnail square large source={{ uri: selectedImage.localUri }} />
                        </CardItem>
                    }
                    <CardItem>
                        <Body >
                            <Button bordered warning rounded style={{ alignSelf: 'center' }} onPress={openImagePickerAsync}><Icon active type='MaterialCommunityIcons' name='camera-plus' /><Text>Select Profile-Pic</Text></Button>
                            {showprogress && <Progress.Bar color={'#99e339'} style={{ marginTop: 20, alignSelf: 'center' }} animated progress={progress} width={200} />}
                        </Body>
                    </CardItem>
                </Card>
                <Formik initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={(values, actions) => uploadImage(values, actions)}
                    validationSchema={
                        yup.object().shape({
                            name: yup.string().required('Provide valid name!!'),
                            mobile: yup.number().integer().positive().required('Mobile number required!!'),
                            aadhaar: yup.number().positive().integer().required('Please, enter Aadhaar number!!'),
                            address: yup.string().required('Please, provide address!!').max(50, '50 characters only!!'),
                        })
                    }>
                    {
                        ({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
                            <Card transparent>
                                <CardItem>
                                    <Body>
                                        <Item floatingLabel style={{ marginTop: 15, marginBottom: 15, }}>
                                            <Label>Name</Label>
                                            <Input onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
                                        </Item>

                                        {touched.name && errors.name && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.name}</Text>}

                                        <Item floatingLabel style={{ marginTop: 15, marginBottom: 15, }}>
                                            <Label>Mobile</Label>
                                            <Input maxLength={10} keyboardType={'numeric'} onChangeText={handleChange('mobile')} onBlur={handleBlur('mobile')} value={values.mobile} />
                                        </Item>

                                        {touched.mobile && errors.mobile && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.mobile}</Text>}

                                        <Item floatingLabel style={{ marginTop: 15, marginBottom: 15, }}>
                                            <Label>Aadhaar</Label>
                                            <Input keyboardType={'numeric'} maxLength={12} onChangeText={handleChange('aadhaar')} onBlur={handleBlur('aadhaar')} value={values.aadhaar} />
                                        </Item>

                                        {touched.aadhaar && errors.aadhaar && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.aadhaar}</Text>}

                                        <Item floatingLabel style={{ marginTop: 15, marginBottom: 15, }}>
                                            <Label>Address</Label>
                                            <Input onChangeText={handleChange('address')} onBlur={handleBlur('address')} value={values.address} />
                                        </Item>

                                        {touched.address && errors.address && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.address}</Text>}
                                    </Body>
                                </CardItem>
                                <CardItem footer style={{ justifyContent: 'center' }}>
                                    <Button onPress={handleSubmit}><Text>Upload & Submit</Text></Button>
                                </CardItem>
                            </Card>
                        )
                    }
                </Formik>
            </Content>
        </Container>
    );
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
});