import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from 'react-native-calendar-events';



export default class EventDemo extends Component {
 
  render() {
    const eventTitle = 'Lunch';
    const nowUTC = '2018-04-26T13:14:07.000Z';
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Event title: {eventTitle}</Text>
       

        <Button
          onPress={() => {
            RNCalendarEvents.authorizationStatus()
            // RNCalendarEvents.saveEvent('Title of event', {
            //   startDate: '2016-08-19T19:26:00.000Z',
            //   endDate: '2017-08-19T19:26:00.000Z'
            // }) 
          }}
          title="Add to calendar"
        />
       
      </View>
    );
  }
}

  // import React, { Component } from 'react';
// import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
// import * as AddCalendarEvent from 'react-native-add-calendar-event';



// export default class EventDemo extends Component {
//   state = { text: '' };
//   render() {
//     const eventTitle = 'Lunch';
//     const nowUTC = '2018-04-26T13:14:07.000Z';
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Event title: {eventTitle}</Text>
       

//         <Button
//           onPress={() => {
//             EventDemo.addToCalendar(eventTitle, nowUTC);
//           }}
//           title="Add to calendar"
//         />
       
//       </View>
//     );
//   }

//   static addToCalendar = () => {
//     const eventConfig = {
//       title: 'Lunch',
//       startDate: '2018-04-26T13:14:07.000Z',
//       endDate: '2018-04-26T13:14:07.000Z',
      
//     };

//     AddCalendarEvent.presentEventDialog(eventConfig)
//     .then((eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }) => {
//       // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
//       // These are two different identifiers on iOS.
//       // On Android, where they are both equal and represent the event id, also strings.
//       // when false is returned, the dialog was dismissed
//       if (eventInfo) {
//         console.warn(JSON.stringify(eventInfo));
//       } else {
//         console.warn('dismissed');
//       }
//     })
//     .catch((error: string) => {
//       // handle error such as when user rejected permissions
//       console.warn(error);
//     });
// };
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
