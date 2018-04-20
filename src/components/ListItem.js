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
import { Icon } from 'native-base';


class ListItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    //tillagt
    constructor() {
        super();
        this.state = { informationExpanded: false };
      }

    renderDescription() {
        const { library, expanded } = this.props;

        if (expanded) {
            return (
                <CardSection>
                    <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                    {library.description}
                    </Text>
                </CardSection>
            );
        }
    }

    //tillagt
    renderIcon() {
        console.log("in renderIcon")
        if (this.state.informationExpanded) {
            this.setState({ informationExpanded: false })
        }
        else {
            this.setState({ informationExpanded: true })
        }
    }

    renderInformation(selectedID) {
        console.log("in renderInformation")
        console.log("Current state of informationExpanded: "+this.state.informationExpanded)
        console.log("current id: "+selectedID)

        if(this.state.informationExpanded) {
            this.props.selectLibrary(100)
            console.log("this information is already expanded!")
        }
        else {
            this.props.selectLibrary(selectedID)
            console.log("Vanliga funtionen selectLibrary")
        }
    }

    buttonFunction(selectedID) {
        this.renderIcon();
        this.renderInformation(selectedID)
    }

    render() {
        const { titleStyle } = styles;
        const { id, title } = this.props.library;

        //tillagt
        const expandIcon = "arrow-down"
        const shrinkIcon = "arrow-up"

        return (
            <TouchableWithoutFeedback
             //   onPress={() => this.props.selectLibrary(id) && this.setState({ informationExpanded: true })}
            // onPress={() => this.props.selectLibrary(id) && this.renderIcon()}
            // onPress={() => this.renderIcon() && this.renderInformation(id)}
            onPress={() => this.buttonFunction(id)}


            >
                <View>
                    <CardSection>
                        <Text style={titleStyle}>
                        {title}
                        </Text>
                        {/* <Icon name= "arrow-down" style={{ color: 'black', left: 200 }} /> */}  
                        <Icon name={(this.state.informationExpanded === true) ? shrinkIcon : expandIcon} style={{ color: 'black', left: 200 }} />
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
        paddingLeft: 15
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id;

    return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem); 
