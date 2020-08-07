import React from 'react';
import { Container, Header, Content, Text, Card, CardItem, Body, Item, Picker, Left, Button, Icon, Title, Right, List, ListItem } from 'native-base';
import { BarChart } from "react-native-chart-kit";
import { Row, Col } from 'react-native-responsive-grid-system';


const data = {
        labels: ["January", "February", "March"],
        datasets: [
                {
                        data: [20, 45, 82]
                }
        ]
};

const chartConfig = {
        backgroundGradientFrom: "#0000ff",
        backgroundGradientFromOpacity: 0.5,
        backgroundGradientTo: "#0000ff",
        backgroundGradientToOpacity: 0.5,
        fillShadowGradient: '#ffffff',
        fillShadowGradientOpacity: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 0.5,
        //useShadowColorFromDataset: false // optional
};





export default function AdminDash(props) {
        return (
                <Container>
                        <Header style={{ backgroundColor: '#43bfe6' }}>
                                <Left>
                                        <Button transparent onPress={() => props.navigation.openDrawer()}>
                                                <Icon name='menu' />
                                        </Button>
                                </Left>
                                <Body>
                                        <Title>Dashboard</Title>
                                </Body>
                                <Right />
                        </Header>
                        <Content padder>
                                <Card transparent>
                                        <CardItem header style={{ marginTop: 15, marginBottom: 10, justifyContent: 'center' }}>
                                                <Item >
                                                        <Button>
                                                                <Text>Refresh</Text>
                                                        </Button>
                                                </Item>
                                        </CardItem>
                                        <CardItem>
                                                <Body>
                                                        <Row>
                                                                <Col xs={5} sm={5} md={5} lg={5}>
                                                                        <Card transparent>
                                                                                <CardItem header style={{justifyContent:'center'}}>
                                                                                        <Item>
                                                                                                <Button style={{ width:'100%', justifyContent:'center'}} bordered disabled success><Text>In</Text></Button>
                                                                                        </Item>
                                                                                </CardItem>
                                                                                <CardItem style={{ justifyContent:'center'}}>
                                                                                                                <Text>Suraj</Text>
                                                                                </CardItem>
                                                                                <CardItem style={{ justifyContent:'center'}}>                                
                                                                                                                <Text>Onkar</Text>
                                                                                </CardItem>
                                                                        </Card>
                                                                </Col>
                                                                <Col xs={2} sm={2} md={2} lg={2}></Col>
                                                                <Col xs={5} sm={5} md={5} lg={5}>
                                                                        <Card transparent>
                                                                                <CardItem  header style={{ justifyContent:'center'}}>
                                                                                        <Item>
                                                                                                <Button style={{ width:'100%', justifyContent:'center'}} bordered disabled danger><Text>Out</Text></Button>
                                                                                        </Item>
                                                                                </CardItem>
                                                                                <CardItem style={{ justifyContent:'center'}}>
                                                                                                                <Text>Nilesh</Text>
                                                                                </CardItem>
                                                                                <CardItem style={{ justifyContent:'center'}}>                                
                                                                                                                <Text>Sanket</Text>
                                                                                </CardItem>
                                                                        </Card>
                                                                </Col>
                                                        </Row>
                                                </Body>
                                        </CardItem>
                                </Card>
                        </Content>
                </Container>
        );
}
