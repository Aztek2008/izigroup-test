import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import ApiFetcher from "../../services/ApiFetcher";
import Filter from "../../components/Filter/Filter";
import Loader from "../../components/Loader";
import ContactCard from "../../components/ContactCard";

import styles from "./HomePage.module.css";

export default class HomePage extends Component {
  state = {
    contacts: [],
    page: 1,
    isLoading: false,
    filter: "",
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.handleApiFetcher();
  }

  handleApiFetcher = () => {
    try {
      ApiFetcher.defaultContactsFetcher().then((results) =>
        this.setState((prevState) => ({
          contacts: [...prevState.contacts, ...results],
          page: prevState.page + 1,
        }))
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(
      (contact) =>
        contact.cell.toLowerCase().includes(filter.toLowerCase()) ||
        contact.email.toLowerCase().includes(filter.toLowerCase()) ||
        contact.name.first.toLowerCase().includes(filter.toLowerCase()) ||
        contact.name.last.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, isLoading } = this.state;
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <div className={styles.Header}>
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </div>

        {visibleContacts.length > 0 && (
          <ul className={styles.ContactList}>
            {visibleContacts.map((contact) => (
              <ContactCard key={uuidv4()} contact={contact} />
            ))}
          </ul>
        )}

        {isLoading && <Loader />}

        {contacts.length > 0 && !isLoading && (
          <button
            className={styles.showMoreBtnStyle}
            onClick={this.handleApiFetcher}
          >
            <span className={styles.buttonTitle}>Show More</span>
          </button>
        )}
      </div>
    );
  }
}

HomePage.propTypes = {
  contacts: PropTypes.array,
  page: PropTypes.number,
  isLoading: PropTypes.bool,
  filter: PropTypes.string,
  error: PropTypes.object,
  contact: PropTypes.object,
};
