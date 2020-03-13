import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { Card, Form, Input, Button, Icon } from 'antd';

class PollDetailForm extends PureComponent {
  static propTypes = {
    token: PropTypes.string.isRequired
  };

  state = {
  }

  render() {
    const { selectedItem } = this.props;

    return (
      <Card title="Poll Detail">
        <div style={{ overflow: 'hidden' }}>
          <Button 
            type='primary' 
            onClick={() => this.props.openCreateForm()} 
          >
            <Icon type="plus-square" theme="twoTone" />&nbsp;New
          </Button>
          <Button 
            type='danger' 
            onClick={() => this.deletePoll()} 
            style={{ float: 'right' }}
          >
            Delete
          </Button>
        </div>
        <div>
          <h3>{selectedItem.pollContent.title}</h3>
          <h4>Questions:</h4>
          <ol>
            {selectedItem.pollContent.questions.map((question) => (
              <li>{question.questionSentence}</li>
            ))}
          </ol>
          <h4>Users:</h4>
          <table>
            <tbody>
            {selectedItem.byUsers.map((byUser, keyIndex) => (
              <tr key={'byUsers-row'+keyIndex}>
                <td>{byUser.user.firstName} {byUser.user.lastName}</td>
                <td>
                  {byUser.answers ?
                    byUser.answers.map((answer, keyIndex2) => (
                      <p key={'answers-'+keyIndex+'-'+keyIndex2}>
                        <span>{answer.questionSentence}</span>&nbsp;
                        <strong>{answer.answer}</strong>
                      </p>
                    ))
                  :
                    <Button onClick={() => this.sendPollTo(byUser.user.id, selectedItem.pollContent.id)}>Send</Button>
                  }
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Card>
    )
  }

  sendPollTo = (userId, pollContentId) => {
    console.log('userId=');
    console.log(userId, pollContentId);
    var self = this;
    axios.post('/api/poll/send', 
      {
        token: this.props.token, 
        data: {
          pollContentId: pollContentId,
          userIds: [userId]
        }        
      }
    ).then(res => {
      if (res.data.status == 'success') {
        // return;
      }
      console.log(res.data);
      self.props.openCreateForm()
    }).catch(err => {
      console.log(err)
    })    
  }

  deletePoll = () => {
    const { selectedItem } = this.props;
    var self = this;
    axios.post('/api/poll/delete-content', 
      {
        token: this.props.token, 
        pollContentId: selectedItem.pollContent.id
      }
    ).then(res => {
      if (res.data.status == 'success') {
        return;
      }
      self.props.openCreateForm()
    }).catch(err => {
    })    
  }

}

const mapStateToProps = state => ({
  token: state.getIn(['auth', 'token'])
});

export default connect(mapStateToProps)(PollDetailForm);
