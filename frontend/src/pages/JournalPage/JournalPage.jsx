import React, { useEffect, useState } from 'react'
import cl from './JournalPage.module.scss'
import Footer from '../../widgets/Footer/Footer'
import { Input } from 'antd'
import JournalItem from '../../widgets/JournalItem/JournalItem';
import SendServer from '../../api/Service';

function JournalPage() {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        const fetchJournals = async () => {
            const response = await SendServer.getJournals();
            setJournals(response);
        };
        fetchJournals();
    }, []);

  return (
    <div className={cl.journalPage}>
        <div className={cl.journalPage__header}>
            <h1 className={cl.header__title}>Журнал</h1>
            <Input className={cl.journalPage__search} placeholder="Поиск" />
        </div>
        <div className={cl.journalPage__content}>
            {journals && journals.map((item, index) => <JournalItem key={index} item={item} />)}
        </div>
        <Footer/>
    </div>
  )
}

export default JournalPage