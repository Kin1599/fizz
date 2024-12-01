import React, { useState } from 'react';
import cl from './PaymentsPage.module.scss';
import plus from '../../shared/assets/plus.svg';
import { Input, Select } from 'antd';
import Footer from '../../widgets/Footer/Footer';
import DeleteTransactionModal from '../../widgets/DeleteTransactionModal/DeleteTransactionModal';
import EditTransactionModal from '../../widgets/EditTransactionModal/EditTransactionModal';
import FiltersComponent from '../../widgets/FiltersComponent/FiltersComponent';
import TransactionList from '../../widgets/TransactionList/TransactionList';
import PaymentModal from '../../widgets/PaymentModal/PaymentModal';

const PaymentForm = ({ type, handleAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [cardNumber, setCardNumber] = useState('Карта');

  const handleSubmit = () => {
    handleAddTransaction({ type, amount, source, cardNumber });
  };

  return (
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
    </>
  );
};

const tabsItemsOnCards = (handleAddTransaction) => [
  { key: '1', label: 'Доход', children: <PaymentForm type="income" handleAddTransaction={handleAddTransaction} /> },
  { key: '2', label: 'Расход', children: <PaymentForm type="expense" handleAddTransaction={handleAddTransaction} /> },
];

function PaymentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    { type: 'income', amount: 351, source: 'Перекресток', cardNumber: '7356' },
    { type: 'expense', amount: 351, source: 'Перекресток', cardNumber: '7356' },
  ]);
  const [setEditModalOpen] = useState(false);
  const [setTransactionToEdit] = useState(null);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (index) => {
    setTransactionToEdit(transactions[index]);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (transaction) => {
    const updatedTransactions = transactions.map((t, idx) =>
      idx === transactions.findIndex(
        (t) => t.cardNumber === transaction.cardNumber && t.source === transaction.source
      )
        ? transaction
        : t
    );
    setTransactions(updatedTransactions);
  };

  const handleDelete = (index) => {
    setTransactionToDelete(index);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => { 
    setTransactions(transactions.filter((_, i) => i !== transactionToDelete)); 
    setDeleteModalVisible(false); 
    setTransactionToDelete(null); 
  }; 

  const cancelDelete = () => { 
    setDeleteModalVisible(false); 
    setTransactionToDelete(null); 
  };

  return (
    <div className={cl.paymentsPage}>
        <div className={cl.paymentsPage__header}>
            <h1 className={cl.header__title}>Платежи</h1>
            <img src={plus} alt="add payment" onClick={showModal}/>
        </div>
        <div className={cl.paymentsPage__content}>
            <FiltersComponent onFilterChange={(key, value) => console.log(key, value)}/>
            <TransactionList 
                transactions={transactions} 
                onEdit={handleEdit} 
                onHide={(index) => console.log('Hide transaction:', index)}
                onDelete={handleDelete}
            />
        </div>

        <PaymentModal 
            isModalOpen={isModalOpen} 
            handleOk={handleOk} 
            handleCancel={handleCancel} 
            tabItems={tabsItemsOnCards(handleAddTransaction)}
        />

        <DeleteTransactionModal 
            open={deleteModalVisible} 
            onConfirm={confirmDelete} 
            onCancel={() => setDeleteModalVisible(false)} 
        />

        {/* <EditTransactionModal 
            open={editModalOpen} 
            onClose={() => setEditModalOpen(false)} 
            transaction={transactionToEdit} 
            onSave={handleSaveEdit}
        /> */}
        <Footer/>
    </div>
  );
}

export default PaymentsPage;
