import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'antd/lib/layout';

const { Content } = Layout;

const LoginLayout = ({ children }) => (
  <Layout>
    <Content>
      {children}
    </Content>
  </Layout>
);

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginLayout;
