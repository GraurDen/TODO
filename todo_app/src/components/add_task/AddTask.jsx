import React, { useState } from 'react';
import styles from './AddTask.module.css';

const Add_task = (props) => {
    // Initial State
    const [userInput, setUserInput] = useState('');

    // Set input value
    const handleChange = (e) => {
        setUserInput(e.currentTarget.value);
    };

    // Add task and clear input value
    const hanldeSubmit = (e) => {
        e.preventDefault();
        props.addTask(userInput);
        setUserInput('');
    };

    // Add task on key 'Enter' press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            hanldeSubmit(e);
        }
    };

    return (
        <form onSubmit={hanldeSubmit}>
            <div className={styles.todo__input}>
                <div className={styles.todo__task}>
                    <input
                        type='text'
                        onChange={handleChange}
                        value={userInput}
                        onKeyDown={handleKeyPress}
                        placeholder='I want to...'
                        autoFocus={true}
                    />
                </div>
                <div className={styles.todo__button}>
                    <button>Add</button>
                </div>
            </div>
        </form>
    );
};

export default Add_task;
