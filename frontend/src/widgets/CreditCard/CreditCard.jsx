import React from 'react'
import cl from './CreditCard.module.scss'

function CreditCard({card}) {
    const {bank_name, cardType, balance, card_number} = card;

    const bankLogo = () => {
      switch (bank_name) {
        case "Сбербанк":
          return "../../shared/assets/sber.svg";
        case "Т-Банк":
          return "../../shared/assets/tbank.svg";
        case "ВТБ":
          return "../../shared/assets/vtb.svg";
        default:
          return "../../shared/assets/sber.svg";
      }
    }
  return (
    <div className={cl.creditCard}>
        <div className={cl.creditCard__title}>
            {
              bank_name !== "Кошелек" && (<img className={cl.creditCard__img} src={bankLogo} alt="bank-logo" />)
            }            
            <p className={cl.creditCard__type}>{cardType}</p>
        </div>
        <div className={cl.total}>
            Остаток: <span>{balance}</span>
        </div>
        <p className={cl.creditCard__number}>{card_number}</p>
    </div>
  )
}

export default CreditCard