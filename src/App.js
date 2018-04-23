import React, { Component } from 'react';
import { View, PermissionsAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Scene } from 'react-native-router-flux';
import { Container, Content } from 'native-base';
import reducers from './reducers';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import FAB from './components/FAB';
import Map from './components/pages/Map';
import Information from './components/pages/Information';
import Settings from './components/pages/Settings';
import Feedback from './components/pages/Feedback';
import Calendar from './components/pages/Calendar';


export default class App extends Component {

    constructor() {
        super();
        this.state = { showFooter: true }
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
                console.log("Location access denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    componentWillMount() {
        this.requestLocationsPermission();
    }

    noFooterCallback = (noFooter) => {
        console.log(noFooter);
        this.setState({ showFooter: noFooter });
    };

    renderFooter() {
        if (this.state.showFooter) {
            return <Footer />
        }
    }

    render() {
        return (
            <Provider store={createStore(reducers)}>
                <View style={{ flex: 1 }}>
                    <Container>
                        <Router>
                            <Scene key='map' component={Map} title='Map' hideNavBar={true} />
                            <Scene key='information' component={Information} title='Information' hideNavBar={true} />
                            <Scene key='settings' component={Settings} title='Settings' hideNavBar={false} />
                            <Scene key='feedback' component={Feedback} title='Feedback' hideNavBar={false} />
                            <Scene key='calendar' component={Calendar} title='Calendar' hideNavBar={false} />
                        </Router>
                        <Footer />
                    </Container>
                </View>
            </Provider>

        );
    };
}
// callbackFromParent={this.noFooterCallback}
// {this.renderFooter()};
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



