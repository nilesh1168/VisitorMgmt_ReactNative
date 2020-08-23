import React, { useState, useEffect } from 'react'
import { Container, Header, Left, Icon, Body, Title, Right, Button, Content, Card, CardItem, Text, Thumbnail, List, ListItem, View } from 'native-base'
import firebase from '../database/firebase'
import { Row, Col } from 'react-native-responsive-grid-system';

const db = firebase.firestore();


export default function Guards(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        db.collection("guards").onSnapshot(function (querySnapshot) {
            let data = []
            querySnapshot.forEach(function (doc) {
                data.push(doc.data())
                // doc.data() is never undefined for query doc snapshots
            });
            setData(data);
        })
    }, [])
    return (
        <Container>
            <Header style={{ backgroundColor: "#43bfe6" }}>
                <Left>
                    <Button transparent onPress={() => props.navigation.openDrawer()}><Icon name="menu" /></Button>
                </Left>
                <Body>
                    <Title> Guards </Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <Card>
                    {
                        data.map((guard) => (
                            <List>
                                <ListItem key={guard.aadhaar} thumbnail>
                                    <Left>
                                        <Thumbnail square source={{ uri: guard.picURL }} />
                                    </Left>
                                    <Body>
                                        <Text>{guard.name}</Text>
                                        <Text note numberOfLines={1}>Guard</Text>
                                    </Body>
                                    <Right>
                                        <Row>
                                            <Col xs sm md >
                                                <Button transparent bordered onPress={() => props.navigation.navigate('Guard Profile', { guard: guard })}>
                                                    <Text>View</Text>
                                                </Button>
                                            </Col>
                                            <Col xs sm md >
                                                <Button transparent bordered onPress={() => props.navigation.navigate('Add_Guard', {guard : guard, isguard: true })} style={{ marginLeft: 10 }}>
                                                    <Text>EDIT</Text>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Right>
                                </ListItem>
                            </List>
                        ))
                    }
                    <CardItem style={{ justifyContent: 'flex-end' }}>
                        <Button bordered rounded onPress={() => props.navigation.navigate('Add_Guard',{isguard:false})}><Text>Add Guard</Text></Button>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}



