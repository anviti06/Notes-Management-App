import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { fetchNotes, delete_note, share_note } from '../../actions';
import { Modal, Header } from 'semantic-ui-react'

class BlogList extends Component {
  state = { open: false, note_id: 0 }
  show = (event) => {
    this.setState({ open: true, note_id: event.target.id })
  }
  close = () => this.setState({ open: false })
  folder_name = window.location.pathname.split('/').pop();
  componentDidMount() {
    this.props.fetchNotes(this.folder_name);

  }

  renderBlogs() {
    if (this.props.notes.length) {
      let count = -1;
      return map(this.props.notes, note => {
        count++;
        return (
          <div className="card darken-1 horizontal" key={count}>
            <div className="card-stacked">
              <div className="card-content">
                <div className="card-title">
                  {note.title}
                  <i className="icon share right small" id={count} onClick={this.show}></i>
                </div>
                <p>{note.content}</p>
              </div>
              <div className="card-action">
                <div style={{ fontSize: '15px', fontFamily: 'cursive', color: 'grey' }}>
                  Created By: {note.editor_name}  ||  Updated On: {note.time}
                  <i class="icon trash right" onClick={() => this.props.delete_note(this.folder_name, note.title)}></i>

                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h4>No Notes Here!!!</h4>
      </div>;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let emails = event.target.folder_name.value;
    event.target.folder_name.value = ''
    emails = emails.split(',').map(email => email.trim())
    this.props.share_note(emails, this.props.notes[this.state.note_id])
    this.close()
  }

  render() {
    return <div>
      <div>{this.renderBlogs()}</div>
      <Modal
        open={this.state.open} onClose={this.close}
        basic size='small'
        style={{ marginLeft: '25%' }}>
        <Header>Share With...</Header>
        <Modal.Content>
          <form className='ui form' onSubmit={this.handleSubmit}>
            <div className="field" >
              <input name="folder_name" type="text" placeholder="Email Id's" style={{ width: '90%', paddingTop: '1px', paddingBottom: '1px' }} />
            </div>
            <button id="create" class="ui button right" style={{ marginBottom: '10px' }} type="submit">Share</button>
          </form>
        </Modal.Content>
      </Modal>
    </div>;
  }
}

function mapStateToProps({ notes }) {
  return { notes };
}

export default connect(mapStateToProps, { fetchNotes, delete_note, share_note })(BlogList);
