import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { getSingleProduct } from '../../Redux/ProductReducer/actions';
import Spinner from '../../Components/Spinner';
import { Button, Form, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const capitalize = (str) => typeof str === "string" ? str[0].toUpperCase() + str.slice(1) : "N/A";

function ViewProductPage() {
    const params = useParams();
    const { id } = params;
    const loading = useSelector(store => store.productReducer?.loading);
    const selectedProduct = useSelector(store => store.productReducer?.selectedProduct);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, [id]);

    return (
        <div className='h-100 d-flex justify-content-start gap-3 flex-column my-2'>
            <h3>{selectedProduct?.name || "View Product"}</h3>
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
                            layout="horizontal"
                            disabled={true}
                            style={{
                                maxWidth: 600,
                            }}
                        >
                            <Form.Item label={capitalize("name")}>
                                <Input value={selectedProduct?.name} />
                            </Form.Item>
                            <Form.Item label={capitalize("price")}>
                                <Input value={selectedProduct?.price} />
                            </Form.Item>
                            <Form.Item label={capitalize("quantity")}>
                                <Input value={selectedProduct?.quantity} />
                            </Form.Item>
                            <Form.Item label={capitalize("description")}>
                                <Input value={selectedProduct?.description} />
                            </Form.Item>
                            <Form.Item label={capitalize("category")}>
                                <Input value={selectedProduct?.category} />
                            </Form.Item>
                        </Form>
                        <Link to={`/products/edit/${id}`}>
                            <Button
                                type="default"
                                icon={<EditOutlined style={{ color: "blue" }} />}
                                onClick={() => {
                                    console.log("edit");
                                    record.navigate("/products/edit/" + record._id);
                                }}
                            > Edit </Button>
                        </Link>
                    </>
                }
            </div>

        </div>
    )
}

export default ViewProductPage