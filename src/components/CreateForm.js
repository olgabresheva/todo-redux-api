import React, {useEffect, useState} from 'react';
import '../App.css';
import {connect} from 'react-redux';
import {getList} from "../redux/actionCreator";
import axios from 'axios';

function CreateForm(props) {
    const [taskNameInput, setTaskNameInput] = useState('')
    const [taskDescriptionInput, setTaskDescriptionInput] = useState('')
    const [addTaskDisabled, setAddTaskDisabled] = useState(true);

    const newTaskDescriptionInput = (e) => {
        setTaskDescriptionInput(e.target.value);
        (taskDescriptionInput.length > 2) ? setAddTaskDisabled(false) : setAddTaskDisabled(true);
    }

    useEffect(() => {
        props.getFullList()
    }, []);

    const newTaskCreate = (name, description) => {
        axios({
            url: 'https://to-do-app-trial.herokuapp.com/todo',
            method: 'POST',
            data: {name, description},
        })
            .then(res => {
                props.getFullList()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onTaskCreate = (e) => {
        newTaskCreate(taskNameInput, taskDescriptionInput);
        setTaskNameInput('');
        setTaskDescriptionInput('')
        e.preventDefault();
        setAddTaskDisabled(true)
    }


    return (
        <div>
            <label htmlFor="exampleFormControlInput1"><strong>Your To Do List</strong></label><br/>
            <form>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control form-control-sm" value={taskNameInput}
                               placeholder="Enter Task Name"
                               onChange={e => setTaskNameInput(e.target.value)}/>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control form-control-sm" value={taskDescriptionInput}
                               placeholder="Enter Task Description"
                               onChange={newTaskDescriptionInput}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button disabled={addTaskDisabled} type="submit" className="btn btn-info btn-sm"
                                onClick={onTaskCreate}>Add Task
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getFullList: () => dispatch(getList()),
})

export default connect(null, mapDispatchToProps)(CreateForm);
