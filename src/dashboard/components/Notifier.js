import React, {Component, PropTypes} from 'react';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

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
    const contents =  data.map(item => {
      let content = null;
      switch (item.type) {
        case 'post':
          if (item.active) {
            badgeCounter++;
          }
          content = `Użytkownik ${item.who.firstName} ${item.who.lastName} dodał wpis na swojej tablicy`;
          break;
        case 'comment':
          if (item.active) {
            badgeCounter++;
          }
          content = `Użytkownik ${item.who.firstName} ${item.who.lastName} dodał komentarz
                     ${item.who.login === item.whom.login ? 'do swojego wpisu' : `do wpisu użytkownika ${item.whom.firstName} ${item.whom.lastName}`}`;
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
              <span>{`Użytkownik ${item.who.firstName} ${item.who.lastName} zaprosił Cie do znajomych`}</span>
              <span><FlatButton label="Akceptuj" onTouchTap={() => this.handleAccept(item.id)} /></span>
              <span><FlatButton label="Odrzuć" onTouchTap={() => this.handleReject(item.id)} /></span>
            </div>
          break;
        default:
          content = '';
      }
      return <div>{content}</div>
    });
    
    if (usersForMessage.length > 0) {
      return {
        contents: usersForMessage.map(user => <div>
          <span>{`${user.firstName} ${user.lastName}`}</span><span style={{display: user.counter > 0 ? 'inline-block': 'none'}}>{user.counter}</span></div>),
        count: badgeCounter,
      }
    }
    
    return { contents, count: badgeCounter };
  }

  render() {
    console.log('rerender');

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
            {contents}
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