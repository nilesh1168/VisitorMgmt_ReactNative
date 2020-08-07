import React from 'react'
import { Container, Header, Content, Left, Button, Icon, Body, Title, Right, Text, Card, Col, CardItem } from 'native-base'
import { Row } from 'react-native-responsive-grid-system'

export default function Sel_Date(props) {
    let month;
    if(props.route.params)
        month = props.route.params.month
    
    return (
        <Container>
            <Header style={{ backgroundColor: "#43bfe6" }}>
                <Left>
                    <Button transparent onPress={() => props.navigation.openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>
                        Select Date
                    </Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <Card>
                    <CardItem>
                        <Row>
                            <Col><Button bordered style={{ alignSelf:'center'}}><Text>1-5</Text></Button></Col>
                            <Col><Button bordered style={{ alignSelf:'center'}}><Text>6-10</Text></Button></Col>
                            <Col><Button bordered style={{ alignSelf:'center'}}><Text>11-15</Text></Button></Col>
                        </Row>
                        </CardItem>
                        <CardItem>
                        <Row >
                            <Col ><Button bordered style={{ alignSelf:'center'}}><Text>16-20</Text></Button></Col>
                            <Col ><Button bordered style={{ alignSelf:'center'}}><Text>21-25</Text></Button></Col>
                        </Row>
                        </CardItem>
                        <CardItem>
                        <Row>
                            <Col><Button bordered style={{alignSelf:'center'}}><Text>26-30/31</Text></Button></Col>
                        </Row>
                    </CardItem>
                </Card>
                { false &&  <Card>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
                }
            </Content>
        </Container>
    );

}