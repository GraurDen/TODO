import style from './App.module.css';
import Header from './components/header/Header.jsx';
import AddTask from './components/add_task/AddTask.jsx';
import Options from './components/options/Options.jsx';
import TodoItem from './components/todo_item/TodoItem.jsx';
import Paginate from './components/pagination/Paginate.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

function App() {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState(todos);
    // Tasks number per page
    const [pageSize, setPageSize] = useState(5);
    // Activate filter button
    const [filterButtonBy, setFilterButtonBy] = useState('all');
    // Activate order button
    const [orderBy, setOrderBy] = useState('ask');
    // Tasks total
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    // Current page
    const [currentPage, setCurrentPage] = useState(1);

    const baseURL = 'https://todo-api-learning.herokuapp.com/v1';
    const userID = 6;

    useEffect(() => {
        getTasks();
        //setCurrentPage(Math.ceil(totalItemsCount / pageSize));
    }, [filterButtonBy, orderBy, currentPage, todos, totalItemsCount]);

    //#region FUNK

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            message.info(error.response.data.message);
        }
    );

    // Get all tasks
    const getTasks = async () => {
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
        if (response.data.tasks.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
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
        const response = await axios.post(`${baseURL}/task/${userID}`, {
            name: userInput,
            done: false,
        });
        setTodos([todos]);
    };
    // Remove task
    const removeTask = async (uuid) => {
        const response = await axios.delete(
            `${baseURL}/task/${userID}/${uuid}`
        );
        setTodos([todos]);
    };

    const showUserMessage = () => {
        message.info('Field must be filled !');
    };

    // Edit task
    const editTask = async (uuid, userText) => {
        const response = await axios.patch(
            `${baseURL}/task/${userID}/${uuid}`,
            { name: userText }
        );
        setTodos([todos]);
    };

    // Toggle task
    const toggleTask = async (uuid, status) => {
        const response = await axios.patch(
            `${baseURL}/task/${userID}/${uuid}`,
            { done: status }
        );
        setTodos([todos]);
    };

    // Set filter
    const onSetFilterBy = (status) => {
        setFilterButtonBy(status);
    };
    //#endregion

    return (
        <div className={style.container}>
            <Header task={totalItemsCount} />

            {/* Content */}
            <div className={style.todo}>
                <AddTask addTask={addTask} showUserMessage={showUserMessage} />

                {/* Кнопки */}
                <Options onOrderBy={onOrderBy} onSetFilterBy={onSetFilterBy} />

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
                <Paginate
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
