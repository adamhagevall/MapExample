import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import Map from './Map';
import { Button } from './common';
import Test from './Test';

class LibraryList extends Component {
   state = { onFirstPage: null }; //NYTT

   componentWillMount() {
       const ds = new ListView.DataSource({
           rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.libraries);
   }


   //NYTT
   onButtonPress = () => {
       if (this.state.onFirstPage) {
           this.setState({ onFirstPage: false });
           console.log(this.state.onFirstPage);
       } else {
           this.setState({ onFirstPage: true });
           console.log(this.state.onFirstPage);
       }
       };

   //SLUT
/*  renderContent() {
    switch (this.state.onFirstPage) {
       case true:
           return ( */
       
   renderRow(library) {
       return <ListItem library={library} />;
   }
   renderMap() {
       return <Map />
   }

   renderList() {
       return (
        <ListView
       dataSource={this.dataSource}
       renderRow={this.renderRow}
        />
       );
   }


   renderContent() {
    console.log(this.state.onFirstPage);
    switch (this.state.onFirstPage) {
        

        case true:
            return (
            <View>
            <Button onPress={this.onButtonPress}>First</Button>;
            <View>
            {this.renderList()}
            </View>
            </View> 
            );
        case false: 
        return (
            <View>
            <Button onPress={this.onButtonPress}>Second</Button>;
            <View>
            {this.renderMap()}
            </View>
            </View> 
            );

        default: 
            return <Button onPress={this.onButtonPress}>Third</Button>;
    }
}

   render() {
       return (
            <View> 
               {this.renderContent()}
            </View>

       );
   }

}


const mapStateToProps = state => ({ libraries: state.libraries });

export default connect(mapStateToProps)(LibraryList);
