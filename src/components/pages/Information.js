import React, { Component } from 'react';
import { ListView, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Content } from 'native-base';
import ListItem from '../ListItem';
import { Button } from '../common/Button';

class Information extends Component {

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


    render() {
        return (
            <Content style={{ marginTop: 75 }}>
                <View>
                    {this.renderList()}
                </View>
                <Image
                    source={require('../Assets/img1.png')}
                />
                <Image
                    source={require('../Assets/img2.png')}
                    style={{ height: 50 }}
                />
            </Content>

        );
    }

}


const mapStateToProps = state => ({ libraries: state.libraries });

export default connect(mapStateToProps)(Information);