import React from 'react'
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content, Text, Card, CardItem, Item, Label, Input, Thumbnail} from 'native-base'
import { Formik } from 'formik'
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker';
import firebase from '../database/firebase'
import * as Progress from 'react-native-progress';

const db = firebase.firestore();



export default function Add_Guard(props) {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [progress, setProgess] = React.useState(0);
    const [showprogress, setShowprogress] = React.useState(false);
    const [dloadURL, setdloadURL] = React.useState('');

    let uploadToFirebase = (blob,uri) => {
            var storageRef = firebase.storage().ref();

            var task = storageRef.child('uploads/'+uri.substr(uri.lastIndexOf('/')+1)).put(blob, {
                contentType: 'image/jpeg'
            })

            task.on(firebase.storage.TaskEvent.STATE_CHANGED,
                function(snapshot) {
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
                  }, function(error) {
                        console.log(error);
                }, function() {
                  // Upload completed successfully, now we can get the download URL
                  task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    setdloadURL(downloadURL);
                    setProgess(0);
                    setShowprogress(false);
                    alert("Added Guard!!")
                    setSelectedImage(null);
                  });
                })

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
        else{
            setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
            
        }
    }

    let uploadImage= ()=>{
        uriToBlob(selectedImage.localUri).then((blob) => {
                uploadToFirebase(blob,selectedImage.localUri)
            })
    }


    const storeData = (values, actions) => {
        uploadImage()
        db.collection("guards").doc(values['aadhaar']).set({
            name: values['name'],
            mobile: parseInt(values['mobile']),
            aadhaar: parseInt(values['aadhaar']),
            address: values['address'],
            picURL:dloadURL,
        })
        console.log(values)
        console.log(dloadURL);
        actions.resetForm()
    }

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
                        <CardItem header style={{justifyContent:'center'}}>
                            <Thumbnail square large source={{uri: selectedImage.localUri}} />
                        </CardItem>
                    }
                    <CardItem>
                        <Body >
                            <Button bordered warning rounded style={{alignSelf:'center'}} onPress={openImagePickerAsync}><Icon active type='MaterialCommunityIcons' name='camera-plus'/><Text>Select Profile-Pic</Text></Button>
                            {showprogress && <Progress.Bar color={'#99e339'} style={{marginTop:20 ,alignSelf:'center'}} animated progress={progress} width={200} />} 
                        </Body>
                    </CardItem>
                </Card>
                <Formik initialValues={{ name: '', mobile: '', aadhaar: '', address: '' }}
                    onSubmit={(values, actions) => storeData(values, actions)}
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