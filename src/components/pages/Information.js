import React, { Component } from 'react';
import { ListView, View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container, Separator, Text, Card, CardItem, Left, Right, Icon } from 'native-base';
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
                    <View style={{ position: 'absolute', flexDirection: 'row', width: 375, marginTop: -30 }}>
                        <Card style={styles.containerStyle}>
                            <CardItem>
                                <ScrollView style={{ width: 300 }}>
                                    {this.renderList()}
                                    <View style={{ marginTop: 10 }}>
                                        <Separator bordered>
                                            <Text>SCHEMA:</Text>
                                        </Separator>
                                    </View>
                                    <CardItem>
                                        <Icon active name="contacts" />
                                        <Text onPress={Actions.calendar} style={{flex: 15}}>Bygg tillgängligt tjäna mer!</Text>
                                        <Right>
                                            <Icon name="arrow-forward" onPress={Actions.calendar} style={{flex: 1}}/>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Icon active name="contacts" />
                                        <Text onPress={Actions.calendar} style={{flex: 15}}>Kan miljonprogrammet lösa de bostadspolitiska utmaningarna?</Text>
                                        <Right>
                                            <Icon name="arrow-forward" onPress={Actions.calendar} style={{flex: 1}}/>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Icon active name="contacts" />
                                        <Text onPress={Actions.calendar} style={{flex: 15}}>Sverige - tillgängligt för alla?!</Text>
                                        <Right>
                                            <Icon name="arrow-forward" onPress={Actions.calendar} style={{flex: 1}}/>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Icon active name="contacts" />
                                        <Text onPress={Actions.calendar} style={{flex: 15}}>Eftersnack</Text>
                                        <Right>
                                            <Icon name="arrow-forward" onPress={Actions.calendar} style={{flex: 1}}/>
                                        </Right>
                                    </CardItem>
                                </ScrollView>
                            </CardItem>
                        </Card>
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