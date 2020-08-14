import React from 'react'
import { Container, Header, Content, Left, Body, Right, Title, Icon, Button, Text, Card, CardItem, ListItem, Thumbnail, List } from 'native-base'

export default function Guard_Profile(props) {
    let guard = props.route.params.guard

    return (
        <Container>
            <Header style={{ backgroundColor: "#43bfe6" }}>
                <Left>
                    <Button transparent onPress={() => props.navigation.openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Profile</Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <Card transparent>
                    <CardItem header style={{ justifyContent: 'center' }}>
                        <Thumbnail square large source={{ uri: guard.picURL }} />
                    </CardItem>
                    <List style = {{ marginTop:20 }}>
                        <ListItem >
                            <Left >
                                <Text style={{ alignSelf:'center' }}>NAME : </Text>
                            </Left>
                            <Body>
                                <Text>{guard.name}</Text>
                            </Body>
                            <Right />
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>AADHAAR : </Text>
                            </Left>
                            <Body>
                                <Text>{guard.aadhaar}</Text>
                            </Body>
                            <Right />
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>MOBILE : </Text>
                            </Left>
                            <Body>
                                <Text>{guard.mobile}</Text>
                            </Body>
                            <Right />
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>ADDRESS : </Text>
                            </Left>
                            <Body>
                                <Text>{guard.address}</Text>
                            </Body>
                            <Right />
                        </ListItem>
                    </List>
                </Card>
            </Content>
        </Container>
    )
} 