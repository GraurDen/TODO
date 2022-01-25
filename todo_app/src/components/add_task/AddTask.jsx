import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

const Add_task = (props) => {
    // Initial State
    const [userInput, setUserInput] = useState('');

    // Set input value
    const handleChange = (e) => {
        setUserInput(e.currentTarget.value);
    };

    // Add task and clear input value
    const hanldeSubmit = (e) => {
        props.addTask(userInput);
        setUserInput('');
    };

    // Add task on key 'Enter' press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            hanldeSubmit(e);
        }
    };

    return (
        <Form
            onFinish={hanldeSubmit}
            name='basic'
            layout='inline'
            style={{ width: '100%', marginBottom: '20px' }}>
            <Form.Item style={{ flex: 1 }}>
                <Input
                    name='content'
                    type='text'
                    onChange={handleChange}
                    value={userInput}
                    onKeyDown={handleKeyPress}
                    placeholder='I want to...'
                    autoFocus={true}
                />
            </Form.Item>
            <Form.Item style={{ margin: 0 }}>
                <Button type='primary' htmlType='submit'>
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Add_task;
