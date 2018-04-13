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
import reducers from './reducers';
import { Header } from './components/common';
import LibraryList from './components/LibraryList';
import Map from './components/Map';
import TabBar from './components/TabBar';
import NewHeader from './components/NewHeader';
import SearchBar from './components/SearchBar';
import FooterEx from './components/FooterEx';
// import FAB from './components/FAB';

const App = () => {
    return (
        <Provider store={createStore(reducers)}>
            <View style={{ flex: 1 }}>
                <NewHeader />
                <SearchBar />
                <TabBar />
                {/* <FooterEx /> */}
                
            </View>
        </Provider>
    );
};

export default App;
