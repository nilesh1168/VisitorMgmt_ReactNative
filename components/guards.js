import React, { useState } from 'react'
import { Container, Header, Left, Icon, Body, Title, Right, Button, Content, Card, CardItem, Text, Thumbnail, List, ListItem } from 'native-base'
import firebase from '../database/firebase'
import { RefreshControl } from 'react-native';

const db = firebase.firestore();





export default function Guards(props) {
    const [guards, setGuards] = useState([])
    db.collection("guards").get().then(function (querySnapshot) {
        let name = []
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            name.push(doc.data())
        });
        setGuards(name)
    });

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
                    <List>
                        {guards.map(guard => (
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: guard.picURL }} />
                                </Left>
                                <Body>
                                    <Text>{guard.name}</Text>
                                    <Text note numberOfLines={1}>Guard</Text>
                                </Body>
                                <Right>
                                    <Button transparent onPress={()=> props.navigation.navigate('Guard Profile',{ guard : guard })}>
                                        <Text>View</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                    <CardItem style={{ justifyContent:'flex-end'}}>
                        <Button bordered rounded onPress={() => props.navigation.navigate('Add_Guard')}><Text>Add Guard</Text></Button>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}
