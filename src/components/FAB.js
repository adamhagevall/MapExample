import React, { Component } from "react";
import { Container, Header, Button, Content, Text, View, Icon, Fab } from "native-base";

import { StyleSheet, Image } from 'react-native'


export default class FAB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true'
    };
  }


  render() {
    console.log('runFab')
    return (
      <Container>
        <Header />
        <View style={styles.wrapper}>
          <Fab
            active={this.state.active}
            active={false}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: 'red', marginBottom: 200, width: 40, height: 40 }}
            position="bottomLeft"
            onPress={() => {
            }}
          >
            <Icon name="close-circle" />
          </Fab>


        </View>

      </Container>
    );
  }
}



const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#000',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginBottom: 10,
  },

  title: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  titleText: {
    color: '#8f8f8f',
    fontSize: 13,
    fontWeight: '600',
  },
  message: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  messageText: {
    color: '#8f8f8f',
    fontSize: 13,
    textAlign: 'center',
  },

  optionsContainer: {
    borderRadius: 12,
  },
  options: {
    backgroundColor: '#cecece',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  buttonTitle: {
    fontSize: 20,
  },

  cancelButton: {
    borderRadius: 12,
  },
  cancelTitle: {
    fontWeight: '600',
  },
})