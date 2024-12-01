import React from 'react'
import cl from './Header.module.scss'
import robot from '../../shared/assets/robot.svg'
import settings from '../../shared/assets/settings.svg'

function Header({name}) {
  return (
    <div className={cl.header}>
        <h1 className={cl.header__title}>Добрый день, {name}</h1>
        <div className={cl.header__tools}>
            <img src={robot} alt="robot-ai" />
            <img src={settings} alt="settings" />
        </div>
    </div>
  )
}

export default Header