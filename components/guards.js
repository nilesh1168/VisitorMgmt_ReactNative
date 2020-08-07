import React from 'react'
import { Container, Header, Left, Icon, Body, Title, Right, Button, Content, Card, CardItem, Text } from 'native-base'

export default function Guards(props) {
    return (
        <Container>
            <Header style={{ backgroundColor: "#43bfe6" }}>
                <Left>
                    <Button transparent onPress={()=> props.navigation.openDrawer()}><Icon name="menu" /></Button>
                </Left>
                <Body>
                    <Title> Guards </Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <Text>Guards</Text>
                <Card>
                    <CardItem>
                        <Icon active name="logo-googleplus" />
                        <Text>Google Plus</Text>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Button onPress={()=> props.navigation.navigate('Add_Guard')}><Text>Add Guard</Text></Button>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}