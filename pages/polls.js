import React, { PureComponent } from 'react';
import { DefaultLayout } from '../components/layout';
import CheckAuthed from '../components/check-authed';
import PollsTable from '../components/polls-table';
import PollCreateForm from '../components/poll-create-form';
import PollDetailForm from '../components/poll-detail-form';

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    margin: '40px 20px',
    padding: 40,
    overflow: 'hidden'
  },
};

// eslint-disable-next-line react/prefer-stateless-function
class Polls extends PureComponent {
  state = {
    selectedItem: null
  }
  render() {
    const { selectedItem } = this.state;
    return (
      <DefaultLayout>
        <CheckAuthed />
        <div style={styles.wrapper}>
          <div 
            style={{
              float: 'left', width: '500px'
            }}
          >
            <PollsTable selectItem={(item) => this.selectItem(item)} />
          </div>
          <div 
            style={{
              float: 'right', width: 'calc(100% - 520px)'
            }}
          >
            {selectedItem==null?
              <PollCreateForm />
            :
              <PollDetailForm 
                openCreateForm={() => this.openCreateForm()} 
                selectedItem={selectedItem}
              />
            }
          </div>
        </div>
      </DefaultLayout>
    );
  }
  selectItem = (item) => {
    this.setState({
      ...this.state,
      selectedItem: item
    })
  }
  openCreateForm = () => {
    this.setState({
      ...this.state,
      selectedItem: null
    })
  }
}

export default Polls;
