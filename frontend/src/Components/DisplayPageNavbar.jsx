import React from 'react'
import { Button } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import boxes from "../assets/boxes.svg";

function DisplayPageNavbar() {
    const isAuthenticated = useSelector(store => (store.authReducer.token && store.authReducer.token !== null));

    const location = useLocation();
    const paths = location.pathname.split("/");
    const param1 = paths.length > 1 && paths[1];

    return (
        <nav className='d-flex gap-3 justify-content-between p-2 shadow mb-3'>
            <div className='d-flex align-items-center'>
                <img width="45px" src={boxes} alt="Boxes" />
                <h5 className='mb-0'>Inventory Manager</h5>
            </div>
            <div className='d-flex gap-3'>
                {!isAuthenticated ? <>
                    {param1 !== "login" &&
                        <Link to="/login">
                            <Button type='primary' size='large'>
                                Login
                            </Button>
                        </Link>
                    }
                    {param1 !== "signup" &&
                        <Link to="/signup">
                            <Button type='primary' size='large'>
                                Sign Up
                            </Button>
                        </Link>
                    }
                </> :
                    <Link to="/login">
                        <Button type='primary' size='large'>
                            Logout
                        </Button>
                    </Link>
                }
            </div>
        </nav>
    )
}

export default DisplayPageNavbar;