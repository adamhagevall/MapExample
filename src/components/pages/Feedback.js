import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Title, Right, Textarea, Form, ActionSheet, ListItem, CheckBox } from "native-base";
import { Content } from 'native-base';
import { ScrollView } from 'react-native';
import Communications from 'react-native-communications';
import FeedbackHeader from '../FeedbackHeader';


export default class Feedback extends Component {
    state = { mailSender: '', mailSubject: '', mailContent: '', checked: false, ButtonStateHolder: true};

    onMailPress() {
        Communications.email(['johanna.dagfalk@live.se'], null, null, this.state.mailSubject, this.state.mailContent)
        console.log(this.state.mailSender);
    }

    render() {
        return (
            <Container>
                 <Content >
                  <FeedbackHeader />
           
                <View style={styles.view}>
                    <Text style={styles.text}>Ditt namn</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(mailSender) => this.setState({ mailSender })}
                    >
                    </TextInput>
                    <Text style={styles.text}>Angående plats/gata</Text>
                    <TextInput
                        keyboardType="numbers-and-punctuation"
                        style={styles.textInput}
                        onChangeText={(mailSubject) => this.setState({ mailSubject })}
                    ></TextInput>
                    <Text style={styles.text}>Feedback</Text>
                    <Form>
                        <Textarea rowSpan={5} bordered 
                        onChangeText={(mailContent) => this.setState({ mailContent })}/>
                        
                    </Form>
                    <Text style={styles.text}></Text>

                     <ListItem>
                        <CheckBox checked={this.state.checked} color='#4A90E2' onPress={() => this.setState({ checked: !this.state.checked, ButtonStateHolder: !this.state.ButtonStateHolder })}/>
        
                        <Body>
                            <Text>Godkänn feedbackvillkor</Text>
                        </Body>
                    </ListItem>
                    <TouchableOpacity style={[styles.button, {backgroundColor: this.state.ButtonStateHolder ? '#e0e2e2' : '#4A90E2' }]} onPress={this.onMailPress.bind(this)}  activeOpacity = { .5 } 
          disabled={this.state.ButtonStateHolder}>
                        <Text style={styles.buttonText}>Skicka Feedback</Text>
                    </TouchableOpacity>
                </View>
            </Content>
            </Container>
        );
    }

    
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#fff',
        flex: 1
    },
    text: {
        color: '#333333',
        marginBottom: 5
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 5
    },
    button: {
        backgroundColor: '#4A90E2',
        padding: 12,
        borderRadius: 6
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});