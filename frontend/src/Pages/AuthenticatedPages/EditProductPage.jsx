import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { getSingleProduct, updateSingleProduct } from '../../Redux/ProductReducer/actions';
import Spinner from '../../Components/Spinner';
import { Button, Form, Input, Select } from 'antd';
import { notify } from '../../Utils/notify';

const capitalize = (str) => typeof str === "string" ? str[0].toUpperCase() + str.slice(1) : "N/A";

function ViewProductPage() {
    const params = useParams();
    const { id } = params;
    const loading = useSelector(store => store.productReducer?.loading);
    const selectedProduct = useSelector(store => store.productReducer?.selectedProduct);
    const productUpdated = useSelector(store => store.productReducer.productUpdated);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, [id, productUpdated]);

    const onFinish = (values) => {
        console.log({ values });
        const isUpdated = Object.keys(values).filter(r => selectedProduct[r] !== values[r]).length > 0;
        if (!isUpdated) {
            notify("Please update some values before proceeding", "error");
        } else {
            dispatch(updateSingleProduct(id, values))
        }
    }

    return (
        <div className='h-100 d-flex justify-content-start gap-3 flex-column my-2'>
            <h3>{selectedProduct?.name || "Edit Product"}</h3>
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
                                initialValue={selectedProduct?.name}
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
                                initialValue={Number(selectedProduct?.price)}
                                label={capitalize("price")}
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <Input type='number' />
                            </Form.Item>
                            <Form.Item
                                name='quantity'
                                initialValue={Number(selectedProduct?.quantity)}
                                label={capitalize("quantity")}
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='description'
                                initialValue={selectedProduct?.description}
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
                                initialValue={selectedProduct?.category}
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
                                    loading ? <Button className='align-sle' type='primary' loading>
                                        Update
                                    </Button> :
                                        <Button className='align-sle' type='primary' htmlType='submit'>
                                            Update
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

export default ViewProductPage