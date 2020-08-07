import React,{Component} from 'react';
import {TextInput, View } from 'react-native';
import { Container, Header, Left, Right, Body, Title, Icon, Content, Text, Card, Button, CardItem, Tab, Tabs, Item, Input, Label, Picker } from 'native-base';
import { Formik } from 'formik';
import * as yup from 'yup'
import firebase from '../database/firebase'
const db = firebase.firestore()

class Visitor {
    constructor (name, address, contact, vehicle_no, wing, flat_no, purpose, from = 'N/A') {
        this.name = name;
        this.address = address;
        this.contact = contact;
        this.vehicle_no = vehicle_no;
        this.wing = wing;
        this.flat_no = flat_no;
        this.purpose = purpose;
        this.from = from;
    }
    toString() {
        return this.name + ', ' + this.address + ', ' + this.contact + ', ' + this.vehicle_no + ', ' + this.wing + ', ' + this.flat_no + ', ' + this.purpose + ', ' + this.from;
    }
}


const visitorConverter = {
      toFirestore: function(visitor) {
          return {
              name: visitor.name,
              address: visitor.address,
              contact: parseInt(visitor.contact),
              vehicle_no: visitor.vehicle_no,
              wing: visitor.wing,
              flat_no: parseInt(visitor.flat_no),
              purpose: visitor.purpose,
              from: visitor.from,
              }
      },
      fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          return new Visitor(data.name, data.address, data.contact, data.vehicle_no, data.wing, data.flat_no, data.purpose, data.from)
      }
  }



export default class SecurityDash extends Component{
        
        constructor(props) {
                super(props);
                this.state = {
                        purpose: '',
                }
        }

        storeData = (values,actions)=>{
                if(Object.keys(values).length == 8){
                let success = db.collection('visitors').doc(values['vehicle_no'])
                .withConverter(visitorConverter)
                .set(new Visitor(values['name'], values['address'], values['contact'], values['vehicle_no'], values['wing'], values['flat_no'], values['purpose'], values['from']))
                if(type){
                        alert('Added');
                        this.setState({
                                purpose:''
                        })
                        actions.resetForm()
                }
                }
                else{
                        let success = db.collection('packages').add({
                                name:values['name'],
                                contact:parseInt(values['contact']),
                                from:values['from'],
                                to:values['to'],
                        })        
                        if(success){
                                alert('added')
                                actions.resetForm()
                        }
                }
                
                        
        }    
            
        visitor = <Content padder>

                   <Formik initialValues={{ name: '',address:'', contact: '',vehicle_no:'',wing:'',flat_no:'',purpose:'', from:'N/A'  }} 
                   onSubmit={(values,actions) => this.storeData(values,actions)}
                   validationSchema = {
                        yup.object().shape({
                                name : yup.string().required('Please, provide your name!!'),
                                address : yup.string().required('Please, provide address!!').max(50, '50 characters only!!'),
                                contact : yup.number().required('Please, provide mobile number!!').positive().integer(),
                                vehicle_no : yup.string().required('Please, provide vehicle number!!'),
                                wing : yup.string().min(1).required('Please, provide wing/building number!!'),
                                flat_no : yup.number().required('Please, provide flat number!!'),
                                purpose : yup.string().required('Please, provide purpose for your visit!!'),
                                from : yup.string()
                        })
                   } 
                   >
                        {({touched, errors, setFieldValue, handleChange, handleBlur, handleSubmit, values, actions }) => (
                                <Card transparent >
                                        <CardItem>
                                        <Body>
                                        <Item floatingLabel style={{ marginTop:15, marginBottom:15, }}>
                                          <Label>Name</Label>
                                          <Input onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} /> 
                                        </Item>
                                        
                                        {touched.name && errors.name && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.name}</
                                        Text>}        
                                        
                                        <Item floatingLabel style={{ marginTop:15, marginBottom:15, }}>
                                          <Label>Address</Label>
                                          <Input onChangeText={handleChange('address')} onBlur={handleBlur('address')} value={values.address} /> 
                                        </Item>
                                        
