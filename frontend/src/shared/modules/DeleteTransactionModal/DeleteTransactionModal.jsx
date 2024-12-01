import React from 'react';
import { Modal, Button } from 'antd';
import cl from './DeleteTransactionModal.module.scss';

const DeleteTransactionModal = ({open, onConfirm, onCancel }) => {
  return (
    <Modal
        open={open}
        closable={false}
        onCancel={onCancel}
        width={320}
        footer={false}
    >
      <div className={cl.deleteModal}>
        <p className={cl.deleteModal__text}>Вы уверены, что хотите удалить этот платеж из истории?</p>
        <div className={cl.deleteModal__buttons}>
          <Button className={cl.actionBtn} type='primary' onClick={onConfirm}>Удалить</Button>
          <Button className={cl.actionBtn} onClick={onCancel}>Отменить</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTransactionModal;
