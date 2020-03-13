import React, { PureComponent } from 'react';
import { DefaultLayout } from '../components/layout';
import CheckAuthed from '../components/check-authed';
import UsersTable from '../components/users-table';
import UserForm from '../components/user-form';

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    margin: '40px 40px',
    padding: 40,
  },
};

// eslint-disable-next-line react/prefer-stateless-function
class Users extends PureComponent {
  state = {
    showForm: true,
    reloadTable: false
  }
  render() {
    return (
      <DefaultLayout>
        <CheckAuthed />
        <div style={styles.wrapper}>
          {this.state.showForm ?
            <div 
              style={{
                overflow: 'hidden'
              }}
            >
              <div 
                style={{
                  width: 'calc(100% - 320px)', float: 'left'
                 }}
              >
                <UsersTable />
              </div>
              <div 
                style={{
                  width: '300px', float: 'right'
                 }}
              >
                <UserForm />
              </div>
            </div>
          :
            <>
              <UsersTable />
            </>
          }
        </div>
      </DefaultLayout>
    );
  }
}

export default Users;
