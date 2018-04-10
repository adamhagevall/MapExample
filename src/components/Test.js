import React, { Component } from 'react';
import { Button, Card, CardSection } from './common';

class Test extends Component {
    state = { onFirstPage: true }; //NYTT

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


    renderButton() {
        return (
            <Button onPress={this.onButtonPress}>
            First
            </Button>
            
        );
      }

    render() {
        return (
            <Card>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

export default Test;
