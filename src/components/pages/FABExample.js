import React, { Component } from "react";
import { Container, Header, Button, Content, ActionSheet, Text, View, Icon, Fab } from "native-base";
var BUTTONS = ["GRÖN", "BLÅ", "RÖD", "SVART", "Avbryt"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class FABExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true'
    };
  }

  render() {
    return (  
      <Container>
        <Header />
        <View style={{ flex: 1 }}>
          <Fab
            active={false}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#4A90E2', marginBottom: 100 }}
            position="bottomRight"
            // onPress={() => this.setState({ active: !this.state.active })}>
            onPress={() =>
            ActionSheet.show(
              {
                backgroundColor: 'red',
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Välj ruttanpassning"
              },
              buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
              }
            )}
          >
            <Icon name="settings" />
          </Fab>
        </View>
      </Container>
    );
  }
}


