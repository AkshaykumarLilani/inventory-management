import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/AuthReducer/actions';

const LoginPage = () => {
    const dispatch = useDispatch();
    const authLoading = useSelector(store => store.authReducer.loading);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(login(values));
    };
    return (
        <div className='d-flex w-100 justify-content-center align-items-center' style={{flex: 1}}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                        {
                            type: 'email',
                            message: "Please input a valid email!"
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    {
                        authLoading ? <Button type="primary" className='me-2' loading>
                            Log in
                        </Button> : <>
                            <Button type="primary" htmlType="submit" className="me-2">
                                Log in
                            </Button>
                            Or <Link to="/signup">Sign Up now!</Link>
                        </>
                    }
                </Form.Item>

            </Form>
        </div>
    );
};
export default LoginPage;