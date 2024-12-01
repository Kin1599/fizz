import React, { useState } from 'react';
import { Modal, Tabs, Input, Select, Button } from 'antd';
import cl from './AddCardPopup.module.scss';

const { TabPane } = Tabs;

const FormItem = ({ label, children }) => (
  <div className={cl.formItem}>
    <label>{label}</label> {children}
  </div>
);

const CardForm = ({ type, onChange, formData }) => (
  <>
    <FormItem label={type === 'wallet' ? 'Название кошелька:' : 'Банк:'}>
      {type === 'wallet' ? (
        <Input
          value={formData.bank_name || ''}
          onChange={(e) => onChange('bank_name', e.target.value)}
          placeholder="example"
        />
      ) : (
        <Select
          className={cl.input}
          value={formData.bank_name || ''}
          onChange={(value) => onChange('bank_name', value)}
        >
          <Select.Option value="Т-Банк">Т-Банк</Select.Option>
          <Select.Option value="Сбербанк">Сбербанк</Select.Option>
          <Select.Option value="ВТБ">ВТБ</Select.Option>
        </Select>
      )}
    </FormItem>
    <FormItem label={type === 'wallet' ? 'Остаток средств:' : 'Номер карты:'}>
      <Input
        className={cl.input}
        value={formData.card_number || ''}
        onChange={(e) => onChange('card_number', e.target.value)}
        placeholder="example"
      />
    </FormItem>
    {type !== 'wallet' && (
      <FormItem label={type === 'credit' ? 'Остаток лимита:' : 'Остаток на счете:'}>
        <Input
          className={cl.input}
          value={formData.balance || ''}
          onChange={(e) => onChange('balance', e.target.value)}
          placeholder="example"
        />
      </FormItem>
    )}
  </>
);

const AddCardPopup = ({ visible, onOk, onCancel, handleAddCard }) => {
  const [formData, setFormData] = useState({
    cardType: 'debit',
    bank_name: '',
    card_number: '',
    balance: ''
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = () => {
    handleAddCard(formData);
    onOk();
  };

  return (
    <Modal
      open={visible}
      onOk={handleSave}
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
                onChange={(key) =>
                  handleInputChange('cardType', key === '1' ? 'debit' : key === '2' ? 'credit' : 'wallet')
                }
            >
                <TabPane className={cl.tab} tab="Дебетовая" key="1">
                    <CardForm type="debit" formData={formData} onChange={handleInputChange} />
                </TabPane>
                <TabPane className={cl.tab} tab="Кредитная" key="2">
                    <CardForm type="credit" formData={formData} onChange={handleInputChange} />
                </TabPane>
                <TabPane className={cl.tab} tab="Кошелек" key="3">
                    <CardForm type="wallet" formData={formData} onChange={handleInputChange} />
                </TabPane>
            </Tabs>
            <div className={cl.addCardPopup__btns}>
                <Button className={cl.actionBtn} type='primary' onClick={handleSave}>Сохранить</Button>
            </div>
        </div>
    </Modal>
  );
};

export default AddCardPopup;
