import React, {Component, PropTypes} from 'react';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

class Notifier extends Component {
  state = {
    open: false,
    badgeVisible: true,
    badgeValue: 0,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.notification === this.props.notification) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(props) {
    const { notification } = props;
    this.setState({
      badgeValue: notification,
    });
  }

  handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { icon } = this.props;
    return (
      <div style={{float: 'right'}}>
        <Badge
          style={{padding: 0}}
          badgeContent={this.state.badgeValue}
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
            <div>Powiadomienia...Powiadomienia...</div>
            <div>Powiadomienia...Powiadomienia...</div>
            <div>Powiadomienia...Powiadomienia...</div>
            <div>Powiadomienia...Powiadomienia...</div>
          </Paper>
        </Popover>
      </div>
    );
  }
}

Notifier.propTypes = {
  icon: PropTypes.object,
  notification: PropTypes.number,
};

export default Notifier;