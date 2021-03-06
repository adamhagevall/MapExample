import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { Container, Header, Left, Body, Title, Right, Textarea, Form, ListItem, CheckBox, Card, CardItem } from "native-base";
import { Content } from 'native-base';
import { ScrollView } from 'react-native';
import Communications from 'react-native-communications';
import FeedbackHeader from '../FeedbackHeader';
import CalendarHeader from '../CalendarHeader';
import { Tile } from 'react-native-elements';
import BackgroundImage from './bg';
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const cardWidth = 0;
const sheetFontSize = 0;
const titleFontSize = 0;
const acceptFontSize = 0;
const formHeight = 0;
const buttonMarginBottom = 0;
const descriptionFontSize = 0;
const buttonFontSize = 0;

if (Platform.isPad) {
    cardWidth = '85%';
    sheetFontSize = 16;
    titleFontSize = 24;
    acceptFontSize = 22;
    formHeight = 220;
    buttonMarginBottom = '6%';
    descriptionFontSize = 18;
    buttonFontSize = 22;
} else {
    cardWidth = '100%';
    sheetFontSize = 12;
    titleFontSize = 20;
    acceptFontSize = 18;
    formHeight = 120;
    buttonMarginBottom = 0;
    descriptionFontSize = 14;
    buttonFontSize = 18;
}

const bild = require('../Assets/fadedmap.jpg');
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 1
const title = <Text style={{ color: 'blue', fontSize: titleFontSize }}>Villkor gällande personuppgifter</Text>
const message = <Text style={{ fontSize: sheetFontSize, marginLeft: 8, marginRight: 8, textAlign: 'center' }}>För att skicka återkoppling måste följande villkor godkännas:</Text>
const options = [
    'Cancel',
    {
        component: <Text style={{ color: 'grey', fontSize: sheetFontSize, marginLeft: 12, marginRight: 12, marginBottom: 12 }}>

            * Tillgänglighetsarenan kan samla in följande personuppgifter: för- och efternamn, e-post, organisation och telefonnummer.
{'\n'}
            * Personuppgifterna används för att besvara frågor, motta återkoppling och informera om Tillgänglighetsarenans och arrangerande organisationers aktiviteter.
{'\n'}
            * Personuppgifterna delas inte med andra än Tillgänglighetsarenans arrangörer.
{'\n'}
            * Personuppgifterna behölls så länge det är relevant för Tillgänglighetsarenans syfte
{'\n'}
            * Det är möjligt att få ett registerutdrag och sina personuppgifter rättade eller raderade genom att kontakta Tillgänglighetsarenan på tgharenan@gmail.com
{'\n'}</Text>,

        height: 210,
    },
    {
        component: <Text style={{ color: 'blue', fontSize: acceptFontSize }}>Godkänn</Text>,
        height: 50,
    },
]

export default class Feedback extends Component {
    state = { mailSender: '', mailSubject: '', mailContent: '', checked: false, ButtonStateHolder: true, selected: 1 };
    onMailPress() {
        Communications.email(['tgharenan@gmail.com'], null, null, this.state.mailSubject, this.state.mailContent)
        console.log(this.state.mailSender);
    }
    showActionSheet() {
        this.actionSheet.show()
    }
    getActionSheetRef = ref => (this.actionSheet = ref)

    handlePress = index => { this.setState({ selected: index }), this.handleAgree() }

    handleAgree() {
        if (this.state.selected === 2) {
            this.setState({ checked: true, ButtonStateHolder: false })
        }
    }

    removeKeyboardWhileLeaving = (dummyString) => {
        Keyboard.dismiss();
        console.log(dummyString);
    }

    render() {
        const { runRoute, selected } = this.state
        const selectedText = options[selected].component || options[selected]
        return (
            <Container>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ height: 150 }}>
                        <CalendarHeader callbackFromHeader={this.removeKeyboardWhileLeaving} />
                    </View>
                </TouchableWithoutFeedback>
                <BackgroundImage>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={{ position: 'absolute', flexDirection: 'column', width: cardWidth, marginTop: -40 }}>
                                <View styles={{ position: 'absolute', flexDirection: 'column', width: 300, marginTop: 150 }}>
                                    <Card style={styles.containerStyle}>
                                        <CardItem>
                                            <KeyboardAwareScrollView style={styles.view}>
                                                <Text style={styles.text}>Ditt namn</Text>
                                                <TextInput
                                                    style={styles.textInput}
                                                    onChangeText={(mailSender) => this.setState({ mailSender })}
                                                >
                                                </TextInput>
                                                <Text style={styles.text}>Angående plats/gata</Text>
                                                <TextInput
                                                    style={styles.textInput}
                                                    onChangeText={(mailSubject) => this.setState({ mailSubject })}
                                                ></TextInput>
                                                <Text style={styles.text}>Återkoppling</Text>
                                                <Form style={{ backgroundColor: 'white', height: formHeight }}>
                                                    <Textarea rowSpan={5} bordered
                                                        onChangeText={(mailContent) => this.setState({ mailContent })} />
                                                </Form>
                                                <Text style={styles.text}></Text>
                                                <ListItem>
                                                    <CheckBox checked={this.state.checked} color='#4A90E2' onPress={() => this.setState({ checked: !this.state.checked, ButtonStateHolder: !this.state.ButtonStateHolder })} />
                                                    <Body>
                                                        <Text style={{ fontSize: descriptionFontSize }}> Godkänn <Text style={{ textDecorationLine: 'underline', color: '#008ccf' }} onPress={() => { this.showActionSheet() }}>återkopplingsvillkor</Text>
                                                        </Text>
                                                    </Body>
                                                </ListItem>
                                                <TouchableOpacity style={[styles.button, { backgroundColor: this.state.ButtonStateHolder ? '#e0e2e2' : '#4A90E2' }]} onPress={this.onMailPress.bind(this)} activeOpacity={.5}
                                                    disabled={this.state.ButtonStateHolder}>
                                                    <Text style={styles.buttonText}>Skicka Återkoppling </Text>
                                                </TouchableOpacity>
                                            </KeyboardAwareScrollView>
                                        </CardItem>
                                    </Card>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </BackgroundImage>
                <ActionSheet
                    ref={this.getActionSheetRef}
                    title={title}
                    message={message}
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
        marginBottom: 5,
        marginTop: 1,
        fontSize: descriptionFontSize
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 5,
        backgroundColor: 'white',
        padding: '3.8%'
    },
    button: {
        backgroundColor: '#4A90E2',
        padding: 12,
        borderRadius: 6,
        marginBottom: buttonMarginBottom
    },
    buttonText: {
        color: '#fff',
        fontSize: buttonFontSize,
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

