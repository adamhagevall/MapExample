import React, { Component } from 'react';
import { Container, Content, Button, Icon, Fab } from 'native-base';


class FAB extends Component {
    constructor() {
        this.state = {
            active: 'true'
        };
    }
      render() {
        return (  
                      <Container>
                <Content>
                    <Fab
                        active={this.state.active}
                        direction="right"
                        containerStyle={{ marginLeft: 10 }}
                        style={{ backgroundColor: '#5067FF' }}
                        position="topLeft"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="share" />
                        <Button style={{ backgroundColor: '#34A34F' }}>
                            <Icon name="logo-whatsapp" />
                        </Button>
                        <Button style={{ backgroundColor: '#3B5998' }}>
                            <Icon name="logo-facebook" />
                        </Button>
                        <Button disabled style={{ backgroundColor: '#DD5144' }}>
                            <Icon name="mail" />
                        </Button>
                    </Fab>
                </Content>
            </Container>
        );
    }
}

export default FAB;