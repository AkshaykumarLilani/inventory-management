import React from 'react'
import { useSelector } from 'react-redux';

function HomePage() {
  const firstName = useSelector(store => store.authReducer?.user?.firstName);
  const lastName = useSelector(store => store.authReducer?.user?.lastName);

  return (
    <div className='h-100 d-flex justify-content-start gap-3 flex-column my-2'>
      <h3>Dashboard</h3>
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ flex: 1 }}>
        <h5>Welcome, {firstName + " " + lastName}</h5>
        <p>Please use the navigation on the left to navigate to products page</p>
      </div>
    </div>
  )
}

export default HomePage