import React from 'react'
import cl from './FamilyItem.module.scss'
import creditCard from '../../assets/creditCard.svg'
import userDelete from '../../assets/userDelete.svg'
import fund from '../../assets/fund.svg'

function FamilyItem({name, description, onDelete}) {
  return (
    <div className={cl.familyItem}>
        <div className={cl.familyItem__content}>
            <div className={cl.familyItem__text}>
                <span className={cl.familyItem__name}>{name}</span>
                <span className={cl.familyItem__description}>{description}</span>
            </div>
            <div className={cl.familyItem__icons}>
                <img src={creditCard} alt="transactions" />
                <img src={fund} alt="goals" />
                <img src={userDelete} alt="user delete" onClick={onDelete}/>
            </div>
        </div>
    </div>
  )
}

export default FamilyItem