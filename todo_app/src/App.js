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
    const [sortedTodos, setSortedTodos] = useState(filteredTodos);

    // Current page
    const [currentPage, setCurrentPage] = useState(1);

    // Tasks number per page
    const [pageSize] = useState(5);

    // Set current page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        console.log(pageNumber);
    };

    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - currentPage;

    useEffect(() => {
        setFilteredTodos(todos);
        setSortedTodos(sortedTodos);
    }, [todos]);

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

    // Filter by status
    const filterByCompleteStatus = (completeStatus) => {
        if (completeStatus === 'all') {
            setFilteredTodos(todos);
        } else {
            setFilteredTodos([
                ...todos.filter((item) => item.complete === completeStatus),
            ]);
        }
    };

    // sorting by Descending
    const filterByDescending = () => {
        setSortedTodos([
            ...filteredTodos.sort(compareNumbersDes).map((item) => item),
        ]);
    };

    // sorting by Ascending
    const filterByAscending = () => {
        setSortedTodos([
            ...filteredTodos.sort(compareNumbersAsk).map((item) => item),
        ]);
    };

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
                            className={`${styles.all} ${styles.btn_active_underline}`}
                            onClick={() => filterByCompleteStatus('all')}>
                            all
                        </button>
                        <button
                            className={styles.one}
                            onClick={() => filterByCompleteStatus(true)}>
                            done
                        </button>
                        <button
                            className={styles.undone}
                            onClick={() => filterByCompleteStatus(false)}>
                            undone
                        </button>
                    </div>

                    <div className={styles.todo__options__right}>
                        <div className={styles.todo__options__name}>
                            Sort by Date
                        </div>
                        <div className={styles.todo__options_sort}>
                            <button
                                className={styles.new}
                                onClick={() => filterByDescending()}></button>
                            <button
                                className={`${styles.last} ${styles.btn_active_bg}`}
                                onClick={() => filterByAscending()}></button>
                        </div>
                    </div>
                </div>

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

                <Pagination
                    todos={todos}
                    paginate={paginate}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    lastIndex={lastIndex}
                    firstIndex={firstIndex}
                />
            </div>
        </div>
    );
}

export default App;
