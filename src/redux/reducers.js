const initialState = {
    tasks: [
        {_id: 1, name: 'Task-1', description: 'Desc-1', done: true},
        {_id: 2, name: 'Task-2', description: 'Desc-2', done: false},
        {_id: 3, name: 'Task-3', description: 'Desc-3', done: false},
    ]
}

const task = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_LIST':
            return {
                ...state,
                tasks: action.payload
            };

        default:
            return state;
    }
};

export default task;