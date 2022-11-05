import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";


const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
    const [todos, dispatch] = useReducer(todoReducer, [],init);
    localStorage.setItem('todos',JSON.stringify( todos ));
    useEffect(() => {
        console.log(todos)
    }, [todos])
    

    const handNewTodo = (todo) => {
        const action = {
            type : '[TODO] Add Todo]',
            payload : todo,
        }
        dispatch(action);
    }

    const handDeleteTodo = (id) => {
        dispatch({
            type : '[TODO] Remove Todo]',
            payload : id,
        });
        // dispatch(action);
    }

    const handToggleTodo = (id) => {
        dispatch({
            type : '[TODO] Toggle Todo]',
            payload : id,
        });
    }

    const todosCount =() => {
        return todos.length

    }
    const pendingTodosCount = () => {
        return todos.filter(todo => !todo.done).length

    }

    return {
        todos,
        handDeleteTodo,
        handNewTodo,
        handToggleTodo,
        pendingTodosCount:pendingTodosCount(),
        todosCount:todosCount(),
    }
}
