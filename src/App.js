import React, { Component } from 'react';
import { View, PermissionsAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { Container, Content, StyleProvider, Root } from 'native-base';
import reducers from './reducers';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import FAB from './components/FAB';
import Map from './components/pages/Map';
import Information from './components/pages/Information';
import Settings from './components/pages/Settings';
import Feedback from './components/pages/Feedback';
import Calendar from './components/pages/Calendar';
import SplashScreen from 'react-native-splash-screen';
import addToCal from './components/pages/addtoCal';
import firebase from 'firebase';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

export default class App extends Component {

    constructor() {
        super();
        this.state = { showFooter: true }
        // this.state = { showFooter: true, anArray: [] };
    }

    async requestLocationsPermission() {
        console.log('location request');
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Location access granted")
            } else {
                console.log("Locatin access denied")
            }
        } catch (err) {
            //    console.warn(err)
        }
    }

    componentWillMount() {
        this.requestLocationsPermission();
        //testing
        const config = {
            apiKey: 'AIzaSyCz8QVb9p7xj1GKGoWPeK-J3UUbcDlphrs',
            authDomain: 'tillganglighetsarenan-ee2ce.firebaseapp.com',
            databaseURL: 'https://tillganglighetsarenan-ee2ce.firebaseio.com',
            projectId: 'tillganglighetsarenan-ee2ce',
            storageBucket: 'tillganglighetsarenan-ee2ce.appspot.com',
            messagingSenderId: '733038426427'
            // apiKey: 'AIzaSyBTXGUeZBDlMhKkM8d0cO_y0DvRP4YX_bE',
            // authDomain: 'informationdatabase-ef265.firebaseapp.com',
            // databaseURL: 'https://informationdatabase-ef265.firebaseio.com',
            // projectId: 'informationdatabase-ef265',
            // storageBucket: 'informationdatabase-ef265.appspot.com',
            // messagingSenderId: '17200092209'
        };
        firebase.initializeApp(config);
        const database = firebase.database();
        console.log('Firebase WOOH ' + database.ref('/0/title'));
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    //testing
    //    createInformationList() {
    //         console.log('inside createInformationList')
    //         firebase.database().ref().once('value').then((snapshot) => {
    //             const informationArray = [];
    //             snapshot.forEach(function(childSnapshot) {
    //               var key = childSnapshot.key;
    //               var childData = childSnapshot.val();

    //                 informationArray.push([
    //                 childData.id,
    //                 childData.title,
    //                 childData.description
    //                    ]);
    //             });
    //             this.setState({ anArray: this.informationArray });
    //          });
    //         return (this.informationArray);
    //     }

    render() {
        // console.log('jdfjfdfj: ' + array);
        // console.log('in render in App.js');
        return (
            <StyleProvider style={getTheme(platform)}>
                <Root>
                    <Provider store={createStore(reducers)}>
                        <View style={{ flex: 1 }}>
                            <Container>
                                <Router>
                                    <Stack key='root'>

                                        <Scene key='map' component={Map} title='Map' hideNavBar={true} />
                                        <Scene key='information' component={Information} title='Information' hideNavBar={true} />
                                        <Scene key='settings' component={Settings} title='Settings' hideNavBar={false} />
                                        <Scene key='feedback' component={Feedback} title='Feedback' hideNavBar={true} />
                                        <Scene key='calendar' component={Calendar} title='Calendar' hideNavBar={true} />
                                        <Scene key='addToCal' component={addToCal} title='addToCal' hideNavBar={true} />

                                    </Stack>
                                </Router>
                                {/* <Footer /> */}
                            </Container>
                        </View>
                    </Provider>
                </Root>
            </StyleProvider>
        );
    }
}

// import React from 'react';
// import { View } from 'react-native';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import reducers from './reducers';
// import { Header } from './components/common';
// import LibraryList from './components/LibraryList';
// import Map from './components/Map';
// import TabBar from './components/TabBar';

// const App = () => {
//     return (
//         <Provider store={createStore(reducers)}>
//             <View style={{ flex: 1 }}>
//                 <Header headerText="Raukavagen" />
//                 <TabBar />
//             </View>
//         </Provider>
//     );
// };
// export default App;
