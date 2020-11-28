import React from "react";
import s from "./ContactCard.module.css";

const ContactCard = ({ contact }) => (
  <li className={s.ContactCard}>
    <img
      src={contact.picture.large}
      alt={`User ${contact.name.first}`}
      className={s.ItemImage}
    />
    <div className={s.TitleContainer}>
      <p
        className={s.ItemTitle}
      >{`${contact.name.title}. ${contact.name.first} ${contact.name.last}`}</p>
      <div>Cellphone: {contact.cell}</div>
      <div>E-mail: {contact.email}</div>
    </div>
  </li>
);

export default ContactCard;
