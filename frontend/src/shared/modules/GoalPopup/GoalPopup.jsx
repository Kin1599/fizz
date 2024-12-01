import React, { useEffect, useState } from 'react'
import cl from './GoalPopup.module.scss'
import { Modal, Input, DatePicker, Button, Tabs, Select } from 'antd'

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

function GoalPopup({visible, onClose, onSave, goal}) {
    const [limit, setLimit] = useState('');
    const [selectedTab, setSelectedTab] = useState('store');
    const [selectedOption, setSelectedOption] = useState('');
    const [dateRange, setDateRange] = useState([]);

    useEffect(() => {
        if (goal) {
            setLimit(goal.targetAmount);
            setSelectedTab(goal.type);
            setSelectedOption(goal.target);
            setDateRange(goal.dateRange);    
        }
    }, [goal]);

    const handleSave = () => {
        const savedGoal = {
            targetAmount: limit,
            type: selectedTab,
            target: selectedOption,
            dateRange
        }
        onSave(savedGoal);
        onClose();
    }

  return (
    <Modal 
        open={visible}
        onCancel={onClose}
        footer={null}
        closable={false}
        width={340}
    >   
        <div className={cl.goalPopup}>
            <h2 className={cl.goalPopup__title}>{goal ? "Изменение цели" : "Добавление цели"}</h2>
            <div className={cl.goalPopup__formItem}>
                <label>Лимит суммы</label>
                <Input 
                    className={cl.goalPopup__input}
                    placeholder='Лимит суммы' 
                    value={limit} 
                    onChange={(e) => setLimit(e.target.value)}
                />
            </div>
            <Tabs className={cl.goalPopup__tabs} activeKey={selectedTab} onChange={setSelectedTab}> 
                <TabPane tab="Магазин" key="store"> 
                    <Select className={cl.goalPopup__select} placeholder="Выберите магазин" value={selectedOption} onChange={setSelectedOption} > 
                        <Select.Option value="Золотое яблоко">Золотое яблоко</Select.Option>
                    </Select> 
                </TabPane> 
                <TabPane tab="Категория" key="category"> 
                    <Select className={cl.goalPopup__select} placeholder="Выберите категорию" value={selectedOption} onChange={setSelectedOption} > 
                        <Select.Option value="Категория 1">Категория 1</Select.Option> 
                    </Select> 
                </TabPane> 
                <TabPane tab="Группа" key="group"> 
                    <Select className={cl.goalPopup__select} placeholder="Выберите группу" value={selectedOption} onChange={setSelectedOption} > 
                        <Select.Option value="Группа 1">Группа 1</Select.Option> 
                    </Select> 
                </TabPane> 
            </Tabs>
            <div className={cl.goalPopup__formItem}>
                <label>Период</label>
                <RangePicker value={dateRange} onChange={setDateRange}/>
            </div>
            <div className={cl.goalPopup__btns}>
                <Button type='primary' onClick={handleSave} className={cl.saveButton}>
                    Сохранить
                </Button>
            </div>
        </div>
    </Modal>
  )
}

export default GoalPopup