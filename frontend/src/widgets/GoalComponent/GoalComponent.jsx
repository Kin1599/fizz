import React from 'react'
import { Progress, Card } from 'antd'
import cl from './GoalComponent.module.scss'

function GoalComponent({goal}) {
  const {targetAmount, currentAmount, startDate, endDate, target} = goal;
  const percentage = (currentAmount / targetAmount) * 100;
  const progressColor = currentAmount < targetAmount ? '#C0FED2' : '#FEC0EC';

  return (
    <Card className={cl.card} style={{borderColor: progressColor}}>
      <div className={cl.card__header}>
        <h3>{target}</h3>
        <p>{`${startDate} - ${endDate}`}</p>
      </div>
      
      <div className={cl.card__main}>
        <Progress      
          className={cl.progress} 
          percent={percentage} 
          showInfo={false} 
          strokeColor={progressColor}
          status='active'
        />
        <p className={cl.card__amount}>{`${currentAmount}₽ / ${targetAmount}₽`}</p>
      </div>
    </Card>
  )
}

export default GoalComponent