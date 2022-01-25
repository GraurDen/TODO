import React from 'react';
import styles from './Pagination.module.css';

const Pagination = (props) => {
    // Tasks total number
    const { totalItemsCount, pageSize, paginate, currentPage } = props;

    // Total count of pages
    const pagetTotal = Math.ceil(totalItemsCount / pageSize);

    // Page-buttons total number
    const pagesArr = [];

    for (let i = 1; i <= pagetTotal; i++) {
        pagesArr.push(i);
    }

    return (
        <>
            {totalItemsCount > 5 && (
                <div className={styles.todo__pagination}>
                    {/* Button Last page */}
                    {pagetTotal > 1 && (
                        <button
                            className={styles.btnFirst}
                            onClick={() => paginate(1)}>
                            First
                        </button>
                    )}
                    {/* Button 'Prev' */}
                    <button
                        className={styles.btnPrev}
                        disabled={currentPage <= 1 && true}
                        onClick={() => paginate(currentPage - 1)}>
                        {' '}
                        «{' '}
                    </button>
                    {/* Pages */}
                    {pagesArr.map((page, index) => (
                        <span
                            className={
                                currentPage === page
                                    ? styles.paginationSelected
                                    : undefined
                            }
                            key={index}
                            onClick={() => {
                                paginate(page);
                            }}>
                            {page}
                        </span>
                    ))}
                    {/* Button 'Next' */}
                    <button
                        className={styles.btnNext}
                        disabled={currentPage === pagetTotal && true}
                        onClick={() => paginate(currentPage + 1)}>
                        {' '}
                        »{' '}
                    </button>
                    {/* Button Last page */}
                    {pagetTotal > 1 && (
                        <button
                            className={styles.btnLast}
                            onClick={() => paginate(pagetTotal)}>
                            Last
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default Pagination;
