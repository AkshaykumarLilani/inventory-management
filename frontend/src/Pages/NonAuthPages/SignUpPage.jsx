import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../Redux/AuthReducer/actions';
import { Link } from 'react-router-dom';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const SignUpPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const authLoading = useSelector(store => store.authReducer.loading);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        delete values.confirm;
        dispatch(signup(values));
    };



    return (
        <div className='d-flex justify-content-center align-items-center' style={{ flex: 1 }}>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
            >
                <Form.Item
                    label="Name"
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Form.Item
                        name="firstName"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                        }}
                    >
                        <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                            margin: '0 8px',
                        }}
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="bio"
                    label="Bio"
                >
                    <Input.TextArea showCount maxLength={240} />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    {
                        authLoading ? <Button type="primary" className='me-2' loading>
                            Register
                        </Button> : <>
                            <Button type="primary" htmlType="submit" className="me-2">
                                Register
                            </Button>
                            Or <Link to="/login">Already registered? Login</Link>
                        </>
                    }
                </Form.Item>
            </Form>
        </div>
    );
};
export default SignUpPage;