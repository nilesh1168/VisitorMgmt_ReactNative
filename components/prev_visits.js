import React from 'react';
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content, Card, CardItem, Item, Picker, Text, } from 'native-base';
import { Row, Col } from 'react-native-responsive-grid-system';


export default function Prev_Visits(props) {
    const Month = (param) => {
        props.navigation.navigate('Select_Date',{
            month:param,
        })
    };
    return (
        <Container>
            <Header style={{ backgroundColor: "#43bfe6" }}>
                <Left>
                    <Button transparent onPress={()=> props.navigation.openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Previous Visits</Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <Card>
                    <CardItem header style={{ marginTop: 10, marginBottom: 15 }}>
                        <Item picker>
                            <Picker>
                                <Picker.Item label='Year' value='Year' />
                            </Picker>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Row>
                            <Col xs={4} sm={4} md={4} lg={4} >
                                <Button onPress={()=>Month('Jan')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>Jan</Text></Button>
                                <Button onPress={()=>Month('Apr')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>Apr</Text></Button>
                                <Button onPress={()=>Month('Jul')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>Jul</Text></Button>
                                <Button onPress={()=>Month('Oct')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>Oct</Text></Button>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4} >
                                <Button onPress={()=>Month('Feb')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>Feb</Text></Button>
                                <Button onPress={()=>Month('May')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>May</Text></Button>
                                <Button onPress={()=>Month('Aug')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>Aug</Text></Button>
                                <Button onPress={()=>Month('Nov')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>Nov</Text></Button>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4} >
                                <Button onPress={()=>Month('Mar')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>Mar</Text></Button>
                                <Button onPress={()=>Month('Jun')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>Jun</Text></Button>
                                <Button onPress={()=>Month('Sep')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>Sep</Text></Button>
                                <Button onPress={()=>Month('Dec')} style={{ marginTop: 10, marginBottom: 15, alignSelf: 'center' }} bordered ><Text>Dec</Text></Button>
                            </Col>
                        </Row>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );

} 