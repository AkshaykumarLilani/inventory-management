import React from 'react';
import { LoadingOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Spinner = () => (
    <Spin
        indicator={
            <Loading3QuartersOutlined
                style={{
                    fontSize: 50,
                }}
                spin
            />
        }
    />
);
export default Spinner;