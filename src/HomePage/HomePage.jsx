import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout'
import { } from '../_actions';
import { Commissioning } from '../Commissioning';
import { Commands } from '../Commands';
import { Trends } from '../Trends';
import { Wifi } from '../Wifi';
import { commissioningActions } from '../_actions'
import { Settings } from '../Settings';

class HomePage extends React.Component {

    componentDidMount() {
        this.props.getCommissioningData()
    }

    render() {

        return(
            <Layout selected={this.props.match.params.id}>
                {
                    this.props.match.params.id ?
                        this.props.match.params.id === 'Commissioning' ? <Commissioning /> :
                            this.props.match.params.id === 'Commands' ? <Commands /> :
                                this.props.match.params.id === 'Trends' ? <Trends /> : 
                                    this.props.match.params.id === 'Wifi' ? <Wifi /> :
                                        this.props.match.params.id === 'Settings' ? <Settings /> : <Settings />
                    : <Commissioning />
                }
            </Layout>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => ({
    getCommissioningData: () => {
        dispatch(commissioningActions.getCommissioningData()) 
    }
})

const connectedHomePage = connect(null, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };