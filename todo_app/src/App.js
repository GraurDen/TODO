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
    const [pageSize] = useState(5);
    // Activate filter button
    const [filterButtonBy, setFilterButtonBy] = useState('');
    // Activate order button
    const [orderBy, setOrderBy] = useState('asc');
    // Tasks total
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    // Current page
    const [currentPage, setCurrentPage] = useState(1);

    const baseURL = 'http://localhost:5000/api';

    useEffect(() => {
        getTasks();
    }, [filterButtonBy, orderBy, currentPage, todos, totalItemsCount]);

    //#region FUNK

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            const res = error.request.response;
            message.error(res);
        }
    );

    // Get all tasks
    const getTasks = async () => {
        const response = await axios.get(`${baseURL}/todos`, {
            params: {
                pp: pageSize,
                page: currentPage,
                sortBy: filterButtonBy !== '' ? filterButtonBy : '',
                orderBy: orderBy,
            },
        });
        setFilteredTodos(response.data.rows);
        setTotalItemsCount(response.data.count);
        if (response.data.count === 0 && currentPage > 1) {
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
        await axios.post(`${baseURL}/todo`, {
            name: userInput,
            done: false,
        });
        setTodos([todos]);
    };
    // Remove task
    const removeTask = async (uuid) => {
        await axios.delete(`${baseURL}/todo/${uuid}`);
        setTodos([todos]);
    };

    const showUserMessage = () => {
        message.info('Field must be filled !');
    };

    // Edit task
    const editTask = async (uuid, userInput) => {
        const response = await axios.patch(`${baseURL}/todo/${uuid}`, {
            name: userInput,
        });
        console.log('response >>> ', response);
        setTodos([todos]);
    };

    // Toggle task
    const toggleTask = async (uuid, status) => {
        await axios.patch(`${baseURL}/todo/${uuid}`, {
            done: status,
        });
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
                                key={item.id}
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
