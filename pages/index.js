import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DefaultLayout } from '../components/layout';
import CheckAuthed from '../components/check-authed';

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    margin: '40px 20%',
    padding: 40,
  },
};

class Home extends PureComponent {
  static propTypes = {
  };

  render() {
    return (
      <DefaultLayout>        
        <div style={styles.wrapper}>
          <CheckAuthed />
          <h1>Welcome to Admin Page of Bryllyant Site.</h1>
        </div>
      </DefaultLayout>
    );
  }
}

export default Home;
