import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button, Tabs } from 'antd';
import cl from './EditTransactionModal.module.scss';

const EditTransactionModal = ({ open, onClose, transaction, onSave }) => {
  const [amount, setAmount] = useState(transaction.amount);
  const [source, setSource] = useState(transaction.source);
  const [cardNumber, setCardNumber] = useState(transaction.cardNumber || 'Карта');

  useEffect(() => {
    if(transaction){
        setAmount(transaction.amount);
        setSource(transaction.source);
        setCardNumber(transaction.cardNumber || 'Карта');
    }
  }, [transaction]);

  const handleSave = () => {
    onSave({
      ...transaction,
      amount,
      source,
      cardNumber,
    });
    onClose();
  };

  const PaymentForm = ({ type }) => (
    <>
      <div className={cl.formItem}>
        <label>Рубли:</label>
        <Input
          className={cl.input}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="example"
        />
      </div>
      <div className={cl.formItem}>
        <label>Источник:</label>
        <Input
          className={cl.input}
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="example"
        />
      </div>
      <div className={cl.formItem}>
        <label>Номер карты:</label>
        <Select
          className={cl.input}
          value={cardNumber}
          onChange={(value) => setCardNumber(value)}
          defaultValue="Карта"
          placeholder="Все транзакции"
        >
          <Select.Option value="Карта">Карта</Select.Option>
          <Select.Option value="Наличные">Наличные</Select.Option>
        </Select>
      </div>
      <Button type="primary" onClick={handleSave}>
        Сохранить
      </Button>
    </>
  );

  const tabsItemsOnCards = [
    { key: '1', label: 'Доход', children: <PaymentForm type="income" /> },
    { key: '2', label: 'Расход', children: <PaymentForm type="expense" /> }
  ];

  if (!transaction){
    return null;
  }

  return (
    <Modal
      title="Изменение платежа"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Tabs
        className={cl.paymentsPage__tabs}
        defaultActiveKey={transaction.type === 'income' ? '1' : '2'}
        items={tabsItemsOnCards}
        tabBarStyle={{
          colorActive: '#C0CDFE',
        }}
      />
    </Modal>
  );
};

export default EditTransactionModal;
