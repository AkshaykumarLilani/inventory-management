import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import HomePage from '../Pages/AuthenticatedPages/HomePage';
import { AppstoreOutlined, MailOutlined, SettingOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';
import { logout } from '../Redux/AuthReducer/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AllProductsPage from '../Pages/AuthenticatedPages/AllProductsPage';
import EditProductPage from '../Pages/AuthenticatedPages/EditProductPage';
import ViewProductPage from '../Pages/AuthenticatedPages/ViewProductPage';
import CreateProductPage from '../Pages/AuthenticatedPages/CreateProductPage';

function getItem(label, key, icon, children, type, disabled) {
    return {
        key,
        icon,
        children,
        label,
        type,
        disabled: !disabled ? false : disabled
    };
}

const items = [
    getItem(<Link to={`/products`}>Products</Link>, 'sub1', <AppstoreOutlined />),
    getItem('Logout', 'logout', <LogoutOutlined />, null)
];

function PrivateRoutes() {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [menuItems, setMenuItems] = useState(items);

    const firstName = useSelector(store => store.authReducer?.user?.firstName);
    const lastName = useSelector(store => store.authReducer?.user?.lastName);

    if (firstName && lastName) {
        const item = getItem(`Hi, ${firstName} ${lastName}`, 'name', null, null, null, true);
        const filtered = menuItems?.filter(x => x.key === "name");
        if (filtered.length === 0){
            setMenuItems([item, ...menuItems]);
        }
    }

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const onClick = (e) => {
        if (e.key === "logout") {
            dispatch(logout());
        }
    }

    return (
        <>
            <main className='d-flex justify-content-start align-items-start h-100'>
                <div
                    style={{
                        width: collapsed ? 80 : 256,
                        backgroundColor: "#001529"
                    }}
                    className='me-2 h-100 d-flex flex-column'
                >
                    <div className={`my-2 w-100 d-flex ${collapsed ? "justify-content-center" : "justify-content-end"}`}>
                        <Button
                            type="primary"
                            onClick={toggleCollapsed}
                            className={`${collapsed ? '' : 'me-3'}`}
                        >
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </Button>
                    </div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        className='h-100'
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={menuItems}
                        onClick={onClick}
                        style={{flex: 1}}
                    />
                </div>
                <div className='h-100' style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path='/products' element={<AllProductsPage />}></Route>
                        <Route path='/products/create' element={<CreateProductPage />}></Route>
                        <Route path='/products/edit/:id' element={<EditProductPage />}></Route>
                        <Route path='/products/view/:id' element={<ViewProductPage />}></Route>
                        <Route path='*' element={<Navigate to={'/'} />} />
                    </Routes>
                </div>
            </main>
        </>
    )
}

export default PrivateRoutes