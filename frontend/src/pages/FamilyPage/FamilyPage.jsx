import React, { useState } from 'react'
import cl from './FamilyPage.module.scss'
import userAdd from '../../shared/assets/userAdd.svg'
import Footer from '../../widgets/Footer/Footer.jsx'
import FamilyItem from '../../shared/modules/FamilyItem/FamilyItem.jsx';
import DeleteUserPopup from '../../shared/modules/DeleteUserPopup/DeleteUserPopup.jsx';
import FamilyInvitePopup from '../../shared/modules/FamilyInvitePopup/FamilyInvitePopup.jsx';

function FamilyPage() {
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [openInvitePopup, setOpenInvitePopup] = useState(false);
    const [userToDelete, setUserToDelete] = useState('');
    const [relatives, setRelatives] = useState([
        {name: 'Максим', description: 'Взрослый'},
        {name: 'Екатерина', description: 'Ребенок'},
        {name: 'Виктория', description: 'Ребенок'},
    ]);

    const handleOpenDeletePopup = (userName) => { 
        setUserToDelete(userName); 
        setOpenDeletePopup(true); 
    }; 
    
    const handleCloseDeletePopup = () => { 
        setOpenDeletePopup(false); 
        setUserToDelete(''); 
    }; 
    
    const handleDeleteUser = () => { 
        setRelatives(relatives.filter(relative => relative.name !== userToDelete)); 
        handleCloseDeletePopup(); 
    };

    const handleOpenInvitePopup = () => {
        setOpenInvitePopup(true);
    };

    const handleCloseInvitePopup = () => {
        setOpenInvitePopup(false);
    };

    const inviteLink = 'https://finfairy/family/invite/hxHubPWj';

  return (
    <div className={cl.familyPage}>
        <div className={cl.familyPage__header}>
            <h1 className={cl.header__title}>Семья</h1>
            <img src={userAdd} alt="add users" onClick={handleOpenInvitePopup}/>
        </div>
        <div className={cl.familyPage__content}>
            {
                relatives && relatives.map((relative, index) => (
                    <FamilyItem 
                        key={index} 
                        name={relative.name} 
                        description={relative.description} 
                        onDelete={() => handleOpenDeletePopup(relative.name)}
                    />
                ))
            }
        </div>
        <Footer/>
        <DeleteUserPopup
            visible={openDeletePopup}
            onClose={handleCloseDeletePopup}
            onDelete={handleDeleteUser}
            userName={userToDelete}
        />
        <FamilyInvitePopup
            visible={openInvitePopup}
            onClose={handleCloseInvitePopup}    
            inviteLink={inviteLink}
        />
    </div>
  )
}

export default FamilyPage