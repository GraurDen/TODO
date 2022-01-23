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
                    name={'Done'}
                    filterButtonBy={filterButtonBy}
                    filterBy={'Done'}
                    onSetFilterBy={onSetFilterBy}
                />
                <FilterButton
                    name={'Undone'}
                    filterButtonBy={filterButtonBy}
                    filterBy={'Undone'}
                    onSetFilterBy={onSetFilterBy}
                />
            </div>

            <div className={styles.todo__options__right}>
                <div className={styles.todo__options__name}>Sort by Date</div>
                <div className={styles.todo__options_sort}>
                    <button
                        className={`${styles.descending} ${
                            orderBy === 'descending'
                                ? styles.btn_active_bg
                                : undefined
                        }`}
                        onClick={() => onOrderBy('descending')}></button>
                    <button
                        className={`${styles.ascending} ${
                            orderBy === 'ascending'
                                ? styles.btn_active_bg
                                : undefined
                        }`}
                        onClick={() => onOrderBy('ascending')}></button>
                </div>
            </div>
        </div>
    );
};

export default Options;
