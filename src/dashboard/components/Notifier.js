import React, {Component, PropTypes} from 'react';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

class Notifier extends Component {
  constructor() {
    super();
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.prepareItems = this.prepareItems.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.hideItem = this.hideItem.bind(this);
  }
  
  state = {
    open: false,
    badgeVisible: true,
    badgeValue: 0,
    contents: [],
    showItem: true,
    data: [],
    notification: 0,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showItem != nextState.showItem) {
      return true;
    }
    if ((nextProps.data !== this.props.data || nextState.open !== this.state.open)) {
      return true;
    }
    if (nextProps.notification !== this.props.notification) {
      return true;
    }
   
    return false;
  }

  componentWillReceiveProps(props) {
    const { data, notification } = props;
    
    this.setState({
      data,
      notification
    });
  }

  componentWillMount() {
    const { fetcher, location } = this.props;
    fetcher(location.id);
  }

  componentWillUpdate() {
    
  }
  
  handleAccept(id) {
    const { sendAccept } = this.props;
    sendAccept(id);
    // this.hideItem();
  }
  
  handleReject(id) {
    const { sendReject } = this.props;
    sendReject(id);
    // this.hideItem();
  }
  
  hideItem() {
    this.setState({
      showItem: false,
      contents: this.state.contents,
    });
  }
  
  handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
    
    const { fetcher, location } = this.props;
    fetcher(location.id);
  };

  handleRequestClose = () => {
    const { inactivate, location } = this.props;
    inactivate(location.id);
    this.setState({
      open: false,
    });
  };

  prepareItems = (data) => {
    // to refactor!!!
    const usersForMessage = [];
    let badgeCounter = 0;
    let contents =  data.map(item => {
      let content = null;
      switch (item.type) {
        case 'post':
          if (item.active) {
            badgeCounter++;
          }
          content =
            <div>
              <ListItem
                primaryText={`Użytkownik ${item.who.firstName} ${item.who.lastName} dodał wpis na swojej tablicy` }
                leftAvatar={<Avatar style={{top: '0', bottom: '0', margin: 'auto' }} src={`../../${item.who.login}.jpg`} /> }
                style={{ fontSize: '12px' }}
              />
              <Divider inset={true} />
            </div>
          break;
        case 'comment':
          if (item.active) {
            badgeCounter++;
          }
          content =
            <div>
              <ListItem
              primaryText={ `Użytkownik ${item.who.firstName} ${item.who.lastName} dodał komentarz
                       ${item.who.login === item.whom.login ? 'do swojego wpisu' : `do wpisu użytkownika ${item.whom.firstName} ${item.whom.lastName}`}` }
              leftAvatar={<Avatar style={{top: '0', bottom: '0', margin: 'auto' }} src={`../../${item.who.login}.jpg`} /> }
              style={{ fontSize: '12px' }}
              />
              <Divider inset={true} />
            </div>
          break;
        case 'message':
          if (item.active) {
            badgeCounter++;
          }
          let user = usersForMessage.find(user => user.login == item.who.login);

          if (!user) {
            usersForMessage.push({
              firstName: item.who.firstName,
              lastName: item.who.lastName,
              login: item.who.login,
              counter: item.active ? 1 : 0,
            })
          } else {
            if (item.active) {
              user.counter++;  
            }
          }
          break;
        case 'friendship':
          if (item.active) {
            badgeCounter++;
          }
          content =
            <div>
              <ListItem
                primaryText={`Użytkownik ${item.who.firstName} ${item.who.lastName} zaprosił Cie do znajomych`}
                leftAvatar={ <Avatar src={`../../${item.who.login}.jpg`} /> }
                disabled={true}
                secondaryText={
                  <div style={{height: '22px', textAlign: 'right' }}>
                    <RaisedButton
                     secondary={true}
                      buttonStyle={{height: '20px', lineHeight: '20px'}} 
                      style={{height: '20px', marginRight: '20px' }}
                      labelStyle={{fontSize: '12px'}}
                      label="Akceptuj" 
                      onTouchTap={() => this.handleAccept(item.id)} 
                    />
                    <RaisedButton 
                      buttonStyle={{height: '20px', lineHeight: '20px'}} 
                      style={{height: '20px'}}
                      labelStyle={{fontSize: '12px'}}
                      label="Odrzuć" 
                      onTouchTap={() => this.handleReject(item.id)} 
                    />
                  </div>
                }
                style={{fontSize: '12px'}}
              />
            </div>
          break;
        default:
          content = '';
      }
      return <div>{content}</div>
    });
    
    if (usersForMessage.length > 0) {
      return {
        contents: usersForMessage.map(user =>
          <div>
            <ListItem
              primaryText={`${user.firstName} ${user.lastName}`}
              leftIcon={<Badge 
                secondary={true} badgeContent={user.counter} 
                badgeStyle={{display: user.counter > 0 ? 'inline-flex': 'none'}} 
                style={{padding: '0'}}
                />}
              rightAvatar={<Avatar src={`../../${user.login}.jpg`} />}
              style={{fontSize: '15px'}}
            />
            <Divider inset={true} />
          </div>
        ),
        count: badgeCounter,
      }
    }
    
    if (!contents || contents === '' || contents.length === 0) {
      contents = <ListItem
        primaryText="Brak powiadomień..."
        style={{color: '#999999', textAlign: 'center', cursor: 'default'}}
        disabled={true}
      />
    }
    
    return { contents, count: badgeCounter };
  }

  render() {
    const { contents, count } = this.prepareItems(this.state.data);
    
    const badgeValue = count + this.state.notification;
    
    const { icon } = this.props;
    return (
      <div style={{float: 'right'}}>
        <Badge
          style={{padding: 0}}
          badgeContent={badgeValue}
          badgeStyle={{display: badgeValue > 0 ? 'flex': 'none'}}
          secondary={true}
        >
          <IconButton onTouchTap={this.handleTouchTap}>
            {icon}
          </IconButton>
        </Badge>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          animated={false}
          canAutoPosition={true}
          style={{width: '33%'}}
        >
          <Paper zDepth="1">
            <List style={{paddingTop: '0px', paddingBottom: '0px', overflow: 'scroll', maxHeight: '400px'}}>
              {contents}
            </List>
          </Paper>
        </Popover>
      </div>
    );
  }
}

Notifier.propTypes = {
  location: PropTypes.object,
  icon: PropTypes.object,
  notification: PropTypes.number,
  data: PropTypes.array,
  fetcher: PropTypes.func,
  inactivate: PropTypes.func,
  sendAccept: PropTypes.func,
  sendReject: PropTypes.func,
};

export default Notifier;