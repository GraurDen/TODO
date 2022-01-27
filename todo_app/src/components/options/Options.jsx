import React from 'react';
import { Button, Radio, Typography, Row, Col } from 'antd';
import { useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const Options = (props) => {
    const { onOrderBy, onSetFilterBy } = props;
    const [filterBy, setFilterBy] = useState('all');
    const { Text } = Typography;
    const handleChange = (e) => {
        onSetFilterBy(e.target.value);
        setFilterBy(e.target.value);
    };

    return (
        <div style={{ marginBottom: '40px' }}>
            <Row>
                <Col flex='auto'>
                    <Radio.Group value={filterBy} onChange={handleChange}>
                        <Radio.Button value='all'>All</Radio.Button>
                        <Radio.Button value='done'>Done</Radio.Button>
                        <Radio.Button value='undone'>Undone</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col flex='151px'>
                    <Text type='secondary' style={{ marginRight: '10px' }}>
                        Sort by Date
                    </Text>
                    <Button
                        icon={<ArrowDownOutlined />}
                        onClick={() => onOrderBy('asc')}
                    />
                    <Button
                        icon={<ArrowUpOutlined />}
                        onClick={() => onOrderBy('desc')}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Options;
