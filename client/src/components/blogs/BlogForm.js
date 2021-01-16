// BlogForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import BlogField from './BlogField';
import formFields from './formFields';

class BlogForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <div className="field" style={{ width: '97%' }}>
          <label >{label}</label>
          <Field
            key={name}
            component={BlogField}
            type="text"
            name={name}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div style={{ marginTop: '10px' }}>
        <form className="ui form" onSubmit={this.props.handleSubmit(this.props.onBlogSubmit)}>
          {this.renderFields()}
          <Link to="/blogs" className="red darken-4 btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal darken-2 btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'blogForm',
  destroyOnUnmount: false
})(BlogForm);
