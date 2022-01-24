import React from 'react';
import styles from './TodoItem.module.css';
import { useState, useEffect } from 'react';

const TodoItem = (props) => {
    const [checked, setChecked] = useState(props.item.done);

    const [editMode, setEditMode] = useState(false);
    const [userInput, setUserInput] = useState(props.item.name);

    // Set task to 'Done'
    // const handleChange = () => {
    //     setChecked(!checked);
    //     props.toggleTask(props.item.id);
    // };

    // Toggle task to 'edit mode'
    // const toggleEditMode = () => {
    //     setEditMode(!editMode);
    // };

    // Deactivate 'edit mode' and update task name
    // const deactivateEditMode = () => {
    //     setEditMode(!editMode);
    //     props.editTask(props.item.id, userInput);
    // };

    // Set new task name
    // const handleTaskName = (e) => {
    //     setUserInput(e.currentTarget.value);
    // };

    // const discardChanges = (e) => {
    //     let keyCode = e.keyCode;
    //     if (keyCode === 27) {
    //         setUserInput(props.item.text);
    //         e.target.blur();
    //     }
    //     if (keyCode === 13) {
    //         setUserInput(e.currentTarget.value);
    //         e.target.blur();
    //     }
    // };

    return (
        <div
            className={
                checked ? styles.todo__item__completed : styles.todo__item
            }>
            <div className={styles.todo__item__input}>
                <input
                    type='checkbox'
                    //onChange={handleChange}
                    checked={checked}
                />
            </div>

            {!editMode && (
                <div
                    className={styles.todo__item__text}
                    //onClick={toggleEditMode}
                >
                    {userInput}
                </div>
            )}

            {editMode && (
                <div className={styles.todo_item_input}>
                    <input
                        type='text'
                        placeholder={userInput}
                        //onBlur={deactivateEditMode}
                        autoFocus={true}
                        // onChange={handleTaskName}
                        disabled={checked ? true : false}
                        //onKeyDown={discardChanges}
                    />
                </div>
            )}

            <div className={styles.todo__item__date}>{props.item.date}</div>
            <div className={styles.todo__item__del}>
                <button
                    //disabled={checked}
                    type='button'
                    //onClick={() => props.removeTask(props.item.id)}
                />
            </div>
        </div>
    );
};

export default TodoItem;
