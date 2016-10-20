import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class PostCard extends Component {
  constructor() {
    super();
  }

  state = {
    expanded: true,
  }

  handleExpandChange(state) {
    this.setState({
      expanded: state
    });
  }
  
  render() {
    return (
      <Paper zDepth='1' style={{width: '50%', margin: '0 auto', marginTop: '8px'}}>
        <Card expanded={this.state.expanded} onExpandChange={(state) => this.handleExpandChange(state)}>
          <CardHeader
            title={this.props.post.text}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            komenty...
          </CardText>
          <CardActions>
          </CardActions>
        </Card>
      </Paper>
    );
  }
}

export default PostCard;