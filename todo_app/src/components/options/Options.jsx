import React from 'react';
import styles from './Options.module.css';
import FilterButton from '../buttons/FilterButton.jsx';

const Options = (props) => {
    const { filterButtonBy, orderBy, onOrderBy, onSetFilterBy } = props;

    return (
        <div className={styles.todo__options}>
            <div className={styles.todo__options__left}>
                <FilterButton
                    name={'all'}
                    filterButtonBy={filterButtonBy}
                    filterBy={'all'}
                    onSetFilterBy={onSetFilterBy}
                />
                <FilterButton
                    name={'done'}
                    filterButtonBy={filterButtonBy}
                    filterBy={'done'}
                    onSetFilterBy={onSetFilterBy}
                />
                <FilterButton
                    name={'undone'}
                    filterButtonBy={filterButtonBy}
                    filterBy={'undone'}
                    onSetFilterBy={onSetFilterBy}
                />
            </div>

            <div className={styles.todo__options__right}>
                <div className={styles.todo__options__name}>Sort by Date</div>
                <div className={styles.todo__options_sort}>
                    <button
                        className={`${styles.descending} ${
                            orderBy === 'desc'
                                ? styles.btn_active_bg
                                : undefined
                        }`}
                        onClick={() => onOrderBy('desc')}></button>
                    <button
                        className={`${styles.ascending} ${
                            orderBy === 'asc' ? styles.btn_active_bg : undefined
                        }`}
                        onClick={() => onOrderBy('asc')}></button>
                </div>
            </div>
        </div>
    );
};

export default Options;
