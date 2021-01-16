// BlogFormReview shows users their form inputs for review
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class BlogFormReview extends Component {
  renderFields() {
    const { formValues } = this.props;

    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name} className="content">
          <label style={{ fontSize: '15px', marginBottom: '5px' }}>{label}:</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  }

  renderButtons() {
    const { onCancel } = this.props;

    return (
      <div>
        <button
          className="orange darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button className="green darken-3 btn-flat right white-text">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const { submitBlog, history, formValues, auth } = this.props;
    const folder_name = window.location.pathname.split('/').pop();
    submitBlog(formValues, history, folder_name, auth.displayName);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} style={{ marginTop: '20px' }}>
        <h5>Please confirm your entries</h5>
        <div class="ui card" style={{ width: '100%', marginTop: '20px' }}>
          {this.renderFields()}
        </div>

        <div style={{ marginTop: '20px' }}>
          {this.renderButtons()}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.blogForm.values,
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(withRouter(BlogFormReview));
