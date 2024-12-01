import React, { useEffect, useState } from 'react'
import cl from './PaymentPopup.module.scss'
import { Modal, Tabs, Input, Select, Button } from 'antd'

const { TabPane } = Tabs;

function PaymentPopup({visible, onClose, onSave, payment}) {
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card'); 
    const [cardNumber, setCardNumber] = useState('');

    useEffect(() => {
        if (payment) {
            setAmount(payment.amount);
            setSource(payment.source);
            setPaymentMethod(payment.paymentMethod);
            setCardNumber(payment.cardNumber);
        }
    }, [payment]);

    const handleSave = () => {
        const savedPayment = {
            amount,
            source,
            paymentMethod,
            cardNumber
        };
        onSave(savedPayment);
        onClose();
    }

  return (
    <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        closable={false}
        width={320}
    >   
        <div className={cl.paymentPopup}>
            <h2 className={cl.paymentPopup__title}>{payment ? 'Изменение платежа' : 'Добавление платежа'}</h2>
            <Tabs defaultActiveKey='income' className={cl.paymentPopup__tabs}>
                <TabPane tab='Доход' key='income'>
                    <div className={cl.formItem}>
                        <label>Рубли:</label>
                        <Input
                            className={cl.input}
                            placeholder='example'
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                        />
                    </div>
                    <div className={cl.formItem}>
                        <label>Источник:</label>
                        <Input
                            className={cl.input}
                            value={source}
                            onChange={(event) => setSource(event.target.value)}
                        />
                    </div>
                </TabPane>
                <TabPane tab='Расход' key='outcome'>
                    <div className={cl.formItem}>
                        <label>Рубли:</label>
                        <Input 
                            className={cl.input}
                            placeholder='example'
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                        />
                    </div>
                    <div className={cl.formItem}>
                        <label>Источник:</label>
                        <Input
                            className={cl.input}
                            value={source}
                            onChange={(event) => setSource(event.target.value)}
                        />
                    </div>
                </TabPane>
            </Tabs>
            <Tabs defaultActiveKey='card' className={cl.paymentPopup__tabs}>
                <TabPane tab='Карта' key='card'>
                    <div className={cl.formItem}>
                        <label className={cl.formItem__label}>Номер</label>
                        <Select
                            className={cl.input}
                            value={cardNumber}
                            onChange={(value) => setCardNumber(value)}
                            defaultValue="Карта"
                            placeholder="Выбери карту"
                        >
                            <Select.Option value="Карта">Карта</Select.Option>
                        </Select>
                    </div>
                </TabPane>
                <TabPane tab='Наличные' key='cash'>
                    <div className={cl.formItem}>
                        <label>Наличные:</label>
                        <Input
                            className={cl.input}
                            placeholder='example'
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                        />
                    </div>
                </TabPane>
            </Tabs>
            <div className={cl.paymentPopup__btns}>
                <Button type='primary' onClick={handleSave}>Сохранить</Button>
            </div>
        </div>
    </Modal>
  )
}

export default PaymentPopup