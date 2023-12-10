import React from 'react'
import boxes from "../../assets/boxes.svg";

function DisplayPage() {
  
  return (
    <div className='h-100 d-flex justify-content-center align-items-center gap-3 flex-column my-2'>
      <img src={boxes} alt="" />
      <h3 className='text-center w-100'>Inventory Manager</h3>
      <p className='text-center w-100'>Please login/signup to continue</p>
    </div>
  )
}

export default DisplayPage