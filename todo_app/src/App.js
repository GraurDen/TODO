import style from './App.module.css';
import Header from './components/header/Header.jsx';
import AddTask from './components/add_task/AddTask.jsx';
import Options from './components/options/Options.jsx';
import TodoItem from './components/todo_item/TodoItem.jsx';
import Pagination from './components/pagination/Pagination.jsx';
import { useEffect, useState } from 'react';
// TODO: Удалить после переноса кнопок в отдельную компоненту
import styles from './components/options/Options.module.css';
import axios from 'axios';

function App() {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState(todos);
    const [orderedTodos, setOrderedTodos] = useState(filteredTodos);

    // Activate filter button
    const [filterButtonBy, setFilterButtonBy] = useState('all');

    // Activate order button
    const [orderBy, setOrderBy] = useState('ask');
    // Current page
    const [currentPage, setCurrentPage] = useState(1);
    // Tasks number per page
    const [pageSize, setPageSize] = useState(5);

    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;

    const baseURL = 'https://todo-api-learning.herokuapp.com/v1';

    useEffect(() => {
        let filteredArray = [];
        let orderedArray = [];

        const apiUrl = `${baseURL}/tasks/6`;

        axios
            .get(apiUrl, {
                params: {
                    pp: pageSize,
                    page: currentPage,
                    filterBy: filterButtonBy,
                    order: orderBy,
                },
            })
            .then((resp) => {
                const allTodos = resp.data.tasks;
                setTodos(allTodos);
            });

        // // *
        // if (filterButtonBy === 'all') {
        //     filteredArray = todos;
        // }
        // // *
        // if (filterButtonBy === 'done') {
        //     filteredArray = todos;
        // }
        // // *
        // if (filterButtonBy === 'undone') {
        //     filteredArray = todos;
        // }

        // if (orderBy === 'descending') {
        //     orderedArray = todos;
        // }

        // if (orderBy === 'ascending') {
        //     orderedArray = todos;

        // }

        // if (filteredArray.length <= 5) {
        //     setCurrentPage(1);
        // }
        // if (filteredArray.length === 0) {
        //     onSetFilterBy('all');
        // }

        // setOrderedTodos(orderedArray);
        // setFilteredTodos(todos);
    }, [filterButtonBy, orderBy, currentPage]);

    console.log('filterButtonBy >> ', filterButtonBy);
    //#region FUNK
    // Set current page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Order by...
    const onOrderBy = (order) => {
        setOrderBy(order);
    };

    // addTask
    const addTask = (userInput) => {
        if (userInput !== '') {
            axios.post(`${baseURL}/task/6`, { name: userInput, done: false });
        }
    };

    // Remove task
    // const removeTask = (id) => {
    //     setTodos([...todos.filter((item) => item.id !== id)]);
    // };

    // Edit task
    // const editTask = (id, userText) => {
    //     setTodos([
    //         ...todos.map((item) =>
    //             item.id === id ? { ...item, text: userText } : { ...item }
    //         ),
    //     ]);
    // };

    // Toggle task
    // const toggleTask = (id) => {
    //     setTodos([
    //         ...todos.map((item) =>
    //             item.id === id
    //                 ? { ...item, complete: !item.complete }
    //                 : { ...item }
    //         ),
    //     ]);
    // };

    const onSetFilterBy = (text) => {
        setFilterButtonBy(text);
        setCurrentPage(1);
    };
    //#endregion
    return (
        <div className={style.container}>
            <Header task={todos.length} />

            {/* Content */}
            <div className={style.todo}>
                <AddTask addTask={addTask} />

                {/* Кнопки */}
                <Options
                    filterButtonBy={filterButtonBy}
                    orderBy={orderBy}
                    onOrderBy={onOrderBy}
                    onSetFilterBy={onSetFilterBy}
                />

                {/* Items */}
                <div className={style.todo__items}>
                    {todos.slice(firstIndex, lastIndex).map((item) => {
                        return (
                            <TodoItem
                                item={item}
                                key={item.uuid}
                                // removeTask={removeTask}
                                // toggleTask={toggleTask}
                                // editTask={editTask}
                            />
                        );
                    })}
                </div>

                <Pagination
                    paginate={paginate}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    lastIndex={lastIndex}
                    totalItemsCount={filteredTodos.length}
                />
            </div>
        </div>
    );
}

export default App;
