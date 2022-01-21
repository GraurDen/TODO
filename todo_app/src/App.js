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
    const [sortedTodos, setSortedTodos] = useState(filteredTodos);

    // Activate filter button
    const [isFilterButtonActive, setFilterButtonActive] = useState('all');
    // Activat e sort button
    const [isSortButtonActive, setSortButtonActive] = useState('');
    // Current page
    const [currentPage, setCurrentPage] = useState(1);
    // Tasks number per page
    const [pageSize] = useState(5);

    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;

    const [appState, setAppState] = useState([]);

    useEffect(() => {
        // let filteredArray = [];
        // let filteredArray2 = [];

        // if (isSortButtonActive === 'descending') {
        //     filteredArray2 = todos.sort(compareNumbersDes).map((item) => item);
        // }
        // if (isSortButtonActive === 'ascending') {
        //     filteredArray2 = todos.sort(compareNumbersAsk).map((item) => item);
        // }

        // if (isFilterButtonActive === 'all') {
        //     filteredArray = todos;
        // }
        // // TODO: Сократить
        // if (isFilterButtonActive === 'Done') {
        //     filteredArray = todos.filter((item) => item.complete === true);
        // }
        // if (isFilterButtonActive === 'Undone') {
        //     filteredArray = todos.filter((item) => item.complete === false);
        // }

        // if (filteredArray.length <= 5) {
        //     setCurrentPage(1);
        // }
        // if (filteredArray.length === 0) {
        //     setTest('all');
        // }

        // setSortedTodos(filteredArray2);
        // setFilteredTodos(filteredArray);
        const apiUrl =
            'https://todo-api-learning.herokuapp.com/v1/tasks/6?pp=20';
        axios.get(apiUrl).then((res) => {
            const appState = res.data;
            setAppState(appState);
        });
    }, [setAppState]);

    //#region FUNK
    // Set current page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // sorting by Descending
    const filterByDescending = () => {
        setSortButtonActive('descending');
    };

    // sorting by Ascending
    const filterByAscending = () => {
        setSortButtonActive('ascending');
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

    // Create date
    const createDate = () => {
        return new Date().toLocaleDateString();
    };

    // Sorting functions
    function compareNumbersAsk(a, b) {
        return a.sortingIndex - b.sortingIndex;
    }
    function compareNumbersDes(a, b) {
        return b.sortingIndex - a.sortingIndex;
    }

    // TODO: Изменить название
    const setTest = (text) => {
        setFilterButtonActive(text);
        setCurrentPage(1);
    };
    //#endregion
    console.log(appState);
    return (
        <div className={style.container}>
            <Header task={todos.length} />

            {/* Content */}
            <div className={style.todo}>
                <AddTask addTask={addTask} />

                {/* <Options /> */}

                <div className={styles.todo__options}>
                    <div className={styles.todo__options__left}>
                        <button
                            className={
                                isFilterButtonActive === 'all'
                                    ? styles.btn_active_underline
                                    : undefined
                            }
                            onClick={() => setFilterButtonActive('all')}>
                            all
                        </button>
                        <button
                            className={
                                isFilterButtonActive === 'Done'
                                    ? styles.btn_active_underline
                                    : undefined
                            }
                            onClick={() => setTest('Done')}>
                            done
                        </button>
                        <button
                            className={
                                isFilterButtonActive === 'Undone'
                                    ? styles.btn_active_underline
                                    : undefined
                            }
                            onClick={() => setTest('Undone')}>
                            undone
                        </button>
                    </div>

                    <div className={styles.todo__options__right}>
                        <div className={styles.todo__options__name}>
                            Sort by Date
                        </div>
                        <div className={styles.todo__options_sort}>
                            <button
                                className={`${styles.descending} ${
                                    isSortButtonActive === 'descending'
                                        ? styles.btn_active_bg
                                        : undefined
                                }`}
                                onClick={() => filterByDescending()}></button>
                            <button
                                className={`${styles.ascending} ${
                                    isSortButtonActive === 'ascending'
                                        ? styles.btn_active_bg
                                        : undefined
                                }`}
                                onClick={() => filterByAscending()}></button>
                        </div>
                    </div>
                </div>

                {/* Items */}
                <div className={style.todo__items}>
                    {appState.map((item) => {
                        return (
                            <TodoItem
                                item={item}
                                //key={item.id}
                                //removeTask={removeTask}
                                //toggleTask={toggleTask}
                                //editTask={editTask}
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
