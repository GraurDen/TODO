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

    // Activate filter button
    const [isFilterButtonActive, setFilterButtonActive] = useState('all');
    // Activate sort button
    const [isSortButtonActive, setSortButtonActive] = useState('');
    // Current page
    const [currentPage, setCurrentPage] = useState(1);

    // Tasks number per page
    const [pageSize] = useState(5);

    const [totalItemsCount, setTotalItemsCount] = useState(todos.length);
    const [totalItemsCount2, setTotalItemsCount2] = useState(totalItemsCount);

    // Set current page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;

    //totalItemsCount = todos.length;

    // Total count of pages
    const pagetTotal = Math.ceil(totalItemsCount / pageSize);

    useEffect(() => {
        setFilteredTodos(todos);
        setSortedTodos(sortedTodos);
        setTotalItemsCount(todos.length);
        setCurrentPage(currentPage);
    }, [todos]);

    console.log('totalItemsCount - ' + totalItemsCount);
    //#region FUNK

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

    // Количество тасок
    const sdsd = (array) => {
        return array.map((item) => item.complete === true).length;
    };

    // Filter by status
    const filterByCompleteStatus = (completeStatus) => {
        if (completeStatus === 'all') {
            setFilteredTodos(todos);
            setFilterButtonActive('all');
            setTotalItemsCount(todos.length);
        } else if (completeStatus === true) {
            setFilteredTodos([
                ...todos.filter((item) => item.complete === true),
            ]);
            setFilterButtonActive('done');

            setTotalItemsCount2(sdsd(filteredTodos));
            // totalItemsCount2 = filteredTodos.map(
            //     (item) => item.complete === true
            // ).length;

            //setCurrentPage(Math.ceil(sdsd(filteredTodos) / pageSize));
            setCurrentPage(1);
            console.log('тек стр ' + Math.ceil(sdsd(filteredTodos) / pageSize));
        } else {
            setFilteredTodos([
                ...todos.filter((item) => item.complete === false),
            ]);
            setFilterButtonActive('undone');
        }
    };

    // sorting by Descending
    const filterByDescending = () => {
        setSortedTodos([
            ...filteredTodos.sort(compareNumbersDes).map((item) => item),
        ]);
        setSortButtonActive('descending');
    };

    // sorting by Ascending
    const filterByAscending = () => {
        setSortedTodos([
            ...filteredTodos.sort(compareNumbersAsk).map((item) => item),
        ]);
        setSortButtonActive('ascending');
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

    //#endregion

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
                            onClick={() => filterByCompleteStatus('all')}>
                            all
                        </button>
                        <button
                            className={
                                isFilterButtonActive === 'done'
                                    ? styles.btn_active_underline
                                    : undefined
                            }
                            onClick={() => filterByCompleteStatus(true)}>
                            done
                        </button>
                        <button
                            className={
                                isSortButtonActive === 'undone'
                                    ? styles.btn_active_underline
                                    : undefined
                            }
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
                    totalItemsCount={totalItemsCount}
                    pagetTotal={pagetTotal}
                />
            </div>
        </div>
    );
}

export default App;
