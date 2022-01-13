import style from './App.module.css';
import Header from './components/header/Header.jsx';
import AddTask from './components/add_task/AddTask.jsx';
import Options from './components/options/Options.jsx';
import TodoItem from './components/todo_item/TodoItem.jsx';
import Pagination from './components/pagination/Pagination.jsx';
import { useState } from 'react';

function App() {
    const [todos, setTodos] = useState([]);

    // addTask
    const addTask = (userInput) => {
        if (userInput) {
            const newItem = {
                id: Math.random().toString(10).substr(2, 8),
                complete: false,
                text: userInput,
            };
            setTodos([...todos, newItem]);
        }
    };

    // Remove task
    const removeTask = (id) => {
        setTodos([...todos.filter((item) => item.id !== id)]);
    };

    // Toggle addTask
    const toggleTask = (id) => {
        setTodos([
            ...todos.map((item) =>
                item.id === id
                    ? { ...item, complete: !item.complete }
                    : { ...item }
            ),
        ]);
    };

    return (
        <div className={style.container}>
            <Header task={todos.length} />

            {/* Content */}
            <div className={style.todo}>
                <AddTask addTask={addTask} />

                <Options />

                <div className={style.todo__items}>
                    {todos.map((item) => {
                        return (
                            <TodoItem
                                item={item}
                                key={item.id}
                                removeTask={removeTask}
                                toggleTask={toggleTask}
                            />
                        );
                    })}
                </div>

                <Pagination />
            </div>
        </div>
    );
}

export default App;
