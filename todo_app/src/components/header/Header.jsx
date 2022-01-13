import React from 'react';
import styles from './Header.module.css';

const Header = (props) => {
    return (
        <div className={styles.title}>
            <h1>ToDo</h1>
            <span>{props.task}</span>
        </div>
    );
};

export default Header;
