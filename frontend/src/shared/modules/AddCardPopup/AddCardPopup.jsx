import React from 'react';
import { Modal, Tabs, Input, Select, Button } from 'antd';
import cl from './AddCardPopup.module.scss';

const { TabPane } = Tabs;

const FormItem = ({ label, children }) => (
  <div className={cl.formItem}>
    <label>{label}</label> {children}
  </div>
);

const CardForm = ({ type }) => (
  <>
    <FormItem label={type === 'wallet' ? 'Название кошелька:' : 'Банк:'}>
      { 
        type === 'wallet' ? (
          <Input placeholder='example'/>
        )
        :
        <Select className={cl.input} defaultValue={type !== 'wallet' ? 'Т-Банк' : ''}>
          <Select.Option value="Т-Банк">Т-Банк</Select.Option>
          <Select.Option value="Сбербанк">Сбербанк</Select.Option>
          <Select.Option value="ВТБ">ВТБ</Select.Option>
        </Select>
      }
    </FormItem>
    <FormItem label={type === 'wallet' ? 'Остаток средств:' : 'Номер карты:'}>
      <Input className={cl.input} placeholder="example" />
    </FormItem>
    {type !== 'wallet' && (
      <FormItem label={type === 'credit' ? 'Остаток лимита:' : 'Остаток на счете:'}>
        <Input className={cl.input} placeholder="example" />
      </FormItem>
    )}
  </>
);

const AddCardPopup = ({ visible, onOk, onCancel, handleTabChange }) => {
  return (
    <Modal
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      closable={false}
      footer={null}
      width={320}
    >
        <div className={cl.addCardPopup}>
            <h2 className={cl.addCardPopup__title}>Добавление карты</h2>
            <Tabs 
                className={cl.addCardPopup__tabs} 
                defaultActiveKey="1" 
                onChange={handleTabChange}
            >
                <TabPane className={cl.tab} tab="Дебетовая" key="1">
                    <CardForm type="debit" />
                </TabPane>
                <TabPane className={cl.tab} tab="Кредитная" key="2">
                    <CardForm type="credit" />
                </TabPane>
                <TabPane className={cl.tab} tab="Кошелек" key="3">
                    <CardForm type="wallet" />
                </TabPane>
            </Tabs>
            <div className={cl.addCardPopup__btns}>
                <Button className={cl.actionBtn} type='primary' onClick={onOk}>Сохранить</Button>
            </div>
        </div>
    </Modal>
  );
};

export default AddCardPopup;
