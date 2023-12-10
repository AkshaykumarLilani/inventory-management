import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Components/Spinner';
import { Button, Form, Input, Select } from 'antd';
import { notify } from '../../Utils/notify';
import { createSingleProduct } from '../../Redux/ProductReducer/actions';
import { useNavigate } from 'react-router';

const capitalize = (str) => typeof str === "string" ? str[0].toUpperCase() + str.slice(1) : "N/A";

function CreateProductPage() {
    const navigate = useNavigate();
    const loading = useSelector(store => store.productReducer?.loading);
    const userId = useSelector(store => store.authReducer.user._id);
    const newProductAdded = useSelector(store => store.productReducer.newProductAdded)

    const dispatch = useDispatch();

    const onFinish = (values) => {
        if (!userId){
            notify("Something went wrong, please login again");
            return;
        }
        console.log({ values });
        if (typeof values.price !== "number") {
            values.price = Number(values.price);
            if (isNaN(values.price)) {
                notify("Price is not a valid number", "error");
                return;
            }
        }
        if (typeof values.quantity !== "number") {
            values.quantity = Number(values.quantity);
            if (isNaN(values.quantity)) {
                notify("Quantity is not a valid number", "error");
                return;
            }
        }
        values.user = userId;
        dispatch(createSingleProduct(values));
    }

    useEffect(()=>{
        if (newProductAdded){
            navigate("/products");
        }
    }, [loading]);

    return (
        <div className='h-100 d-flex justify-content-start gap-3 flex-column my-2'>
            <h3>{"Create a new Product"}</h3>
            <div>
                {
                    loading ? <Spinner /> : <>
                        <Form
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            onFinish={onFinish}
                            layout="horizontal"
                            style={{
                                maxWidth: 600,
                            }}
                        >
                            <Form.Item
                                name='name'
                                label={capitalize("name")}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='price'
                                label={capitalize("price")}
                                rules={[
                                    {
                                        required: true
                                    },
                                ]}
                            >
                                <Input type='number' />
                            </Form.Item>
                            <Form.Item
                                name='quantity'
                                label={capitalize("quantity")}
                                hasFeedback
                                rules={[
                                    {
                                        required: true
                                    },
                                    () => ({
                                        validator(_, value) {
                                            console.log({ value })
                                            if (value.includes(".")) {
                                                return Promise.reject(new Error('Quantity must be an Integer'));
                                            } else {
                                                return Promise.resolve(value);
                                            }
                                        },
                                    })
                                ]}

                            >
                                <Input type='number' />
                            </Form.Item>
                            <Form.Item
                                name='description'
                                label={capitalize("description")}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                name="category"
                                label={capitalize("category")}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Please choose a category"
                                >
                                    <Select.Option value="Electronics">Electronics</Select.Option>
                                    <Select.Option value="Apparels">Apparels</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                {
                                    loading ? <Button type="primary" className='me-2' loading>
                                        Save
                                    </Button> :
                                        <Button type="primary" htmlType="submit" className="me-2">
                                            Save
                                        </Button>
                                }
                            </Form.Item>
                        </Form>
                    </>
                }
            </div>

        </div>
    )
}

export default CreateProductPage