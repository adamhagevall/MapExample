import React, { Component } from 'react';
  import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
  
import { ListView, View, Image } from 'react-native';
  import Map from './Map';
  import LibraryList from './LibraryList';

import Card from './common/Card';
import CardSection from './common/CardSection';

class FooterEx extends Component {

    state = { onFirstPage: null }; //NYTT

    onButtonPress = () => {
               if (this.state.onFirstPage) {
                   this.setState({ onFirstPage: false });
                   {this.renderContent()}
               } else {
                   this.setState({ onFirstPage: true });
                   {this.renderContent()}
               }
               };

               renderMap() {
                return (
                    console.log(this.state.onFirstPage),
                 <Map/>
                );
            }

    renderContent() {
    switch (this.state.onFirstPage) {
        case true:
        return (
            <LibraryList />
            );
        case false: 
        return (
                <Map />
            );

        default: 
            return (
            <View>
            </View>
            );
    }
}

      render() {
          return (
            <View style={{ flex: 1 }}>
                 <View>
                <Card style = {{ width: 200, height: 400}}>
              {this.renderContent()}
              </Card>
          </View>
              <Container>
                  <Content />
                  <Footer >
                      <FooterTab>
                          <Button active vertical onPress={this.onButtonPress}>
                              <Icon active name="navigate" />
                              <Text>Navigate</Text>
                          </Button>
                          <Button vertical onPress={this.onButtonPress}>
                              <Icon name="person" />
                              <Text>Information</Text>
                          </Button>
                      </FooterTab>
                  </Footer>
              </Container>
             
              
      </View>
          );
      }
  }

  export default FooterEx;