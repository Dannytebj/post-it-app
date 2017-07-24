import React, { Component } from 'react';
import superagent from 'superagent';
// import UserStore from '../../../stores/UserStore';
// import viewActions from '../../../actions/viewActions';
import GroupList from './groupList/'
import Navigator from '../../navigation';

// const { fetchGroups } = Groups;
class MessageBoard extends Component{
     constructor(props) {
        super(props);
        this.state = {
            groupList:[],
            isFetchingData: false,
            fetchMessage:''
        };
        this._onChange = this._onChange.bind(this);
        this.fetchGroups = this.fetchGroups.bind(this);
    }

    _onChange() {
        this.forceUpdate();
    }
    componentDidMount() {
        window.addEventListener('load', this.fetchGroups);
    }
      fetchGroups(){
        this.setState({
            isFetchingData: true
        });
        const userUid = localStorage.getItem('uid');
        superagent
            .get(`https://postitdanny.herokuapp.com/getGroup/${userUid}/`)
            .end(
                (error, response) => {
                    if (error) {
                        console.log(error);
                        this.setState({
                            isFetchingData: false,
                            fetchMessage: 'Error fetching Data'
                    });
                    return;
                }
                this.setState({
                    isFetchingData: false,
                    groupList: JSON.parse(response.text),
                    fetchMessage: 'Successfully Loaded'
                });
                }
            )
    }
render(){
    const { groupList, isFetchingData, fetchMessage} = this.state;
    if (isFetchingData){
        return <span>Loading!!!</span>
    }
    return(
        <div>
            <Navigator/>
            <div className="page-content">
            <h1>Welcome to Message Board</h1>
            <div className="form">
            <GroupList groupList={groupList} />
            </div>
             {fetchMessage}
            </div>
        </div>
    )
}
}
module.exports = MessageBoard;