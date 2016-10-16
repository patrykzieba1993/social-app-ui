import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AnotherTestComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Link to="/test">Klik</Link>
        <div>Test 2</div>
      </div>
    );
  }
}
