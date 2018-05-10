import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [
  'Cancel',
  'Apple',
  {
    component: <Image source={require('./Assets/skutt.png')} style={{width:80, height:80, marginTop: 100, marginLeft: 20}} />,
    height: 80,
  },
  'Watermelon',
  {
    component: <Text style={{ color: 'blueviolet' }}>Apple</Text>,
    height: 40,
  },
]
const title = <Text style={{ color: 'crimson', fontSize: 18 }}>Which one do you like?</Text>

export default class CustomExample extends Component {
  state = {
    selected: 1,
  }

  showActionSheet = () => this.actionSheet.show()

  getActionSheetRef = ref => (this.actionSheet = ref)

  handlePress = index => this.setState({ selected: index })

  render() {
      console.log('VAFAN');
    const { selected } = this.state
    const selectedText = options[selected].component || options[selected]

    return (

        <View style={styles.wrapper}>
        <Text style={{ marginBottom: 20 }}>
          I like {selectedText}
        </Text>
        <Text style={styles.button} onPress={this.showActionSheet}>
          Custom ActionSheet
        </Text>
        <ActionSheet
          ref={this.getActionSheetRef}
          title={title}
          message="custom message custom message custom message custom message custom message custom message "
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
        />
      </View>
    )
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