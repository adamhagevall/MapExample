import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';

// 57.640661, 18.288623 ny arena koord
const availabilityArena = {
    description: 'Tillgänglighetsarenan',
    geometry: { location: { lat: 57.640699, lng: 18.288784 } }
};
const Donnersplats = {
    description: 'Donnersplats',
    geometry: { location: { lat: 57.639033, lng: 18.291397 } }
};
const Storatorget = {
    description: 'Stora torget',
    geometry: { location: { lat: 57.640659, lng: 18.295976 } }
};
const stHansplan = {
    description: 'S:t Hansplan',
    geometry: { location: { lat: 57.638585, lng: 18.293005 } }
};
const Almedalsscenen = {
    description: 'Almedalsscenen',
    geometry: { location: { lat: 57.639914, lng: 18.290777 } }
};
const scandicHotel = {
    description: 'Scandic Visby',
    geometry: { location: { lat: 57.632362, lng: 18.279776 } }
};
const toilets = {
    description: 'Tillgängliga toaletter',
    geometry: { location: { lat: 57.6402041, lng: 18.2892483 } }
};
const parkingLots = {
    description: 'Parkeringsplats',
    geometry: { location: { lat: 57.637762, lng: 18.287965 } }
};

export default class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            currentPosition: {
                description: 'Din position',
                geometry: { location: { lat: 57, lng: 18, } },
            },
        };
    };

    componentWillMount() {
        console.log('Searchbar component will mount');
        Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    currentPosition: { //tillagt currentPosition
                        description: 'Din position',
                        geometry: { location: { lat: position.coords.latitude, lng: position.coords.longitude } }
                    }
                });
                console.log(this.state);
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    sendDetails(details) {
        this.props.callbackFromParent({ latitude: details.lat, longitude: details.lng });
    }

    clearText(text) {
        console.log(text)
        this.props.resetCallback(text);
    }

    render() {
        let label = this.props.placeholder;
        return (
            <GooglePlacesAutocomplete
                placeholder={label}
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'default'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed={this.props.booleanFromParent}    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    { this.componentWillMount(), this.sendDetails(details.geometry.location) };
                }
                }
                getDefaultValue={() => ''}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyAVoFdCevwg5QcC11Kzn3AOKS_UcGFgvMk',
                    language: 'sv' // language of the results
                }}
                textInputProps={{
                    onChangeText: (text) => { this.clearText(text) }
                }}
                styles={{
                    textInputContainer: {
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backgroundColor: 'white',
                        marginLeft: '3%',
                        marginRight: '22%',
                        marginTop: '5%',
                        borderColor: 'lightgrey',
                        borderTopWidth: 0,
                        borderBottomWidth: 2,
                        borderWidth: 1
                    },
                    textInput: {
                        marginLeft: '-0.2%',
                        marginRight: '-0.3%',
                        marginTop: '-3.5%',
                        borderColor: 'lightgrey',
                        borderWidth: 1
                    },
                    listView: {
                        height: 190,
                        width: '93.2%',
                        marginLeft: '3.3%',
                        marginTop: '10%',
                        borderColor: 'lightgray',
                    },
                    description: {
                        fontWeight: 'bold',
                        position: 'relative',
                    },
                    predefinedPlacesDescription: {
                        // color: '#1faadb'
                        color: 'black'
                        //position: 'absolute'
                        //backgroundColor: 'blue'
                    },
                }}

                //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                //currentLocationLabel="Current location"
                nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food'
                }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                predefinedPlaces={[this.state.currentPosition, availabilityArena, Donnersplats, Storatorget, stHansplan, Almedalsscenen, scandicHotel, toilets, parkingLots]}
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
            //   renderRightButton={() => <Text>Custom text after the input</Text>}

            />
        );
    }
}

// // import React, { Component } from 'react';
// // import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
// // export default class SearchBar extends Component {
// //     render() {
// //         return (
// //                 <Header searchBar rounded>
// //                     <Item>
// //                         <Icon name="ios-search" />
// //                         <Input placeholder="Search" />
// //                         <Icon name="ios-people" />
// //                     </Item>
// //                     <Button transparent>
// //                         <Text>Search</Text>
// //                     </Button>
// //                 </Header>
// //         );
// //     }
// // }

// import React, { Component } from 'react';
// import { View, Image } from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Geolocation from 'react-native-geolocation-service';

// const availabilityArena = {
//     description: 'Tillgänglighetsarenan',
//     geometry: { location: { lat: 57.641380, lng: 18.292853 } }
// };
// const scandicHotel = {
//     description: 'Scandic Visby',
//     geometry: { location: { lat: 57.6317496, lng: 18.2800916 } }
// };
// const toilets = {
//     description: 'Tillgängliga toaletter',
//     geometry: { location: { lat: 57.6402041, lng: 18.2892483 } }
// };
// const parkingLots = {
//     description: 'Parkeringsplats',
//     geometry: { location: { lat: 57.6376372, lng: 18.288044 } }
// };

// export default class SearchBar extends Component {
//     constructor() {
//         super();
//         this.state = {
//             currentPosition: {
//                 description: 'Din position',
//                 geometry: { location: { lat: 57, lng: 18, } },
//             },
//         };
//     };

//     componentWillMount() {
//         console.log('Searchbar component will mount');
//         Geolocation.getCurrentPosition(
//             position => {
//                 this.setState({
//                     currentPosition: {
//                         geometry: { location: { lat: position.coords.lat, lng: position.coords.lng} }
//                     }
//                 })
//                 console.log(this.state);
//             },
//             (error) => console.log(error.message),
//             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
//         );
//     }

//     someFunction(details) {
//         this.props.callbackFromParent({longitude: details.lng, latitude: details.lat});
//     }

//     render() {

//         let label = this.props.placeholder;

//         return (
//             <GooglePlacesAutocomplete
//                 placeholder={label}
//                 minLength={2} // minimum length of text to search
//                 autoFocus={false}
//                 returnKeyType={'default'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//                 listViewDisplayed={false}    // true/false/undefined
//                 fetchDetails={true}
//                 renderDescription={row => row.description} // custom description render
//                 onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
//                     {this.someFunction(details.geometry.location)};
//                 }
//             }

//                 getDefaultValue={() => ''}

//                 query={{
//                     // available options: https://developers.google.com/places/web-service/autocomplete
//                     key: 'AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ',
//                     language: 'sv', // language of the results
//                     types: 'address' // default: 'geocode'
//                 }}

//                 styles={{
//                     textInputContainer: {
//                         width: '100%',
//                     },
//                     description: {
//                         fontWeight: 'bold'
//                     },
//                     predefinedPlacesDescription: {
//                         color: '#1faadb'
//                     }
//                 }}

//                 //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
//                 //currentLocationLabel="Current location"
//                 nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
//                 GoogleReverseGeocodingQuery={{
//                     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
//                 }}
//                 GooglePlacesSearchQuery={{
//                     // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
//                     rankby: 'distance',
//                     types: 'food'
//                 }}

//                 filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
//                 predefinedPlaces={[this.state.currentPosition, availabilityArena, scandicHotel, toilets, parkingLots]}

//                 debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
//             //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
//             //   renderRightButton={() => <Text>Custom text after the input</Text>}

//             />
//         );
//     }
// }
