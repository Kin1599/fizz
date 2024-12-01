import React, { useState } from 'react'
import { Button, Input } from 'antd'
import '../../shared/styles/App.scss' 
import cl from './AuthPage.module.scss'
import SendServer from '../../api/Service';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsAuth, setEmail, setPassword, email, password }) => {
    const navigate = useNavigate();
    const handleLogin = async () => {
        const response = await SendServer.login(email, password);
        console.log(response);

        if (response?.status === 200) { 
            navigate('/');
        }
    };

    return(
        <div className={cl.auth__entry}> 
            <div className={cl.auth__inputs}> 
                <Input placeholder='Логин' onChange={(e) => setEmail(e.target.value)} value={email} /> 
                <Input.Password placeholder='Пароль' onChange={(e) => setPassword(e.target.value)} value={password} /> 
            </div> 
            <Button type='primary' className={cl.auth__btn} onClick={handleLogin}>Войти</Button> 
            <h4 className={cl.no_profile}> Нет аккаунта? <span className={cl.auth__link} onClick={() => setIsAuth(false)}>Зарегистрироваться</span></h4> 
        </div> 
    )
};

const RegistrationForm = ({ setIsAuth, setOpenConsent, setEmail, setPassword, email, password }) => {
    
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleRegistration = () => {
        setOpenConsent(true);
    };

    return (
        <div className={cl.auth__registration}> 
            <div className={cl.auth__inputs}> 
                <Input placeholder='Логин' onChange={(e) => setEmail(e.target.value)} value={email}/> 
                <Input.Password placeholder='Пароль' onChange={(e) => setPassword(e.target.value)} value={password}/> 
                <Input.Password placeholder='Повтор пароля' onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm}/> 
                <Button type='primary' className={cl.auth__btn} onClick={handleRegistration}>Зарегистрироваться</Button> 
                <h4 className={cl.no_profile}> Уже есть аккаунт? <span className={cl.auth__link} onClick={() => setIsAuth(true)}>Войти</span></h4> 
            </div> 
        </div> 
    );
};

const ConsentForm = ({ email, password}) => {
    const navigate = useNavigate();
    
    const handleRegistration = async (isConsent) => {
        console.log(isConsent, email, password);
        const response = await SendServer.registration(email, password, isConsent);
        console.log(response);

        if (response?.status === 200) { 
            navigate('/');
        }
    };

    return (
        <div className={cl.auth__collection}>
            <h1 className={cl.auth__title}>Согласие на предоставление данных</h1>
            <h4 className={cl.collection__main}>Мы просим вас разрешить приложению FinFairy получать сведения о банковских операциях по вашим счетам для полного функционала приложения. <span>Подробнее</span></h4>
            <div className={cl.collection__choose}>
                <Button className={cl.choose__btn} onClick={() => handleRegistration(true)}>Согласен</Button>
                <Button className={cl.choose__btn} onClick={() => handleRegistration(false)}>Не согласен</Button>
            </div>
        </div>
    );
};

function AuthPage() {
    const [isAuth, setIsAuth] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openConsent, setOpenConsent] = useState(false);

  return (
    <div className={cl.auth}>
        {
            openConsent ? <ConsentForm email={email} password={password}/> : 
            <div>
                <h1 className={cl.auth__title}>Добро пожаловать!</h1>
                <div className={cl.auth_avatar}></div>
                {
                    isAuth 
                    ? 
                    <LoginForm 
                        setIsAuth={setIsAuth} 
                        setEmail={setEmail} 
                        setPassword={setPassword} 
                        email={email} 
                        password={password} 
                    /> 
                    : 
                    <RegistrationForm 
                        setIsAuth={setIsAuth} 
                        setOpenConsent={setOpenConsent}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        email={email}
                        password={password}
                    />}
            </div>
        }
    </div>
  )
}

export default AuthPage