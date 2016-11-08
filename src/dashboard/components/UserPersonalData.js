import React, { Component, PropTypes } from 'react';

import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

class UserPersonalData extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    invitationDisplay: false,
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      invitationDisplay: !nextProps.isFriend,
    });
  }
  
  handleClick() {
    const { inviteAction } = this.props;
    inviteAction();
    this.setState({
      invitationDisplay: false,
    });
  }
  
  render() {
    const { userData } = this.props;
    const date = new Date(userData.birthDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    console.log(this.state.invitationDisplay);
    
    return (
      <Card style={{margin: '10px 0 10px 10px'}}>
        <CardMedia
          overlay={<CardTitle title={`${userData.firstName} ${userData.lastName}`} />}
        >
          <img src={`../../${userData.login}.jpg`} />
        </CardMedia>
        <CardText>
          <List>
            <ListItem
              primaryText={userData.email}
              secondaryText='Adres e-mail'
            />
            <ListItem
              primaryText={userData.sex == 'male' ? 'Meżczyzna' : 'Kobieta'}
              secondaryText='Płeć'
            />
            <ListItem
              primaryText={`${day}-${month}-${year}`}
              secondaryText='Data urodzenia'
            />
          </List>
        </CardText>
        <CardActions>
          <FlatButton
            label="Zaproś do znajomych"
            style={{display: this.state.invitationDisplay ? 'block' : 'none'}}
            onTouchTap={this.handleClick}
          />
        </CardActions>
      </Card>
    );
  }
}

UserPersonalData.PropTypes = {
  invitateAction: PropTypes.func,
  isFriend: PropTypes.bool,
  userData: PropTypes.object,
}

export default UserPersonalData;