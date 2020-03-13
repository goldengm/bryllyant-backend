import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Card from "antd/lib/card";
import { authSuccess } from "../redux/actions/auth";
import { Form, Input, Button, Checkbox } from "antd";
import axios from 'axios';
import Router from 'next/router'

class LoginForm extends PureComponent {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    authSuccess: PropTypes.func.isRequired
  };
  state = {
    formData: {
      email: '',
      password: ''
    }
  }

  render() {
    const {
      isAuthed,
      token,
      authSuccess
    } = this.props;
    
    if (token) {
      Router.push('/');
    }
    const { email, password } = this.state.formData;

    return (
      <Card title="Login">
        <Form
          name="formLogin"
          onSubmit={this.onTryLogin}
          style={{
            width: '220px',
            margin: '0 auto'
          }}
        >
          <Form.Item>
            <Input placeholder='email' name='email' defaultValue={email} onChange={this.onChangeFormField} />
          </Form.Item>

          <Form.Item>
            <Input type='password' placeholder='password' name='password' defaultValue={password} onChange={this.onChangeFormField} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }

  onChangeFormField = e => {
    let { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({
      ...this.state,
      formData
    })
  }

  onTryLogin = e => {
    e.preventDefault();
    var self = this;
    axios.post('/api/admin/login', this.state.formData).then(res => {
      if (res.data.status == 'success') {
        self.props.authSuccess({
          token: res.data.token
        });
        return;
      }
      alert('Your emai/password is incorrect')
    }).catch(err => {
      alert('Error during login')
    })    
  }
}

const mapStateToProps = state => ({
  isAuthed: state.getIn(['auth', 'isAuthed']),
  token: state.getIn(['auth', 'token'])
});

export default connect(mapStateToProps, { authSuccess })(LoginForm);
