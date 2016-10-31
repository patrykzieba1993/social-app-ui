import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

class UserSearch extends Component {
  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleRedirectToUserPage = this.handleRedirectToUserPage.bind(this);
  }
  
  state = {
    open: false,
  }
  
  handleClose() {
    this.setState({
      open: false,
    });
  }
  
  handleSend() {
    const { sendUserSearchQuery, location } = this.props;
    sendUserSearchQuery(this.query.input.value, location.id)
    
    this.setState({
      open: true,
    });
  }

  handleRedirectToUserPage(id) {
    const { router } = this.context;
    router.push(`/dashboard/page/${id}`);
    this.handleClose();
  }
  
  render() {
    const { searchResult } = this.props;
    const actions = [
      <FlatButton
        label="Powrót"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    const items = searchResult.map(result =>
      <ListItem
        leftAvatar={<Avatar src={`../../${result.login}.jpg`} />}
        rightIconButton={result.isFriend ? null : <FlatButton label='Zaproś' />}
        primaryText={`${result.firstName} ${result.lastName}`}
        onTouchTap={() => this.handleRedirectToUserPage(result.userId)}
      />
    )
    
    return (
      <div style={{paddingTop: '6px', marginRight: '25px'}}>
        <TextField
          hintText="Wyszukaj osobe..."
          style={{background: '#fff', height: '36px', width: '356px', borderRadius: '5px 0 0 5px'}}
          underlineStyle={{borderBottom: 'none'}}
          hintStyle={{top: '6px', bottom: '0', marginLeft: '5px'}}
          inputStyle={{marginLeft: '5px'}}
          underlineFocusStyle={{display: 'none'}}
          ref={c => this.query = c}
        />
        <RaisedButton
          label="Szukaj"
          secondary={true}
          onTouchTap={this.handleSend}
        />
        <Dialog
          title="Wyniki wyszukiwania"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <List>
            { items }
          </List>
        </Dialog>
      </div>
    );
  }
}

UserSearch.contextTypes = {
  router: PropTypes.object,
};

UserSearch.PropTypes = {
  searchResult: PropTypes.array,
  location: PropTypes.object,
  sendUserSearchQuery: PropTypes.func.isRequired,
};

export default UserSearch;