import React, { Component } from 'react';
import { 
    Text, 
    TouchableWithoutFeedback,  
    View,
    LayoutAnimation 
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Icon, Left, Right, Body, Thumbnail, Separator } from 'native-base';

var bild = require('./Assets/Bannerfbfinal.png');

class ListItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    constructor() {
        super();
        this.state = { informationExpanded: false };
        // this.state = { trackedID: null }
      }

    renderDescription() {
        const { library, expanded } = this.props;

        if (expanded) {
            return (
                <CardSection>
                    <Text style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 10, paddingBottom: 10, fontSize: 16 }}>
                    {library.description}
                    </Text>
                </CardSection>
            );
        }
    }

    renderState() {
        if (this.state.informationExpanded) {
            this.setState({ informationExpanded: false })
        }
        else {
            this.setState({ informationExpanded: true })
        }
    }

    renderInformation(selectedID) {
        if(this.state.informationExpanded) {
            this.props.selectLibrary(100)
        }
        else {
            this.props.selectLibrary(selectedID)
        }
    }

    buttonFunction(selectedID) {
        this.renderState();
        this.renderInformation(selectedID)

    }

    render() {
        const { titleStyle } = styles;
        const { id, title } = this.props.library;

        // const expandIcon = "arrow-down"
        // const shrinkIcon = "arrow-up"

        return (
            <TouchableWithoutFeedback
            onPress={() => this.buttonFunction(id)}
            >
                <View>
                
                    <CardSection>
                    
                    
                <Thumbnail source={bild} />
                        {/* <View style={{ flex: 2 }}> */}
                        <View>
                        <Text style={titleStyle}>
                        {title}
                        </Text>
                        <Text>
                            
                        </Text>
                        </View>
                     
                     
                        {/* <View style={{ flex: 1 }}> */}
                        {/* <Icon name={(this.state.informationExpanded === true) ? shrinkIcon : expandIcon} style={{ color: 'black', left: 65 }} /> */}
                        {/* </View> */}
                      
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id;

    return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem); 
