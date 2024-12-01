import React from 'react';
import { Modal, Button } from 'antd';
import cl from './DeleteTransactionModal.module.scss';

const DeleteTransactionModal = ({open, onConfirm, onCancel }) => {
  return (
    <Modal
        className={cl.deleteModal}
        title="Удаление платежа"
        open={open}
        onCancel={onCancel}
        footer={[
            <Button key="back" onClick={onCancel}>
            Не удалять
            </Button>,
            <Button key="submit" type="primary" onClick={onConfirm}>
            Удалить
            </Button>,
        ]}
    >
      <p>Вы уверены, что хотите удалить этот платеж из истории?</p>
    </Modal>
  );
};

export default DeleteTransactionModal;
