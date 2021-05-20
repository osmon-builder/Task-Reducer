import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './Reducer/todoReducer';
import './App.css';

import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';






const init = ()=>{
    return  JSON.parse(localStorage.getItem('todos')) || []
}

export const App = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init );

    useEffect(() => {
       localStorage.setItem('todos', JSON.stringify( todos ))
    }, [todos]);

    const handleDelete = (todoId) =>{
        
        const action = {
            type: "delete",
            payload: todoId
        }
   
        dispatch(action);
    }
   
    const handleToggle = (todoId) => {

        dispatch({
            type: 'toggle',
            payload: todoId
        })
    }

    const handleAddTodo = ( newTodo) => {

       dispatch ({
            type: "add",
            payload: newTodo
        })
        
    }

    return (
        <div> 
            <h1 className="title">TodoApp ({todos.length})</h1>
            <hr/>
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        <TodoList
                            todos= {todos}
                            handleDelete= {handleDelete}
                            handleToggle= {handleToggle}
                        />
                    </div>
                        <div className="col-5">
                        <TodoAdd
                            handleAddTodo={handleAddTodo}
                        />                   
                        </div>
                </div>
            </div>
        </div>
    )
}