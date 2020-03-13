import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { Card, Form, Input, Button } from 'antd';

class PollCreateForm extends PureComponent {
  static propTypes = {
    token: PropTypes.string.isRequired
  };

  state = {
    formData: {
      title: '',
      questions: []
    }
  }

  render() {
    const { title, questions } = this.state.formData;

    return (
      <Card title="Create Poll">
        <Form
          name="formCreateUser"
          onSubmit={this.onCreate}
          style={{ }}
        >
          <Form.Item label='Title'>
            <Input placeholder='title' name='title' defaultValue={title} onChange={this.onChangeFormField} />
          </Form.Item>
          {questions.map((question, keyIndex) => (
            <Form.Item label={'Question '+(keyIndex+1)}>
              <Input defaultValue={question.questionSentence}
                onChange={e => this.onChangeQuestions(e, keyIndex)} />
            </Form.Item>
          ))}
          <Form.Item>
            <Button style={{ width: '200px'}} onClick={() => this.addQuestion()}>
              + Add Question
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '200px' }}>
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

  onChangeQuestions = (e, keyIndex) => {
    let { questions } = this.state.formData;
    questions[keyIndex]['questionSentence'] = e.target.value;
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        questions
      }
    })
  }

  addQuestion = () => {
    let { questions } = this.state.formData;
    questions.push({
      questionSentence: ''
    });
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        questions
      }
    })
  }

  onCreate = e => {
    e.preventDefault();
    var self = this;
    axios.post('/api/poll/content', 
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

export default connect(mapStateToProps)(PollCreateForm);
