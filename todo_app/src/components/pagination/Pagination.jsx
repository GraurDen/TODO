import React from 'react';
import styles from './Pagination.module.css';
import { useState } from 'react';

const Pagination = (props) => {
    // Количество тасок
    const totalItemsCount = props.todos.length;
    const pageSize = props.pageSize;
    const pagesArr = []; // коичество страниц

    // Массив с количеством кнопок
    for (let i = 1; i <= Math.ceil(totalItemsCount / pageSize); i++) {
        pagesArr.push(i);
    }

    // console.log(totalItemsCount);
    // console.log(pageSize);
    // console.log(pagesArr);
    // console.log('firstIndex ' + props.firstIndex);
    // console.log('lastIndex ' + props.lastIndex);
    //console.log(props.todos);
    return (
        <div className={styles.todo__pagination}>
            {/* Button 'Prev' */}
            <button className={styles.btnPrev} disabled={true}>
                {' '}
                «{' '}
            </button>
            {/* Pages */}
            {pagesArr.map((page, index) => (
                <span
                    key={index}
                    onClick={(e) => {
                        props.paginate(page);
                    }}>
                    {page}
                </span>
            ))}
            {/* <span className={styles.paginationSelected}>{page}</span> */}
            {/* Button 'Next' */}
            <button className={styles.btnNext}> » </button>
        </div>
    );
};

export default Pagination;
