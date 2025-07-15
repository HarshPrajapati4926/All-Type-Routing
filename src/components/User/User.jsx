import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const {userid}=useParams();
  return (
    <>
      <h2>User:{userid}</h2>
    </>
  )
}

export default User
