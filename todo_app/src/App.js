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
    //const [orderedTodos, setOrderedTodos] = useState(filteredTodos);

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

    useEffect(() => {
        getTasks();
    }, [filterButtonBy, orderBy, currentPage, todos]);

    const baseURL = 'https://todo-api-learning.herokuapp.com/v1';
    const userID = 6;
    const apiUrl = `${baseURL}/tasks/${userID}`;

    const getTasks = async () => {
        try {
            const response = await axios.get(apiUrl, {
                params: {
                    pp: pageSize,
                    page: currentPage,
                    filterBy: filterButtonBy,
                    order: orderBy,
                },
            });
            setFilteredTodos(response.data.tasks);
        } catch (error) {
            console.log(error);
        }
    };
    console.log('filterButtonBy >> ', filterButtonBy);
    console.log('filteredTodos >>> ', filteredTodos);
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
    const addTask = async (userInput) => {
        try {
            const response = await axios.post(apiUrl, {
                name: userInput,
                done: false,
            });
            console.log(response.data);
            setTodos([todos]);
        } catch (error) {
            console.log(error);
        }
    };

    // Remove task
    const removeTask = async (uuid) => {
        try {
            const response = await axios.delete(
                `${baseURL}/task/${userID}/${uuid}`
            );
            setTodos([todos]);
        } catch (error) {
            console.log(error);
        }
    };

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
                    {filteredTodos.slice(firstIndex, lastIndex).map((item) => {
                        return (
                            <TodoItem
                                item={item}
                                key={item.uuid}
                                removeTask={removeTask}
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
                    //totalItemsCount={filteredTodos.length}
                />
            </div>
        </div>
    );
}

export default App;
