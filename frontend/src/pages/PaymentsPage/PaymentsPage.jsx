import React, { useEffect, useState } from 'react';
import cl from './PaymentsPage.module.scss';
import plus from '../../shared/assets/plus.svg';
import Footer from '../../widgets/Footer/Footer';
import DeleteTransactionModal from '../../shared/modules/DeleteTransactionModal/DeleteTransactionModal';
import FiltersComponent from '../../widgets/FiltersComponent/FiltersComponent';
import TransactionList from '../../widgets/TransactionList/TransactionList';
import PaymentPopup from '../../shared/modules/PaymentPopup/PaymentPopup';
import SendServer from '../../api/Service';


function PaymentsPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [paymentToEdit, setPaymentToEdit] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);


  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await SendServer.getTransactions();
      console.log(response);
      setTransactions(response);
    };
    fetchTransactions();
  }, []);

  const handleSaveTransaction = async (transaction) => { 
    if (paymentToEdit) { 
      // Редактирование существующей транзакции 
      try { 
        const updatedTransaction = await SendServer.updateTransaction(transaction.id, transaction); 
        setTransactions(transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)); 
        setPaymentToEdit(null); 
      } catch (error) { 
          console.error("Ошибка при обновлении транзакции:", error); 
      } 
    } else { 
        try { 
          const addedTransaction = await SendServer.addTransaction(transaction); 
          setTransactions([...transactions, addedTransaction]); 
        } catch (error) { 
          console.error("Ошибка при добавлении транзакции:", error); 
        } 
    } setIsPopupOpen(false); 
  };

  const showPaymentPopup = (payment = null) => {
    setPaymentToEdit(payment);
    setIsPopupOpen(true);
  };

  const hidePaymentPopup = () => {
    setIsPopupOpen(false);
    setPaymentToEdit(null);
  };

  const handleDelete = (index) => {
    setTransactionToDelete(index);
    setDeleteModalVisible(true);
  }

  const confirmDelete = async () => { 
    const transactionId = transactions[transactionToDelete].id;
    console.log(transactionId);
    try{
      await SendServer.deleteTransaction(transactionId);
      setTransactions(transactions.filter((_, i) => i !== transactionToDelete)); 
    } catch (error){
      console.log("Ошибка при удалении транзакции:", error);
    }
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
            <img src={plus} alt="add payment" onClick={() => showPaymentPopup()}/>
        </div>
        <div className={cl.paymentsPage__content}>
            <FiltersComponent onFilterChange={(key, value) => console.log(key, value)}/>
            <TransactionList 
                transactions={transactions} 
                onEdit={showPaymentPopup} 
                onHide={(index) => console.log('Hide transaction:', index)}
                onDelete={handleDelete}
            />
        </div>

        <PaymentPopup 
            visible={isPopupOpen} 
            onClose={hidePaymentPopup} 
            onSave={handleSaveTransaction} 
            payment={paymentToEdit}
        />

        <DeleteTransactionModal 
            open={deleteModalVisible} 
            onConfirm={confirmDelete} 
            onCancel={cancelDelete} 
        />
        <Footer/>
    </div>
  );
}

export default PaymentsPage;
