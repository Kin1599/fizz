import React from 'react'
import cl from './TransactionItem.module.scss'
import { Button } from 'antd'; 
import { EditOutlined, EyeInvisibleOutlined, DeleteOutlined } from '@ant-design/icons';

function TransactionItem({transaction, onEdit, onHide, onDelete}) {
  const {transactionType, amount, source, cardNumber} = transaction;
  const typeColor = transactionType === 'income' ? '#C0FED2' : '#FEC0EC';
  return (
    <div className={cl.transactionItem}> 
        <div className={cl.amount} style={{color: typeColor}}>{transactionType === 'income' ? '+' : '-'}{amount}</div> 
        <div className={cl.source}>{source}</div> 
        <div className={cl.cardNumber}>*{cardNumber}</div> 
        <div className={cl.actions}> 
            <Button style={{backgroundColor: 'transparent'}} icon={<EditOutlined />} onClick={onEdit} /> 
            <Button style={{backgroundColor: 'transparent'}} icon={<EyeInvisibleOutlined />} onClick={onHide} /> 
            <Button style={{backgroundColor: 'transparent'}} icon={<DeleteOutlined />} onClick={onDelete} /> 
        </div> 
    </div>
  )
}

export default TransactionItem