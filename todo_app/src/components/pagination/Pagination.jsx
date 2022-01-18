import React from 'react';
import styles from './Pagination.module.css';
import { useState } from 'react';

const Pagination = (props) => {
    // Tasks total number
    const totalItemsCount = props.todos.length;
    // Tasks amount per page
    const pageSize = props.pageSize;
    // Page-buttons total number
    const pagesArr = [];
    // Total count of pages
    const pagetTotal = Math.ceil(totalItemsCount / pageSize);

    for (let i = 1; i <= pagetTotal; i++) {
        pagesArr.push(i);
    }

    //TODO:Implement => If 'pagesArr' is empty then do not display pagination
    return (
        <>
            {totalItemsCount > 0 && (
                <div className={styles.todo__pagination}>
                    {/* Button 'Prev' */}

                    <button
                        className={styles.btnPrev}
                        disabled={props.currentPage <= 1 && true}
                        onClick={() => props.paginate(props.currentPage - 1)}>
                        {' '}
                        «{' '}
                    </button>

                    {/* Pages */}
                    {pagesArr.map((page, index) => (
                        <span
                            className={
                                props.currentPage === page
                                    ? styles.paginationSelected
                                    : undefined
                            }
                            key={index}
                            onClick={() => {
                                props.paginate(page);
                            }}>
                            {page}
                        </span>
                    ))}
                    {/* Button 'Next' */}
                    <button
                        className={styles.btnNext}
                        disabled={props.currentPage === pagetTotal && true}
                        onClick={() => props.paginate(props.currentPage + 1)}>
                        {' '}
                        »{' '}
                    </button>
                </div>
            )}
        </>
    );
};

export default Pagination;
