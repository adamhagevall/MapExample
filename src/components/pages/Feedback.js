import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Container, Header, Left, Body, Title, Right, Textarea, Form, ListItem, CheckBox, Card, CardItem } from "native-base";
import { Content } from 'native-base';
import { ScrollView } from 'react-native';
import Communications from 'react-native-communications';
import FeedbackHeader from '../FeedbackHeader';
import CalendarHeader from '../CalendarHeader';
import { Tile } from 'react-native-elements';
var bild = require('../Assets/fadedmap.jpg');
import BackgroundImage from './bg';
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'



const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 1
const options = [
    'Cancel',
    {
        component: <Text style={{ color: 'grey', fontSize: 12, marginLeft: 12, marginRight: 12, marginBottom: 12, textAlign: 'justify'}}>Jag godkänner att mina uppgifter kommer att användas och samlas fram till september 2019. Du måste följa alla policyer som du får tillgång till via Tjänsterna.

        Missbruka inte våra Tjänster. Du får till exempel inte störa våra Tjänster eller försöka komma åt dem med en annan metod än gränssnittet och anvisningarna som vi tillhandahåller. Du får endast använda våra Tjänster i enlighet med gällande lagstiftning, inklusive tillämpliga lagar och regler avseende export och återexport. Vi kan stänga av eller upphöra att tillhandahålla dig våra Tjänster om du inte uppfyller våra villkor eller policyer eller om vi utreder misstänkta oegentligheter.</Text>,
        height: 180,
    },
    {
        component: <Text style={{ color: 'blue', fontSize: 18 }}>Godkänn</Text>,
        height: 50,
    },



]
const title = <Text style={{ color: 'blue', fontSize: 20 }}>Villkor gällande personuppgifter</Text>



export default class Feedback extends Component {
    state = { mailSender: '', mailSubject: '', mailContent: '', checked: false, ButtonStateHolder: true, selected: 1 };

    onMailPress() {
        Communications.email(['johanna.dagfalk@live.se'], null, null, this.state.mailSubject, this.state.mailContent)
        console.log(this.state.mailSender);
    }
    showActionSheet() {
        this.actionSheet.show()
    }
    getActionSheetRef = ref => (this.actionSheet = ref)

    handlePress = index => { this.setState({ selected: index, checked: true, ButtonStateHolder: false }) }


    render() {
        const { runRoute, selected } = this.state
        const selectedText = options[selected].component || options[selected]

        return (
            <Container>

                <View style={{ height: 150 }}>
                    <CalendarHeader />
                </View>

                <BackgroundImage>


                    <View style={{ position: 'absolute', flexDirection: 'column', width: 375, marginTop: -40 }}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View styles={{ position: 'absolute', flexDirection: 'column', width: 300, marginTop: 150 }}>
                                <Card style={styles.containerStyle}>
                                    <CardItem>
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
                                            <Form style={{ backgroundColor: 'white' }}>
                                                <Textarea rowSpan={5} bordered
                                                    onChangeText={(mailContent) => this.setState({ mailContent })} />

                                            </Form>
                                            <Text style={styles.text}></Text>

                                            <ListItem>
                                                <CheckBox checked={this.state.checked} color='#4A90E2' onPress={() => this.setState({ checked: !this.state.checked, ButtonStateHolder: !this.state.ButtonStateHolder })} />

                                                <Body>
                                                    <Text > Godkänn
                            <Text style={{ textDecorationLine: 'underline', color: '#008ccf' }} onPress={() => { this.showActionSheet() }}> feedbackvillkor
                            </Text>
                                                    </Text>


                                                </Body>
                                            </ListItem>
                                            <TouchableOpacity style={[styles.button, { backgroundColor: this.state.ButtonStateHolder ? '#e0e2e2' : '#4A90E2' }]} onPress={this.onMailPress.bind(this)} activeOpacity={.5}
                                                disabled={this.state.ButtonStateHolder}>
                                                <Text style={styles.buttonText}>Skicka Feedback</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </CardItem>
                                </Card>

                            </View>
                        </ TouchableWithoutFeedback>
                    </View>
                </BackgroundImage> */}
                    <ActionSheet
                    ref={this.getActionSheetRef}
                    title={title}
                    message="För att sända feedback måste följande villkor godkännas"
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />
            </Container>

        );
    }


}

const styles = StyleSheet.create({
    view: {
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
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
        marginBottom: 5,
        backgroundColor: 'white'
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
    },
    containerStyle: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
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
});