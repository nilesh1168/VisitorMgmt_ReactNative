import React from 'react'
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content, Text } from 'native-base'

export default function Add_Guard(props){
    return(
        <Container>
            <Header style={{ backgroundColor: "#43bfe6" }}>
                <Left>
                    <Button transparent onPress={()=> props.navigation.openDrawer()}><Icon name="menu" /></Button>
                </Left>
                <Body>
                    <Title>Add Guard</Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <Text> Add Guard </Text>
            </Content>
        </Container>
    );
}