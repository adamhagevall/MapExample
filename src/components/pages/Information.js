import React, { Component } from 'react';
import { ListView, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container, Separator, Text, Card, CardItem, Left, Right, Icon } from 'native-base';
import {ButtonGroup } from 'react-native-elements';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ListItem from '../ListItem';
import { Button } from '../common/Button';
import InfoHeader from '../InfoHeader';
import reducers from '../../reducers';
import FAB from '../FAB';
import { Actions } from 'react-native-router-flux';
var info = require('../Assets/information.jpg');


var logo = require('../Assets/raukavagen.png');

class Information extends Component {
    constructor () {
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
  
      
      updateIndex (selectedIndex) {
        this.setState({selectedIndex})
      }
      
    

    render() {
        const buttons = ['Information', 'Schema']
        const { selectedIndex } = this.state

        return (
            <Container>
                <InfoHeader />
                <View style={{ position: 'absolute', flexDirection: 'column' }}>
         

                    <Image source={info} style={{height: 100, width: 100, marginLeft: 140, marginTop: 100}}/>
                    </View>
            <Content style={{ marginTop: 75 }}>
            <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 40}}
          />
                <View>
                    {this.renderList()}
                </View>
                
        
        
                    
                    <Card>
                    <Separator bordered>
                        <Text>SCHEMA:</Text>
                    </Separator>
                   
                    <CardItem>
                            <Icon active name="contacts" />
                            <Text>Seminarium 1</Text>
                            <Right>
                                <Icon name="arrow-forward" onPress={Actions.calendar} />
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Icon active name="contacts" />
                            <Text>Seminarium 2</Text>
                            <Right>
                                <Icon name="arrow-forward" onPress={Actions.calendar} />
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Icon active name="contacts" />
                            <Text>Seminarium 3</Text>
                            <Right>
                                <Icon name="arrow-forward" onPress={Actions.calendar} />
                            </Right>
                        </CardItem>
                    </Card>
            {/* <Image source={logo} /> */}
            </Content>
            </Container>

        );
    }
    
}


const mapStateToProps = state => ({ libraries: state.libraries });

export default connect(mapStateToProps)(Information);