import React from 'react';
import styles from './TodoItem.module.css';
import { useState } from 'react';

const TodoItem = (props) => {
    const [checked, setChecked] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [userInput, setUserInput] = useState(props.item.text);

    const handleChange = () => {
        setChecked(!checked);
        props.toggleTask(props.item.id);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const deactivateEditMode = () => {
        setEditMode(!editMode);
        props.editTask(props.item.id, userInput);
    };

    const handleTaskName = (e) => {
        setUserInput(e.currentTarget.value);
    };

    return (
        <div
            className={
                checked ? styles.todo__item : styles.todo__item__completed
            }>
            <div className={styles.todo__item__input}>
                <input type='checkbox' onChange={handleChange} />
            </div>

            {!editMode && (
                <div
                    className={styles.todo__item__text}
                    onClick={toggleEditMode}>
                    {userInput}
                </div>
            )}

            {editMode && (
                <div className={styles.todo_item_input}>
                    <input
                        type='text'
                        placeholder={userInput}
                        onBlur={deactivateEditMode}
                        autoFocus={true}
                        onChange={handleTaskName}
                        disabled={checked ? false : true}
                    />
                </div>
            )}

            <div className={styles.todo__item__date}>11/01/2022</div>
            <div className={styles.todo__item__del}>
                <button
                    type='button'
                    onClick={() => props.removeTask(props.item.id)}></button>
            </div>
        </div>
    );
};

export default TodoItem;
