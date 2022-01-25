import React from 'react';
import styles from './Options.module.css';
import FilterButton from '../buttons/FilterButton.jsx';
import { Button, Radio } from 'antd';
import { useEffect, useState } from 'react';

const Options = (props) => {
    const { filterButtonBy, orderBy, onOrderBy, onSetFilterBy } = props;
    const [filterBy, setFilterBy] = useState('all');

    //
    const handleChange = (e) => {
        onSetFilterBy(e.target.value);
        setFilterBy(e.target.value);
        console.log('e.target.value >> ', e.target.value);
    };

    console.log('filterBy >>>', filterBy);

    return (
        <div className={styles.todo__options}>
            <div className={styles.todo__options__left}>
                <Radio.Group value={filterBy} onChange={handleChange}>
                    <Radio.Button value='all'>Large</Radio.Button>
                    <Radio.Button value='done'>Default</Radio.Button>
                    <Radio.Button value='undone'>Small</Radio.Button>
                </Radio.Group>

                {/* <FilterButton
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
                /> */}
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
