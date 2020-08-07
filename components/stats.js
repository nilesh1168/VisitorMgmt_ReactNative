import React from 'react';
import { Dimensions } from 'react-native';
import { Container, Header, Content, Text, Card, CardItem, Body, Item, Picker, Left, Icon, Right, Button, Title } from 'native-base';
import { BarChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

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





export default function Statistics(props) {
    return (
        <Container>
            <Header style={{ backgroundColor:'#43bfe6' }}>
                <Left>
                    <Button transparent onPress={()=> props.navigation.openDrawer()}>
                        <Icon name='menu'/>
                    </Button>    
                </Left>
                <Body>
                    <Title>Statistics</Title>
                </Body>
                <Right/>
            </Header>
            <Content padder>
                <Card transparent>
                    <CardItem>
                        <Body>
                            <Item style={{ marginTop: 15, marginBottom: 10 }} picker>
                                <Picker note mode='dropdown' style={{ width: undefined }}>
                                    <Picker.Item label='Jan' value='Jan' />
                                    <Picker.Item label='Feb' value='Feb' />
                                    <Picker.Item label='Mar' value='Mar' />
                                    <Picker.Item label='Apr' value='Apr' />
                                    <Picker.Item label='May' value='May' />
                                    <Picker.Item label='Jun' value='Jun' />
                                    <Picker.Item label='Jul' value='Jul' />
                                    <Picker.Item label='Aug' value='Aug' />
                                    <Picker.Item label='Sep' value='Sep' />
                                    <Picker.Item label='Oct' value='Oct' />
                                    <Picker.Item label='Nov' value='Nov' />
                                    <Picker.Item label='Dec' value='Dec' />
                                </Picker>
                            </Item>
                            <Item style={{ marginTop: 15, marginBottom: 10 }} picker>
                                <Picker note mode='dropdown' style={{ width: undefined }}>
                                    <Picker.Item label='Jan' value='Jan' />
                                    <Picker.Item label='Feb' value='Feb' />
                                    <Picker.Item label='Mar' value='Mar' />
                                    <Picker.Item label='Apr' value='Apr' />
                                    <Picker.Item label='May' value='May' />
                                    <Picker.Item label='Jun' value='Jun' />
                                    <Picker.Item label='Jul' value='Jul' />
                                    <Picker.Item label='Aug' value='Aug' />
                                    <Picker.Item label='Sep' value='Sep' />
                                    <Picker.Item label='Oct' value='Oct' />
                                    <Picker.Item label='Nov' value='Nov' />
                                    <Picker.Item label='Dec' value='Dec' />
                                </Picker>
                            </Item>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <BarChart data={data} width={350}
                                height={220} yAxisLabel="$" chartConfig={chartConfig}
                                verticalLabelRotation={0} />
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}
