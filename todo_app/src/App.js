import style from './App.module.css';
import Header from './components/header/Header.jsx';
import AddTask from './components/add_task/AddTask.jsx';
import Options from './components/options/Options.jsx';
import TodoItem from './components/todo_item/TodoItem.jsx';
import Pagination from './components/pagination/Pagination.jsx';
import { useEffect, useState } from 'react';
// TODO: Удалить после переноса кнопок в отдельную компоненту
import styles from './components/options/Options.module.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState(todos);
    const [orderedTodos, setOrderedTodos] = useState(filteredTodos);

    // Activate filter button
    const [filterButtonBy, setFilterButtonBy] = useState('all');
    // Activate order button
    const [orderBy, setOrderBy] = useState('');
    // Current page
    const [currentPage, setCurrentPage] = useState(1);
    // Tasks number per page
    const [pageSize] = useState(5);

    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;

    useEffect(() => {
        let filteredArray = [];
        let orderedArray = [];

        if (orderBy === 'descending') {
            orderedArray = todos.sort(orderByAsc).map((item) => item);
        }
        if (orderBy === 'ascending') {
            orderedArray = todos.sort(orderByDesc).map((item) => item);
        }
        if (filterButtonBy === 'all') {
            filteredArray = todos;
        }
        if (filterButtonBy === 'Done') {
            filteredArray = todos.filter((item) => item.complete === true);
        }
        if (filterButtonBy === 'Undone') {
            filteredArray = todos.filter((item) => item.complete === false);
        }
        if (filteredArray.length <= 5) {
            setCurrentPage(1);
        }
        if (filteredArray.length === 0) {
            onSetFilterBy('all');
        }

        setOrderedTodos(orderedArray);
        setFilteredTodos(filteredArray);
    }, [todos, filterButtonBy, orderBy, currentPage]);

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
        if (userInput) {
            const newItem = {
                id: Math.random().toString(10).substr(2, 8),
                complete: false,
                text: userInput,
                date: createDate(),
                sortingIndex: new Date(),
            };
            setTodos([...todos, newItem]);
        }
    };

    // Remove task
    const removeTask = (id) => {
        setTodos([...todos.filter((item) => item.id !== id)]);
    };

    // Edit task
    const editTask = (id, userText) => {
        setTodos([
            ...todos.map((item) =>
                item.id === id ? { ...item, text: userText } : { ...item }
            ),
        ]);
    };

    // Toggle task
    const toggleTask = (id) => {
        setTodos([
            ...todos.map((item) =>
                item.id === id
                    ? { ...item, complete: !item.complete }
                    : { ...item }
            ),
        ]);
    };

    // Create date
    const createDate = () => {
        return new Date().toLocaleString();
    };

    function orderByAsc(a, b) {
        return a.sortingIndex - b.sortingIndex;
    }
    function orderByDesc(a, b) {
        return b.sortingIndex - a.sortingIndex;
    }

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
                                key={item.id}
                                removeTask={removeTask}
                                toggleTask={toggleTask}
                                editTask={editTask}
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
