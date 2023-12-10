import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleProduct, getAllProducts } from '../../Redux/ProductReducer/actions';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router';
import Spinner from '../../Components/Spinner';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: "Sr.",
        dataIndex: 'sr',
        width: 100
    },
    {
        title: 'Name',
        dataIndex: 'name',
        // width: 150,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        // width: 150,
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        render: (_, record) => {
            return (
                <div className='d-flex gap-2'>
                    <Button
                        type="info"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            console.log("Info")
                            record.navigate("/products/view/" + record._id);
                        }}
                    />
                    <Button
                        type="info"
                        icon={<EditOutlined style={{ color: "blueviolet" }} />}
                        onClick={() => {
                            console.log("edit");
                            record.navigate("/products/edit/" + record._id);
                        }}
                    />
                    <Popconfirm
                        title="Delete this product"
                        description="Are you sure to delete this product?"
                        onConfirm={(e)=>record.confirmDelete(e, record._id)}
                        onCancel={(e)=>record.cancelDelete(e, record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="info"
                            icon={<DeleteOutlined style={{ color: 'red' }} />}
                        />
                    </Popconfirm>

                </div>
            )
        },
    },
];

const AllProductsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dataToShow, setDataToShow] = useState([]);
    const loading = useSelector(store => store.productReducer.loading);
    const data = useSelector(store => store.productReducer.products);
    const productDeleted = useSelector(store => store.productReducer.productDeleted);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    useEffect(()=>{
        if (productDeleted){
            dispatch(getAllProducts());
        }
    }, [productDeleted]);

    const confirmDelete = (e, id) => {
        // console.log(e);
        dispatch(deleteSingleProduct(id))
    };
    const cancelDelete = (e) => {
        // console.log(e);
        message.error('Deletion canceled');
    };

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            let d = data.map((d, i) => (
                {
                    ...d,
                    price: `₹ ${d.price}`,
                    sr: i + 1,
                    navigate: navigate,
                    key: d._id,
                    confirmDelete: confirmDelete,
                    cancelDelete: cancelDelete
                }
            ));
            setDataToShow(d);
        }
    }, [data]);

    return (
        <div className='h-100 d-flex justify-content-start gap-3 flex-column py-2'>
            <h3>All Products</h3>
            <div className='d-flex justify-content-end p-3'>
                <Link to={`/products/create`}>
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Add Product
                    </Button>
                </Link>
            </div>
            {
                loading ?
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "60svh" }}>
                        <Spinner />
                    </div> : <Table
                        columns={columns}
                        dataSource={dataToShow}
                        className='p-2'
                        pagination={{
                            pageSize: 50,
                        }}
                        scroll={{
                            y: "60svh",
                        }}
                    />
            }

        </div>
    );
}
export default AllProductsPage;