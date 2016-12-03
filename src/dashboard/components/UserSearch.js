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
    this.handleInvitation = this.handleInvitation.bind(this);
  }
  
  state = {
    open: false,
    showInvitation: true,
  }
  
  handleClose() {
    this.setState({
      open: false,
    });
  }
  
  handleSend() {
    const { sendUserSearchQuery, loggedUserData } = this.props;
    sendUserSearchQuery(this.query.input.value, loggedUserData.id)
    
    this.setState({
      open: true,
    });
  }

  handleInvitation(userId) {
    const { sendInvitation, loggedUserData } = this.props;
    sendInvitation(loggedUserData.id, userId);
    
    this.setState({
      showInvitation: false,
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

    let items = searchResult.map(result =>
      <ListItem
        leftAvatar={<Avatar src={`../../${result.login}.jpg`} />}
        rightIconButton={result.isFriend ? null : <FlatButton style={{display: this.state.showInvitation ? 'block': 'none'}} label='Zaproś' onTouchTap={() => this.handleInvitation(result.userId)} />}
        primaryText={`${result.firstName} ${result.lastName}`}
        onTouchTap={() => this.handleRedirectToUserPage(result.userId)}
      />
    )
    
    if (!items || items === '' || items.length === 0) {
      items = <ListItem disabled={true} primaryText='Brak wyników, wpisz inną frazę...' style={{color: '#999999', textAlign: 'center'}} />
    }
    
    return (
      <div style={{paddingTop: '6px', marginRight: '0px'}}>
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
          <List style={{paddingBottom: '0'}}>
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
  loggedUserData: PropTypes.object,
  searchResult: PropTypes.array,
  location: PropTypes.object,
  sendUserSearchQuery: PropTypes.func.isRequired,
  sendInvitation: PropTypes.func.isRequired,
};

export default UserSearch;