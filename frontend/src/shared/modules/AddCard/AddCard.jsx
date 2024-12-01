import React from 'react'
import cl from './AddCard.module.scss'
import plusCircle from '../../assets/plusCircle.svg'

function AddCard({onClick}) {
  return (
    <div className={cl.addCard} onClick={onClick}>
        <img src={plusCircle} alt="add card" />
    </div>
  )
}

export default AddCard