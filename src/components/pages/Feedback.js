import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { Container, Header, Left, Body, Title, Right, Textarea, Form } from "native-base";
import { Content } from 'native-base';
import { ScrollView } from 'react-native';
import Communications from 'react-native-communications';


export default class Feedback extends Component {
    onTextPress() {
        console.log('hall[')
        Communications.email(['johanna.dagfalk@live.se'],null,null,'My Subject','My body text')
    }

    render() {
        return (
            <Content style={{ marginTop: 75 }}>
                <View style={styles.view}>
                    <Text style={styles.text}>Ditt namn</Text>
                    <TextInput
                        style={styles.textInput}
                    ></TextInput>
                    <Text style={styles.text}>Angående plats/gata</Text>
                    <TextInput
                        keyboardType="numbers-and-punctuation"
                        style={styles.textInput}
                    ></TextInput>
                    <Text style={styles.text}>Feedback</Text>
                    <Form>
                        <Textarea rowSpan={5} bordered />
                    </Form>
                    <Text style={styles.text}></Text>
                    <TouchableHighlight style={styles.button} onPress={this.onTextPress.bind(this)}>
                        <Text style={styles.buttonText}>Send Feedback</Text>
                    </TouchableHighlight>
                </View>
            </Content>
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
        backgroundColor: 'blue',
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