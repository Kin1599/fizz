import React from 'react'
import cl from './PaymentModal.module.scss'
import { Modal, Tabs } from 'antd'

function PaymentModal({isModalOpen, handleOk, handleCancel, tabItems}) {
  return (
    <Modal title="Добавление платежа" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Tabs
            className={cl.paymentsPage__tabs}
            defaultActiveKey="1"
            items={tabItems}
            tabBarStyle={{
              colorActive: '#C0CDFE',
            }}
        />
    </Modal>
  )
}

export default PaymentModal