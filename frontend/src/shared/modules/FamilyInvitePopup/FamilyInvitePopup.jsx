import React from 'react';
import { Modal, Button, Input } from 'antd';
import { MailOutlined, MessageOutlined, WhatsAppOutlined } from '@ant-design/icons';
import cl from './FamilyInvitePopup.module.scss';

const FamilyInvitePopup = ({ visible, onClose, inviteLink }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={320}
      closable={false}
    >
      <div className={cl.familyInvitePopup}>
        <h2 className={cl.familyInvitePopup__title}>Отправьте эту ссылку добавляемому пользователю</h2>
        <Input value={inviteLink} readOnly className={cl.familyInvitePopup__link} />
        <div className={cl.familyInvitePopup__icons}>
          <Button className={cl.icon_btn} icon={<MailOutlined />} />
          <Button className={cl.icon_btn} icon={<MessageOutlined />} />
          <Button className={cl.icon_btn} icon={<WhatsAppOutlined />} />
        </div>
      </div>
    </Modal>
  );
}

export default FamilyInvitePopup;
