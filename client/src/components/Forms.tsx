import React from 'react'
import UserForm from './UserForm'
import HobbiesForm from './HobbiesForm'

const Forms = () => {
  return (
    <div style={{ display: 'flex', flexDirection:'row', justifyContent: 'center', alignItems: 'start    ', gap: 60}}>
        <UserForm />
        <HobbiesForm />
    </div>
  )
}

export default Forms