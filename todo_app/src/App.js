import style from './App.module.css';
import Header from './components/header/Header.jsx';
import AddTask from './components/add_task/AddTask.jsx';
import Options from './components/options/Options.jsx';
import TodoItem from './components/todo_item/TodoItem.jsx';
import Pagination from './components/pagination/Pagination.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState(todos);

    // Activate filter button
    const [filterButtonBy, setFilterButtonBy] = useState('all');
    // Activate order button
    const [orderBy, setOrderBy] = useState('ask');
    // Current page
    const [currentPage, setCurrentPage] = useState(1);
    // Tasks number per page
    const [pageSize, setPageSize] = useState(5);
    // Tasks total
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    const baseURL = 'https://todo-api-learning.herokuapp.com/v1';
    const userID = 6;

    useEffect(() => {
        getTasks();
        totalItemsCount <= 5 && setCurrentPage(1);
    }, [filterButtonBy, orderBy, currentPage, todos, totalItemsCount]);

    //#region FUNK

    // Get all tasks
    const getTasks = async () => {
        try {
            const response = await axios.get(`${baseURL}/tasks/${userID}`, {
                params: {
                    pp: pageSize,
                    page: currentPage,
                    filterBy: filterButtonBy !== '' ? filterButtonBy : '',
                    order: orderBy,
                },
            });
            setFilteredTodos(response.data.tasks);
            setTotalItemsCount(response.data.count);
        } catch (error) {
            console.log(error);
        }
    };
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
            const response = await axios.post(`${baseURL}/task/${userID}`, {
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
    const editTask = async (uuid, userText) => {
        try {
            const response = await axios.patch(
                `${baseURL}/task/${userID}/${uuid}`,
                { name: userText }
            );
            setTodos([todos]);
        } catch (error) {
            console.log(error);
        }
    };

    // Toggle task
    const toggleTask = async (uuid, status) => {
        try {
            const response = await axios.patch(
                `${baseURL}/task/${userID}/${uuid}`,
                { done: status }
            );
            setTodos([todos]);
            console.log(' status >>', status);
        } catch (error) {
            console.log(error);
        }
    };

    // Set filter
    const onSetFilterBy = (text) => {
        setFilterButtonBy(text);
    };
    //#endregion
    return (
        <div className={style.container}>
            <Header task={totalItemsCount} />

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
                    {filteredTodos.map((item) => {
                        return (
                            <TodoItem
                                item={item}
                                key={item.uuid}
                                removeTask={removeTask}
                                toggleTask={toggleTask}
                                editTask={editTask}
                            />
                        );
                    })}
                </div>

                {/* Pagination */}
                <Pagination
                    paginate={paginate}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    totalItemsCount={totalItemsCount}
                />
            </div>
        </div>
    );
}

export default App;
