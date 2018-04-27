// import React, { Component } from 'react';
// import { Container, Content, Header, View, Button, Icon, Fab } from 'native-base';
// import { Actions } from 'react-native-router-flux';

// export default class FAB extends Component {
//     constructor() {
//         super();
//         this.state = {
//             active: 'false'
//         };
//     }
//     render() {
//         return (
//             <Container style={{ marginBottom: 210}}>
//             <View style={{ flex: 1}}>
//                 <Fab
//                     // active={this.state.active}
//                     active={false}
//                     direction="up"
//                     containerStyle={{}}
//                     style={{ backgroundColor: '#4A90E2', marginBottom: 190 }}
//                     position="bottomRight"
//                     // onPress={() => this.setState({ active: !this.state.active })}>
//                     onPress={Actions.calendar}>
//                     <Icon name="calendar" />
//                     <Button style={{ backgroundColor: '#34A34F', marginBottom: 210 }}>
//                         <Icon name="logo-whatsapp" />
//                     </Button>
//                     <Button style={{ backgroundColor: '#3B5998', marginBottom: 210 }} onPress={Actions.feedback}>
//                         <Icon name="logo-facebook" />
//                     </Button>
//                     <Button style={{ backgroundColor: '#DD5144', marginBottom: 210 }} onPress={Actions.feedback}>
//                         <Icon name="mail" />
//                     </Button>
//                 </Fab>
//             </View>
//             </Container>
//         );
//     }
// }


import React, { Component } from 'react';
import { Text, TouchableHighlight, StyleSheet, Modal } from 'react-native';
//import Modal from 'react-native-modalbox';

import { Container, Content, Header, View, Button, Icon, Fab } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class FAB extends Component {
    state = {
        modalVisible: false
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <Container style={{ marginBottom: 50 }}>
                <View style={{ flex: 1 }}>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                <Text>Hello World!</Text>

                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>

                    {/* <Modal style={styles.modal} position={"bottom"} ref={"modal"}>
                            <Text>Modal on bottom with backdrop</Text>
                        </Modal> */}
                    <Fab
                        active={this.state.active}
                        active={false}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#4A90E2', marginBottom: 100 }}
                        position="bottomRight"
                        //onPress={() => { this.setModalVisible(true) }}
                        onPress={() => { this.setModalVisible(true) }}
                    //onPress={() => this.setState({ active: !this.state.active })}>
                    // onPress={this.renderModal}
                    >
                        <Icon name="settings" />
                    </Fab>
                    {/* <Fab
                        // active={this.state.active}
                        active={false}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#4A90E2', marginBottom: 210 }}
                        position="bottomRight"
                        //onPress={() => { this.setModalVisible(true) }}
                        onPress={() => this.refs.modal.open()}
                    // onPress={() => this.setState({ active: !this.state.active })}>
                    // onPress={this.renderModal}
                    >
                        <Icon name="settings" />
                    </Fab>
                    <Modal style={styles.modal} position={"bottom"} ref={"modal"}>
                        <Text style={styles.text}>Modal on bottom with backdrop</Text>
                        <Slider style={{ width: 200 }} value={this.state.sliderValue} onValueChange={(value) => this.setState({ sliderValue: value })} />
                    </Modal> */}

                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        height: 300
    }
})