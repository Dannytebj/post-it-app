import React, { Component } from 'react';
import superagent from 'superagent';
import PropTypes from 'prop-types';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddingUser: false,
            userAdded: false
        };
        this.addUser = this.addUser.bind(this);
    }
    addUser() {
        this.setState({
            isAddingUser: true
        });
        console.log({ userId: this.props.user.id , groupId: this.props.user.groups.groupId });
        let groupId = this.props.user.groups.groupId;
        superagent
            .post(`https://postitdanny.herokuapp.com/group/${groupId}/users`)
            .send({ userId: this.props.user.id , groupId: this.props.user.groupId })
            .end((error, response) => {
                if (error) {
                    this.setState({
                        isAddingUser: false,
                        fetchMessage: 'Error Adding User'
                    });
                    return;
                }
                this.setState({
                    isAddingUser: false,
                    fetchMessage: 'Successfully Added',
                    userAdded: true
                });
            })
    }
    createUserAddButton(isLoading) {
        return isLoading ? <span>Loading</span> : <span id="add" onClick={this.addUser}> + </span>;
    }
    render() {
        const { user } = this.props;
        const { userAdded, isAddingUser } = this.state;
        return (<li>
            {user.name}
            { (!userAdded) ? this.createUserAddButton(isAddingUser) : ''}
        </li>);
    }
}

User.propTypes = {
    user: PropTypes.object.isRequired
}

export default User;
