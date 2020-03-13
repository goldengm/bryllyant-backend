import React, { PureComponent } from 'react';
import { LoginLayout } from '../components/layout';
import LoginForm from '../components/login-form';

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    margin: '40px 20%',
    padding: 40,
  },
};

// eslint-disable-next-line react/prefer-stateless-function
class Login extends PureComponent {
  render() {
    return (
      <LoginLayout>
        <div style={styles.wrapper}>
          <LoginForm />
        </div>
      </LoginLayout>
    );
  }
}

export default Login;
