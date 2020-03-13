import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { Card, Form, Input, Button } from 'antd';

class UserForm extends PureComponent {
  static propTypes = {
    token: PropTypes.string.isRequired
  };

  state = {
    formData: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  }

  render() {
    const { email, password, firstName, lastName } = this.state.formData;

    return (
      <Card title="Create User">
        <Form
          name="formCreateUser"
          onSubmit={this.onCreate}
          style={{ }}
        >
          <Form.Item label='Email'>
            <Input placeholder='email' name='email' defaultValue={email} onChange={this.onChangeFormField} />
          </Form.Item>

          <Form.Item label='Password'>
            <Input type='password' placeholder='password' name='password' defaultValue={password} onChange={this.onChangeFormField} />
          </Form.Item>

          <Form.Item label='First Name'>
            <Input placeholder='First Name' name='firstName' defaultValue={firstName} onChange={this.onChangeFormField} />
          </Form.Item>

          <Form.Item label='Last Name'>
            <Input placeholder='Last Name' name='lastName' defaultValue={lastName} onChange={this.onChangeFormField} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }

  onChangeFormField = e => {
    let { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({
      ...this.state,
      formData
    })
  }

  onCreate = e => {
    e.preventDefault();
    var self = this;
    axios.post('/api/user', 
      {
        token: this.props.token, 
        data: this.state.formData
      }
    ).then(res => {
      if (res.data.status == 'success') {
        return;
      }
    }).catch(err => {
    })    
  }
}

const mapStateToProps = state => ({
  token: state.getIn(['auth', 'token'])
});

export default connect(mapStateToProps)(UserForm);
