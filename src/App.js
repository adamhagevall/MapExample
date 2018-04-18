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


import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Scene } from 'react-native-router-flux';
import { Container, Content } from 'native-base';
import reducers from './reducers';
import TabBar from './components/TabBar';
import NewHeader from './components/NewHeader';
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import FooterEx from './components/FooterEx';
// import FAB from './components/FAB';

import LibraryList from './components/LibraryList';
import Information from './components/pages/Information';
import Settings from './components/pages/Settings';


const App = () => {
    return (
        <Provider store={createStore(reducers)}>
            <View style={{ flex: 1 }}>
                <Container>
                    <Router>
                        <Scene key='map' component={Map} title='Map' hideNavBar={true} />
                        <Scene key='information' component={Information} title='Information' hideNavBar={false} />
                        <Scene key='settings' component={Settings} title='Settings' hideNavBar={false} />
                        {/* <Scene key='settings' component= {Settings} onRight={() => Actions.settings()} rightTitle="Settings" /> */}
                    </Router>
                    <FooterEx />
                </Container>
            </View>
        </Provider>
    );
};

export default App;
