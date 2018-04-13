import React, { Component } from 'react';
  import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
  
import { ListView, View, Image } from 'react-native';
  import Map from './Map';
  import LibraryList from './LibraryList';

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

    renderContent() {
    switch (this.state.onFirstPage) {
        case true:

            return (
            console.log(this.state.onFirstPage),
                <LibraryList />
            );
        case false: 
        return (
            console.log(this.state.onFirstPage),
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
              <Container>
                  <Content />
                  <Footer >
                      <FooterTab>
                          <Button vertical onPress={this.onButtonPress}>
                              <Icon name='apps' />
                              <Text>Apps</Text>
                          </Button>
                         
                          <Button vertical>
                              <Icon name="camera" />
                              <Text>Camera</Text>
                          </Button>
                          <Button active vertical>
                              <Icon active name="navigate" />
                              <Text>Navigate</Text>
                          </Button>
                          <Button vertical>
                              <Icon name="person" />
                              <Text>Contact</Text>
                          </Button>
                      </FooterTab>
                  </Footer>
              </Container>
          );
      }
  }

  export default FooterEx;