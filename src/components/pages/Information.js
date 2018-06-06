import React, { Component } from 'react';
import { ListView, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container, Separator, Text, Card, CardItem, Left, Right, Body, Icon, Thumbnail } from 'native-base';
import { ButtonGroup } from 'react-native-elements';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ListItem from '../ListItem';
import { Button } from '../common/Button';
import reducers from '../../reducers';
import FAB from '../FAB';
import { Actions } from 'react-native-router-flux';
import InfoHeader from '../InfoHeader';
import CalendarHeader from '../CalendarHeader';
import BackgroundImage from './bg';

const bild1 = require('../Assets/parasportalmedalen.jpg');
const bild2 = require('../Assets/Bildhyreshus.jpg');
const bild3 = require('../Assets/Rullstolhissliten.jpg');
const bild4 = require('../Assets/SandwishesonatablethebuffeeMINDRE.jpg');

class Information extends Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(this.props.libraries);
    }

    renderRow(library) {
        return <ListItem library={library} />;
    }

    renderList() {
        return (
            <ListView
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }

    render() {
        const buttons = ['Information', 'Schema']
        const { selectedIndex } = this.state

        return (
            <Container>
                <View style={{ height: 150 }}>
                    <InfoHeader />
                </View>
                <BackgroundImage>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={{ position: 'absolute', width: 375, marginTop: -30 }}>
                        <Card style={styles.containerStyle}>
                            <CardItem>
                                <View style={{ width: 300 }}>
                                    {this.renderList()}
                                    <View style={{ marginTop: 10 }}>
                                        <Separator bordered>
                                            <Text>TISDAG 3 JULI 2018</Text>
                                        </Separator>
                                    </View>
                                    <CardItem>
                                    
                                        <Text style={{flex: 15}}><Text style={{ fontWeight: 'bold' }}> 14.00-14.45</Text>{'\n'} Bygg tillgängligt tjäna mer!</Text>
                                       <Right>
                                       <Thumbnail source={bild1} />
                                       </Right>
                                      
                                    </CardItem>
                                   
                                    <CardItem>
                                        <Text style={{flex: 15}}><Text style={{ fontWeight: 'bold' }}> 15.00-15.45</Text>{'\n'} Kan miljonprogrammet lösa{'\n'} de bostadspolitiska{'\n'} utmaningarna?</Text>
                                       <Right>
                                       <Thumbnail source={bild2} />
                                       </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Text style={{flex: 15}}><Text style={{ fontWeight: 'bold' }}> 16.00-16.45</Text>{'\n'} Sverige - tillgängligt{'\n'} för alla?!</Text>
                                       <Right>
                                       <Thumbnail source={bild3} />
                                       </Right>
                                        
                                    </CardItem>
                                    <CardItem>
                                        <Text style={{flex: 15}}><Text style={{ fontWeight: 'bold' }}> 17.00-18.00</Text>{'\n'} Eftersnack</Text>
                                       <Right>
                                       <Thumbnail source={bild4} />
                                       </Right>
                                    </CardItem>
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                    </View>
                </BackgroundImage>
            </Container>
        );
    }
}

const styles = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    }
};

const mapStateToProps = state => ({ libraries: state.libraries });

export default connect(mapStateToProps)(Information);







