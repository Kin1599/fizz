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
        width={320}
    >
        <div className={cl.deleteUserPopup}>
            <p className={cl.deleteUserPopup__text}>Вы уверены, что хотите удалить пользователя {userName} из семьи?</p>
            <div className={cl.deleteUserPopup__btns}>
                <Button className={cl.actionBtn} type='primary' onClick={onDelete}>
                    Удалить
                </Button>
                <Button className={cl.actionBtn} onClick={onClose}>
                    Не удалять
                </Button>
            </div>
        </div>
    </Modal>
  )
}

export default DeleteUserPopup