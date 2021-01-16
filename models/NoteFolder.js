const mongoose = require('mongoose');
const { Schema } = mongoose;

const note = new Schema({
    title: String,
    editor_name: String,
    content: String,
    time: String
});

const folder = new Schema({
    email: String,
    folder_name: String,
    notes: [note]
});

const Folder = module.exports = mongoose.model('Folder', folder);

// find the folder by folder name and send list of its notes
module.exports.getNotes = async (email, f_name) => {
    const res = await Folder.findOne({ email: email, folder_name: f_name });
    return res.notes;
}

// add new note in a folder
module.exports.appendNotes = async (email, note, f_name, username, time) => {
    data_obj = {
        title: note.title,
        editor_name: username,
        content: note.content,
        time
    }
    let res = await Folder.findOne({ email, folder_name: f_name });
    if (!res) {
        res = await Folder.addNewFolder(email, f_name);
    }
    res.notes.push(data_obj);
    return res.save()
        .then(doc => {
            // console.log('new note created:', doc)
            return doc;
        })
        .catch(err => {
            // console.log('error after save:', err)
        });
}

// add a new folder
module.exports.addNewFolder = async (email, f_name) => {
    data = {
        email,
        folder_name: f_name,
        notes: []
    }
    const res = await new Folder(data);
    return res.save()
        .then(doc => {
            console.log('new folder created:', doc)
            return doc;
        })
        .catch(err => {
            console.log('error after save:', err)
        });
}

// return list of folders
module.exports.fetch_folder_list = async (email) => {
    const res = await Folder.find({ email })
    console.log('lists:', res)
    return res;
}

// delete note
module.exports.delete_note = async (email, folder_name, title) => {
    const res = await Folder.findOne({ email, folder_name });
    var i = 0;
    for (i = 0; i < res.notes.length; i++) {
        if (res.notes[i].title == title) {
            console.log('matched');
            res.notes.splice(i, 1);
            break;
        }
    }
    return res.save()
        .then(doc => {
            console.log('new folder created:', doc)
            return doc;
        })
        .catch(err => {
            console.log('error after save:', err)
        });

}