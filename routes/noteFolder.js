const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('User')

const Folder = mongoose.model('Folder');

module.exports = app => {

    app.post('/api/add_folder', requireLogin, async (req, res) => {
        const { folder_name } = req.body;
        const { email } = req.user;
        const response = await Folder.addNewFolder(email, folder_name);
        res.send(response);
    });

    app.get('/api/fetch_folder_list', requireLogin, async (req, res) => {
        const { email } = req.user;
        const response = await Folder.fetch_folder_list(email);
        res.send(response)
    })

    app.post('/api/add_notes', requireLogin, async (req, res) => {
        const { form_values, folder_name, username } = req.body;
        const { email } = req.user;
        const time = new Date().toISOString().slice(0, 10)
        const response = await Folder.appendNotes(email, form_values, folder_name, username, time);
        res.send(response);
    })

    app.get('/api/fetch_notes', requireLogin, async (req, res) => {
        const { folder_name } = req.query;
        const { email } = req.user;
        const response = await Folder.getNotes(email, folder_name);
        res.send(response);

    })

    app.post('/api/delete_folder', requireLogin, async (req, res) => {
        const { folder_name } = req.body;
        const { email } = req.user;
        await Folder.findOneAndDelete({ email, folder_name });
        const response = await Folder.fetch_folder_list(email)
        res.send(response)
    })

    app.post('/api/delete_note', requireLogin, async (req, res) => {
        const { folder_name, note_title } = req.body;
        const { email } = req.user;
        const response = await Folder.delete_note(email, folder_name, note_title);
        console.log('after delete note', response);
        res.send(response);
    })


    app.post('/api/share_note', requireLogin, async (req, res) => {

        // async (email, note, f_name, username) => {
        //     data = {
        //         title: note.title,
        //         editor_name: username,
        //         content: note.content,
        //         time: new Date().toISOString().slice(0, 10)
        //     }


        const { emails, note } = req.body;
        const { title, editor_name, content, time } = note
        let arr = [];
        for (let i = 0; i < emails.length; i++) {
            const email = emails[i];
            const result = await User.findOne({ email })
            if (result)
                await Folder.appendNotes(email, { title, content }, 'share', editor_name, time);
            else {
                console.log('email not present:', email);
                arr.push(email)
            }
        }
        res.send(arr);
    })



};
