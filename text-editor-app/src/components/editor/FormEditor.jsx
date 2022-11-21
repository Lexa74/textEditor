import React from "react";
import { useState } from "react";
import '../editor/formEditor.css'

const dataNote = require('../../data-note.json');


// const dataNote = JSON.parse(fs.readFileSync('../../data-note.json', 'utf-8'))
// file.user1.password = 23456
// fs.writeFileSync('../../data-note.json', JSON.stringify(file, null, 2));

// const jsonString = JSON.stringify(dataNote);
// console.log(jsonString)
// localStorage.setItem('notes', jsonString)
// const jsonObj = JSON.parse(localStorage.getItem('notes'))
// console.log(jsonObj)



export const FormEditor = () => {

    // const [captionNote, setCaptionNote] = useState('');
    // const [descNote, setDescNote] = useState('')
    let id = 1;
    const createNote = () => {
        if(JSON.parse(localStorage.getItem('notes').length === 0)) {
            id = 1
        } else {
            id = 0
        }
        const valInput = document.querySelector('.create-caption').value
        const valArea = document.querySelector('.control-area').value
        let firstDataStorage = JSON.parse(localStorage.getItem('notes'))
        if(id !== 1) {
            id = JSON.parse(localStorage.getItem('notes')).length + 1;
            firstDataStorage.forEach(element => {
                if(element.id === id) {
                    id += 1
                }
            });
        } else {
            firstDataStorage = []
        }
        
        
        firstDataStorage.push({ id: id, caption: valInput, description: valArea })
        id += 1
        const jsonString = JSON.stringify(firstDataStorage)
        localStorage.setItem('notes', jsonString)
        //jsonObj = JSON.parse(localStorage.getItem('notes')) 
        document.querySelector('.notes').innerHTML = ""
        JSON.parse(localStorage.getItem('notes')).map((note) => {
            return (document.querySelector('.notes').innerHTML += `
            <div className="note" key=${note.id} data-attr=${note.id}>
            <div className="caption-note"><h2>${note.caption}</h2></div>
            <div className="content-note"> 
                <div className="description-note">
                    ${note.description}
                </div>
                <div className="control-buttons">
                    <div className="delete-note">Del</div>
                    <div className="view-note">Vi</div>
                    <div className="edit-note">Ed</div>
                </div>
            </div>
            </div>
            `)
        })
        document.querySelector('.create-caption').value = ''
        document.querySelector('.control-area').value = ''
    }

    return (
        <div className="form-editor">
            <div className="control-block">
                <input type="text" className="create-caption input-gray" placeholder="Введите заголовок" />
                <button className="create-note btn-blue" onClick={() => { createNote() }}><span>Create</span></button>
            </div>
            <textarea className="control-area" placeholder="Текст заметки"></textarea>
            <div className="notes">
                {/* {dataNote.map((note) => {
                    return (
                        <div className="note" key={note.id} data-attr={note.id}>
                            <div className="caption-note"><h2>{note.caption}</h2></div>
                            <div className="content-note">
                                <div className="description-note">
                                    {note.description}
                                </div>
                                <div className="control-buttons">
                                    <div className="delete-note">Del</div>
                                    <div className="view-note">Vi</div>
                                    <div className="edit-note">Ed</div>
                                </div>
                            </div>
                        </div>
                    )
                })} */}


                {
                    JSON.parse(localStorage.getItem('notes')) ? (
                        JSON.parse(localStorage.getItem('notes')).map((note) => {
                            return (
                                <div className="note" key={note.id} data-attr={note.id}>
                                    <div className="caption-note"><h2>{note.caption}</h2></div>
                                    <div className="content-note">
                                        <div className="description-note">
                                            {note.description}
                                        </div>
                                        <div className="control-buttons">
                                            <div className="delete-note">Del</div>
                                            <div className="view-note">Vi</div>
                                            <div className="edit-note">Ed</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : 'Хули пусто то?!'
                }
            </div>

        </div>
    )
}