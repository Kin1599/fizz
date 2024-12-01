import React from 'react'
import cl from './CreditCard.module.scss'

function CreditCard({card}) {
    const {bank, type, total, number} = card;
  return (
    <div className={cl.creditCard}>
        <div className={cl.creditCard__title}>
            <img className={cl.creditCard__img} src={bank} alt="bank-logo" />
            <p className={cl.creditCard__type}>{type}</p>
        </div>
        <div className={cl.total}>
            Остаток: <span>{total}</span>
        </div>
        <p className={cl.creditCard__number}>{number}</p>
    </div>
  )
}

export default CreditCard