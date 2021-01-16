import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addFolder, fetchFolderList, delete_folder } from '../../actions/index'
import { Modal, Header} from 'semantic-ui-react'

class NoteFolderList extends Component {
    state = { open: false }
    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    componentDidMount() {
        this.props.fetchFolderList()
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const folder_name = event.target.folder_name.value;
        event.target.folder_name.value = ''
        this.close()
        this.props.addFolder(folder_name, this.props.history)
    }
    renderFolderList() {
        const val = this.props.folders.map(({ folder_name, notes }) => {
            const addr = '/notes/' + folder_name;
            return (
                <div class="item" style={{ height: '60px', verticalAlign: 'middle' }}>
                    <i class="large open folder middle aligned icon"></i>
                    <div class="content" style={{ fontSize: '15px' }}>
                        <Link to={addr} class="header">{folder_name}</Link>
                        <div class="description grey-text text-darken-2" style={{ fontFamily: 'cursive', marginTop: '3px', fontWeight: '500' }} >
                            Contains {notes.length} files in total
                            <i class="trash icon right" onClick={() => this.props.delete_folder(folder_name)}></i>
                        </div>
                    </div>
                </div>
            )
        })
        return val;
    }

    render() {
        const { open} = this.state
        return (
            <div>
                <div class="ui relaxed divided list" style={{ marginTop: '20px' }}>
                    {this.renderFolderList()}
                </div>
                <div className="fixed-action-btn">
                    <button onClick={this.show} className="btn-floating btn-large red" id='create_folder'>
                        <i className="material-icons">add</i>
                    </button>
                </div>
                <Modal
                    open={open} onClose={this.close}
                    basic size='small'
                    style={{ marginLeft: '25%' }}>
                    <Header>Create New Folder</Header>
                    <Modal.Content>
                        <form className='ui form' onSubmit={this.handleSubmit}>
                            <div className="field" >
                                <input name="folder_name" type="text" placeholder='New Folder Name' style={{ width: '90%', paddingTop: '1px', paddingBottom: '1px' }} />
                            </div>
                            <button id="create" class="ui button right" style={{ marginBottom: '10px' }} type="submit">Create</button>
                        </form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }

};

const mapStateToProps = ({ folders }) => {
    return { folders };
}

export default connect(mapStateToProps, { addFolder, fetchFolderList, delete_folder })(NoteFolderList); 