import React from 'react'
import cl from './JournalItem.module.scss'
import { Button } from 'antd'
function JournalItem({item}) {
    const {title, content, date, tags} = item;
  return (
    <div className={cl.journalItem}>
        <div className={cl.journalItem__title}>{title}</div>
        <div className={cl.journalItem__content}>
            <p>{content}</p>
            <div className={cl.journalItem__date}>{date}</div>
            <div className={cl.journalItem__tags}>{tags && tags.map((item, index) => <span key={index}>{item}</span>)}</div>
        </div>
        <div className={cl.journalItem__btns}>
            <Button className={cl.actionBtn} type='primary'>Прочитать</Button>
        </div>
    </div>
  )
}

export default JournalItem