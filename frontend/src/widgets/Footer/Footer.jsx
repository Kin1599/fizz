import React from 'react'
import cl from './Footer.module.scss'
import home from '../../shared/assets/home.svg'
import read from '../../shared/assets/read.svg'
import team from '../../shared/assets/team.svg'
import fund from '../../shared/assets/fund.svg'
import creditCard from '../../shared/assets/creditCard.svg'
import { Link, useLocation } from 'react-router-dom'

function Footer() {
    const location = useLocation();  

  return (
    <div className={cl.footer}>
        <Link to='/' className={`${cl.footer__item} ${location.pathname === '/' ? cl.active : ''}`}>
            <img src={home} alt="home" />
            <p>Главная</p>
        </Link>
        <Link to='/payments' className={`${cl.footer__item} ${location.pathname === '/payments' ? cl.active : ''}`}>
            <img src={creditCard} alt="creditCard" />
            <p>Платежи</p>
        </Link>
        <Link to='/goals' className={`${cl.footer__item} ${location.pathname === '/goals' ? cl.active : ''}`}>
            <img src={fund} alt="fund" />
            <p>Цели</p>
        </Link>
        <Link to='/family' className={`${cl.footer__item} ${location.pathname === '/family' ? cl.active : ''}`}>
            <img src={team} alt="team" />
            <p>Семья</p>
        </Link>
        <Link to='/read' className={`${cl.footer__item} ${location.pathname === '/read' ? cl.active : ''}`}>
            <img src={read} alt="read" />
            <p>Читать</p>
        </Link>
    </div>
  )
}

export default Footer