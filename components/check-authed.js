import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Router from "next/router";

class CheckAuthed extends PureComponent {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { isAuthed } = this.props;

    if (!isAuthed) {
      Router.push("/login");
    }
  }

  render() {
    return <></>;
  }
}

const mapStateToProps = state => ({
  isAuthed: state.getIn(["auth", "isAuthed"])
});

export default connect(mapStateToProps, null)(CheckAuthed);
