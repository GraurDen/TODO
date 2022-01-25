import React from 'react';
import styles from './TodoItem.module.css';
import { useState, useEffect } from 'react';

const TodoItem = (props) => {
    const { item, editTask, removeTask, toggleTask } = props;

    const [editMode, setEditMode] = useState(false);
    const [userInput, setUserInput] = useState(item.name);

    // Change task status
    const handleChange = () => {
        toggleTask(item.uuid, !item.done);
    };

    // Toggle task to 'edit mode'
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    // Deactivate 'edit mode' and update task name
    const deactivateEditMode = () => {
        setEditMode(!editMode);
        editTask(item.uuid, userInput);
    };

    // Set new task name
    const handleTaskName = (e) => {
        setUserInput(e.currentTarget.value);
    };

    // Discard changes input 'onBlur' and on 'Esc' click
    const discardChanges = (e) => {
        let keyCode = e.keyCode;
        if (keyCode === 27) {
            setUserInput(item.name);
            e.target.blur();
        }
        if (keyCode === 13) {
            setUserInput(e.currentTarget.value);
            e.target.blur();
        }
    };

    return (
        <div
            className={
                item.done ? styles.todo__item__completed : styles.todo__item
            }>
            {/* Checkbox */}
            <div className={styles.todo__item__input}>
                <input
                    type='checkbox'
                    onChange={handleChange}
                    checked={item.done}
                />
            </div>

            {/* User input */}
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
                        disabled={item.done ? true : false}
                        onKeyDown={discardChanges}
                    />
                </div>
            )}

            {/* Creates at */}
            <div className={styles.todo__item__date}>{item.createdAt}</div>

            {/* Delete */}
            <div className={styles.todo__item__del}>
                <button type='button' onClick={() => removeTask(item.uuid)} />
            </div>
        </div>
    );
};

export default TodoItem;
