import React, { useState } from 'react'
import cl from './GoalsPage.module.scss'
import plus from '../../shared/assets/plus.svg'
import FiltersComponent from '../../widgets/FiltersComponent/FiltersComponent'
import Footer from '../../widgets/Footer/Footer';
import GoalComponent from '../../widgets/GoalComponent/GoalComponent';

function GoalsPage() {
    const [setIsModalOpen] = useState(false);
    const [goals] = useState([
        { targetAmount: 10000, currentAmount: 5000, startDate: '01.01.2023', endDate: '31.12.2023', target: "Золотое яблоко"},
        { targetAmount: 3500, currentAmount: 5000, startDate: '01.01.2023', endDate: '31.12.2023', target: "Золотое яблоко"},
        { targetAmount: 3500, currentAmount: 5000, startDate: '01.01.2023', endDate: '31.12.2023', target: "Золотое яблоко"},
        { targetAmount: 3500, currentAmount: 5000, startDate: '01.01.2023', endDate: '31.12.2023', target: "Золотое яблоко"},
        { targetAmount: 3500, currentAmount: 5000, startDate: '01.01.2023', endDate: '31.12.2023', target: "Золотое яблоко"},
        { targetAmount: 3500, currentAmount: 5000, startDate: '01.01.2023', endDate: '31.12.2023', target: "Золотое яблоко"},
        { targetAmount: 3500, currentAmount: 5000, startDate: '01.01.2023', endDate: '31.12.2023', target: "Золотое яблоко"},
        { targetAmount: 3500, currentAmount: 5000, startDate: '01.01.2023', endDate: '31.12.2023', target: "Золотое яблоко"},
        { targetAmount: 3500, currentAmount: 5000, startDate: '01.01.2023', endDate: '31.12.2023', target: "Золотое яблоко"},
    ]);

    const showModal = () => {
        setIsModalOpen(true);
    };  

  return (
    <div className={cl.goalsPage}>
        <div className={cl.goalsPage__header}>
            <h1 className={cl.header__title}>Цели</h1>
            <img src={plus} alt="add goals" onClick={showModal}/>
        </div>
        <div className={cl.goalsPage__content}>
            <FiltersComponent onFilterChange={(key, value) => console.log(key, value)}/>
            <div className={cl.goalsPage__cards}>
                {goals && goals.map((goal, index) => (
                    <GoalComponent key={index} goal={goal}/>
                ))}
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default GoalsPage