                                        {touched.address && errors.address && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.address}</
                                        Text>}
                                        
                                        <Item floatingLabel style={{ marginTop:15, marginBottom:15, }}>
                                          <Label>Contact</Label>
                                          <Input maxLength={10} keyboardType={'numeric'} onChangeText={handleChange('contact')} 
                                          onBlur={handleBlur('contact')} value={values.contact} /> 
                                        </Item>                                                                                
                                        
                                        {touched.contact && errors.contact && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.contact}</
                                        Text>}
                                        
                                        <Item floatingLabel style={{ marginTop:15, marginBottom:15, }}>
                                          <Label>Vehicle No</Label>
                                          <Input onChangeText={handleChange('vehicle_no')} onBlur={handleBlur('vehicle_no')} 
                                          value={values.vehicle_no} /> 
                                        </Item>
                                        
                                        {touched.vehicle_no && errors.vehicle_no && <Text style={{ fontSize: 12, color: '#FF0D10' }}
                                        >{errors.vehicle_no}</Text>}
                                        
                                        <Item autoCapitalize={ 'characters' } floatingLabel style={{ marginTop:15, marginBottom:15, }}>
                                          <Label>Wing/Building</Label>
                                          <Input onChangeText={handleChange('wing')} onBlur={handleBlur('wing')} value={values.wing} /> 
                                        </Item>
                                        
                                        {touched.wing && errors.wing && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.wing}</
                                        Text>}
                                                                                                                        
                                        <Item floatingLabel style={{ marginTop:15, marginBottom:15, }}>
                                          <Label>Flat No</Label>
                                          <Input keyboardType={'numeric'} onChangeText={handleChange('flat_no')} onBlur={handleBlur('flat_no')} 
                                          value={values.flat_no} /> 
                                        </Item>
                                        
                                        {touched.flat_no && errors.flat_no && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.flat_no}</
                                        Text>}
                                                                                
                                        <Item picker style={{ marginTop:15, marginBottom:15, }}>
                                                <Picker ref={ (c) => this._picker = c } note  mode="dropdown" style={{ width: undefined }} 
                                                selectedValue={this.state.purpose}                                                
                                                placeholderStyle={{ color: "#bfc6ea" }} placeholderIconColor="#007aff" onValueChange={(itemValue, 
                                                itemIndex) => { setFieldValue('purpose', itemValue)
                                                this.setState({purpose: itemValue})} }>
                                                        <Picker.Item label="--Purpose--" value="--Purpose--" />
                                                        <Picker.Item label="Visit" value="Visit" />
                                                        <Picker.Item label="Delivery" value="Delivery" />
                                                </Picker>
                                        </Item>
                                        
                                        {touched.purpose && errors.purpose && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.purpose}</
                                        Text>}
                                        
                                        
                                        { values.purpose === "Delivery" && 
                                        ( <Item floatingLabel style={{ marginTop:15, marginBottom:15, }}>
                                                <Label>From</Label>
                                                <Input onChangeText={handleChange('from')} onBlur={handleBlur('from')}
                                                value={values.from}  />
                                          </Item>
                                          
                                        ) 
                                        }
                                        
                                        {touched.from && errors.from && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.from}</Text>}
                                         
                                        </Body>
                                        </CardItem> 
                                        <CardItem footer style={{ justifyContent:'center' }}><Button onPress={handleSubmit} ><Text>Submit</Text></
                                        Button></CardItem>
                                </Card>
                        )}
                </Formik>
        </Content>
        
        
        
        delivery =  <Content padder>
                <Formik initialValues={{name:'',contact:'',from:'',to:''}} 
                        onSubmit={ (values,actions) => this.storeData(values,actions) }
                        validationSchema = {
                                yup.object().shape({
                                        name : yup.string().required("Please enter name!!"),
                                        contact : yup.number().positive().integer().required('Please provide contact number'),
                                        from : yup.string().required('Required!!'),
                                        to : yup.string().required('Required!!'),
                                })
                        }
                >
                {({handleChange, handleBlur, handleSubmit, values, touched, errors})=>(
                        <Card transparent>
                                <CardItem>
                                        <Body>
                                                <Item floatingLabel style={{ marginTop:15, marginBottom:15, }}>
                                                        <Label>Name</Label>
                                                        <Input onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name}/
                                                        >
                                                </Item>
                                                
                                                {touched.name && errors.name && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.name}</
                                                Text> }
                                                
                                                <Item floatingLabel style={{ marginTop:15, marginBottom:15, }} >
                                                        <Label>Contact</Label>
                                                        <Input keyboardType={'numeric'} maxLength={10} onChangeText={handleChange('contact')} 
                                                        onBlur={handleBlur('contact')} 
                                                        value={values.contact}/>
                                                </Item>
                                                
                                                {touched.contact && errors.contact && <Text style={{ fontSize: 12, color: '#FF0D10' }}
                                                >{errors.contact}</Text>}
                                                
                                                <Item floatingLabel style={{ marginTop:15, marginBottom:15, }} >
                                                        <Label>From</Label>
                                                        <Input onChangeText={handleChange('from')} onBlur={handleBlur('from')} value={values.from} 
                                                        />
                                                </Item>
                                                
                                                {touched.from && errors.contact && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.from}</
                                                Text>}
                                                
                                                <Item floatingLabel style={{ marginTop:15, marginBottom:15, }} >
                                                        <Label>To</Label>
                                                        <Input onChangeText={handleChange('to')} onBlur={handleBlur('to')} value={values.to} />
                                                </Item>
                                                
                                                {touched.to && errors.to && <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.to}</Text>}
                                                
                                        </Body>
                                </CardItem>
                                <CardItem footer style={{ justifyContent:'center' }}>
                                        <Button onPress={handleSubmit}><Text>Submit</Text></Button>
                                </CardItem>
                        </Card>                        
                )       
                }
                </Formik>
        </Content>
        
        
        
  render() {
  
    return (
    <Container>
        <Header hasTabs style={{backgroundColor: "#43bfe6"}} >
                <Left>
                        <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
                        <Icon name='menu' />
                        </Button>
                </Left>
                <Body>
                        <Title>Visitor</Title>
                </Body>
                <Right/>
        </Header>
        <Tabs >
          <Tab heading="Visit">
            {this.visitor}
          </Tab>
          <Tab heading="Package">
            {this.delivery}
          </Tab>
        </Tabs>
    </Container>
    );
  }
}
