import React, { PureComponent } from "react";
import { Table, Icon } from 'antd';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

class UsersTable extends PureComponent {
  static propTypes = {
    token: PropTypes.string.isRequired
  };
  
  state = {
    data: [],
    columns: [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName'
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a data-id={record.id} onClick={() => this.deleteUser(record.id)}>Delete</a>
          </span>
        ),
      },
    ]
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { columns, data } = this.state;    

    return (
      <div>
        <p style={{ textAlign: 'right' }}>
          <a onClick={this.loadData}>
            <Icon type="reload" />
          </a>
        </p>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }

  loadData = () => {
    var self = this;
    axios.get('/api/user', this.state.formData).then(res => {
      self.setState({
        ...self.state,
        data: res.data.users
      })
    }).catch(err => {
    })    
  }

  deleteUser = (userId) => {
    if (confirm('Are you delete this user?')) {
      var self = this;
      axios.post('/api/user/delete', 
        {
          token: this.props.token,
          userId
        }
      ).then(res => {
        if (res.data.status == 'success') {
          return;
        }
        self.loadData();
      }).catch(err => {
      })   
    }
  }
}

const mapStateToProps = state => ({
  token: state.getIn(['auth', 'token'])
});

export default connect(mapStateToProps)(UsersTable);
