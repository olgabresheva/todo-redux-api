import React, {useEffect} from 'react';
import '../App.css';
import {connect} from 'react-redux';
import ListItem from "./ListItem";
import {getList} from "../redux/actionCreator";
import axios from 'axios';

function List(props) {

    useEffect(() => {
        props.getFullList()
    }, []);

    const taskDelete = (id) => {
        axios({
            url: `https://to-do-app-trial.herokuapp.com/todo/${id}`,
            method: 'DELETE',
        })
            .then(res => {
                props.getFullList()
            })
            .catch(e => console.log(e))
    };

    const statusChange = (id, state) => {
        axios({
            url: `https://to-do-app-trial.herokuapp.com/todo/${id}`,
            method: 'PUT',
            data: {done: !state},
        })
            .then(res => {
                props.getFullList()
            })
            .catch(e => console.log(e))
    };

    const taskEditSave = (id, newTitle, newDesc) => {
        axios({
            url: `https://to-do-app-trial.herokuapp.com/todo/${id}`,
            method: 'PATCH',
            data: {name: newTitle, description: newDesc}
        })
            .then(res => {
                props.getFullList()
            })
            .catch(e => e.target.value)
    }

        return (
            <div className="List">
                {props.taskList.map(el => <li key={el._id}>
                    <ListItem item={el}
                              taskDelete={taskDelete}
                              statusChange={statusChange}
                              taskEditSave={taskEditSave}/>
                </li>)}
            </div>
        );
    }

    const mapStateToProps = (state) => ({
        taskList: state.tasks,
    })

    const mapDispatchToProps = (dispatch) => ({
        getFullList: () => dispatch(getList()),
    })

export default connect(mapStateToProps, mapDispatchToProps)(List);
