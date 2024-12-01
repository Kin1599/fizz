import React from 'react'
import cl from './CreditCard.module.scss'
import sberLogo from '../../shared/assets/sber.svg';
import tbankLogo from '../../shared/assets/tbank.svg';
import vtbLogo from '../../shared/assets/vtb.svg';

function CreditCard({card}) {
    const {bank_name, cardType, balance, card_number} = card;

    const bankLogo = () => {
      switch (bank_name) {
        case "Сбербанк":
          return sberLogo;
        case "Т-Банк":
          return tbankLogo;
        case "ВТБ":
          return vtbLogo;
        default:
          return sberLogo;
      }
    }

    const cardTypeLabel = () => {
      switch (cardType) {
          case 'debit':
              return 'Дебетовая';
          case 'credit':
              return 'Кредитная';
          case 'wallet':
              return 'Кошелек';
          default:
              return 'Неизвестный тип';
      }
    };
    
  return (
    <div className={cl.creditCard}>
        <div className={cl.creditCard__title}>
            {
              bank_name !== "Кошелек" && (<img className={cl.creditCard__img} src={bankLogo()} alt="bank-logo" />)
            }            
            <p className={cl.creditCard__type}>{cardTypeLabel()}</p>
        </div>
        <div className={cl.total}>
            Остаток: <span>{balance}</span>
        </div>
        {card_number && <p className={cl.creditCard__number}>{card_number}</p>}
    </div>
  )
}

export default CreditCard