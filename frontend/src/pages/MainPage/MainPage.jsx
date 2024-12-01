import React, { useEffect, useState } from 'react';
import cl from './MainPage.module.scss';
import { Tabs } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie,
} from 'recharts';
import Header from '../../widgets/Header/Header';
import Footer from '../../widgets/Footer/Footer';
import '../../shared/styles/App.scss';
import CreditCard from '../../widgets/CreditCard/CreditCard';
import AddCard from '../../shared/modules/AddCard/AddCard';
import AddCardPopup from '../../shared/modules/AddCardPopup/AddCardPopup';
import SendServer from '../../api/Service';

const DATA = {
  monthly: [
    { name: 'Январь', income: 4000, expenses: 2400 },
    { name: 'Февраль', income: 3000, expenses: 1398 },
    { name: 'Март', income: 2000, expenses: 9800 },
    { name: 'Апрель', income: 2780, expenses: 3908 },
    { name: 'Май', income: 1890, expenses: 4800 },
    { name: 'Июнь', income: 2390, expenses: 3800 },
    { name: 'Июль', income: 3490, expenses: 4300 },
  ],
  weekly: [
    { name: 'Неделя 1', income: 3000, expenses: 2400 },
    { name: 'Неделя 2', income: 2000, expenses: 1398 },
    { name: 'Неделя 3', income: 2780, expenses: 3908 },
    { name: 'Неделя 4', income: 1890, expenses: 4800 },
  ],
  daily: [
    { name: 'Понедельник', income: 4000, expenses: 2400 },
    { name: 'Вторник', income: 3000, expenses: 1398 },
    { name: 'Среда', income: 2000, expenses: 9800 },
    { name: 'Четверг', income: 2780, expenses: 3908 },
    { name: 'Пятница', income: 1890, expenses: 4800 },
    { name: 'Суббота', income: 2390, expenses: 3800 },
    { name: 'Воскресенье', income: 3490, expenses: 4300 },
  ],
};

const pieChartData = [
  { name: 'Продукты', value: 12.5, fill: '#ffdd6b' },
  { name: 'Транспорт', value: 12.5, fill: '#fd94c8' },
  { name: 'Развлечения', value: 12.5, fill: '#92f5b3' },
  { name: 'Аптеки', value: 12.5, fill: '#9ec9f5' },
  { name: 'Кафе и рестораны', value: 12.5, fill: '#b184d9' },
  { name: 'Фаст-фуд', value: 12.5, fill: '#bfffa9' },
  { name: 'Заправки', value: 12.5, fill: '#f7a9d7' },
  { name: 'Косметика', value: 12.5, fill: '#b7e0f8' },
];

const CategoryList = () => (
  <div className={cl.categoryList}>
    {pieChartData.map((entry, index) => (
      <div key={index} className={cl.categoryItem}>
        <span
          style={{ backgroundColor: entry.fill }}
          className={cl.categoryColor}
        ></span>
        {entry.name} {entry.value}%
      </div>
    ))}
  </div>
);

const calculateSummary = (data) => {
  const totalRevenues = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
  return {
    income: totalRevenues,
    expenses: totalExpenses,
    netIncome: totalRevenues - totalExpenses,
  };
};

const SummaryInfo = ({ summary }) => (
  <div className={cl.tabs__info}>
    <p className={cl.info_title}>Средний доход: {summary.income}</p>
    <p className={cl.info_title}>Средний расход: {summary.expenses}</p>
    <p className={cl.info_title}>Средняя доступная к инвестициям сумма: {summary.netIncome}</p>
  </div>
);

const MainPage = () => {
  const [barChartData, setBarChartData] = useState(DATA.monthly);
  const [summary, setSummary] = useState(calculateSummary(DATA.monthly));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState([]);


  useEffect(() => {
    const getCards = async () => {
      const response = await SendServer.getCards();
      console.log(response);
      setCards(response);
    }
    
    getCards();
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleTabChange = (key) => {
    const dataKeyMap = {
      '1': 'monthly',
      '2': 'weekly',
      '3': 'daily',
    };
    const selectedData = DATA[dataKeyMap[key]];
    setBarChartData(selectedData);
    setSummary(calculateSummary(selectedData));
  };

  const tabsItems = [
    { key: '1', label: 'По месяцам', children: <SummaryInfo summary={summary} /> },
    { key: '2', label: 'По неделям', children: <SummaryInfo summary={summary} /> },
    { key: '3', label: 'По дням', children: <SummaryInfo summary={summary} /> },
  ];

  const handleAddCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  return (
    <div className={cl.mainPage}>
      <Header name="Дарья" />
      <div className={cl.mainPage__content}>
        <h2 className={cl.mainPage__title}>График доходов и расходов</h2>
        <BarChart
          width={280}
          height={270}
          data={barChartData}
          margin={{ top: 30, right: 30, left: 20 }}
          barCategoryGap={15}
          style={{ margin: '0 auto' }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" name="Доходы" />
          <Bar dataKey="expenses" fill="#8884d8" name="Расходы" />
        </BarChart>
        <Tabs 
          className={cl.mainPage__tabs} 
          defaultActiveKey="1" 
          items={tabsItems} 
          onChange={handleTabChange}
          tabBarStyle={{
            colorActive: '#C0CDFE',
          }}
          />

        <h2 className={cl.mainPage__title}>График расходов по категориям</h2>
        <PieChart 
          width={280} 
          height={270}
          style={{ margin: '0 auto' }}
        >
          <Pie
            data={pieChartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            labelLine={false}
          />
          <Tooltip />
        </PieChart>
        <CategoryList />
        <h2 className={cl.mainPage__title}>Информация о банковских картах</h2>
        <div className={cl.mainPage__cards}>
          {cards && cards.map((card, index) => (
            <CreditCard key={index} card={card} />
          ))}
          <AddCard onClick={showModal} />
        </div>
        <AddCardPopup 
          visible={isModalOpen} 
          onCancel={handleCancel} 
          onOk={handleOk}
          handleAddCard={handleAddCard}
        />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
