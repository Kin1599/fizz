import React from 'react'
import cl from './DeleteUserPopup.module.scss'
import {Modal, Button} from 'antd'
function DeleteUserPopup({visible, onClose, onDelete, userName}) {
  return (
    <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        closable={false}
    >
        <div className={cl.deleteUserPopup}>
            <p>Вы уверены, что хотите удалить пользователя {userName} из семьи?</p>
            <div className={cl.deleteUserPopup__buttons}>
                <Button type='primary' onClick={onDelete}>
                    Удалить
                </Button>
                <Button onClick={onClose}>
                    Не удалять
                </Button>
            </div>
        </div>
    </Modal>
  )
}

export default DeleteUserPopup