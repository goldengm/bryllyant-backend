import React, { PureComponent } from "react";
import { Table, Icon } from 'antd';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

class PollsTable extends PureComponent {
  static propTypes = {
    token: PropTypes.string.isRequired
  };
  
  state = {
    data: [],
    columns: [
      {
        title: 'Title',
        key: 'title',
        render: (text, record) => (
          <span>
            <a onClick={(e) => this.props.selectItem(record)}>
              {record.pollContent.title}
            </a>
          </span>
        )
      },
      {
        title: 'Questions',
        key: 'questions',
        render: (text, record) => (
          <p>
            {record.pollContent.questions.map((question) => (
              <span>
                - {question.questionSentence}
                <br/>
              </span>
            ))}
          </p>
        )
      }
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
    axios.get('/api/poll').then(res => {
      self.setState({
        ...self.state,
        data: res.data.polls
      })
    }).catch(err => {
    })    
  }

  /*
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
  */
}

const mapStateToProps = state => ({
  token: state.getIn(['auth', 'token'])
});

export default connect(mapStateToProps)(PollsTable);
