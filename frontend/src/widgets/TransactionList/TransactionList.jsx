import React from 'react'
import cl from './TransactionList.module.scss'
import TransactionItem from '../TransactionItem/TransactionItem'

function TransactionList({transactions, onEdit, onHide, onDelete}) {
  return (
    <div className={cl.transactionList}>
        {transactions.map((transaction, index) => (
        <TransactionItem
            key={index}
            transaction={transaction}
            onEdit={() => onEdit(index)}
            onHide={() => onHide(index)}
            onDelete={() => onDelete(index)}
        />
        ))}
    </div>
  )
}

export default TransactionList