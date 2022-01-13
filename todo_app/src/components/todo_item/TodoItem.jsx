import React from 'react';
import styles from './TodoItem.module.css';
import { useState } from 'react';

const TodoItem = (props) => {
    const [checked, setChecked] = useState(true);

    const handleChange = () => {
        setChecked(!checked);
        props.toggleTask(props.item.id);
    };

    return (
        <div
            className={
                checked ? styles.todo__item : styles.todo__item__completed
            }>
            <div className={styles.todo__item__input}>
                <input type='checkbox' onChange={handleChange} />
            </div>
            <div className={styles.todo__item__text}>{props.item.text}</div>
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
