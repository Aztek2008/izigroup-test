import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import ApiFetcher from "../services/ApiFetcher";
import Filter from "../components/Filter/Filter";
import Loader from "../components/Loader/Loader";
import ContactCard from "../components/ContactCard/ContactCard";

import "../index.css";

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
    ApiFetcher.defaultContactsFetcher()
      .then((response) => response.results)
      .then((contacts) =>
        this.setState((prevState) => ({
          contacts: [...prevState.contacts, ...contacts],
          page: prevState.page + 1,
        }))
      )

      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
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
        <div className="Header">
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </div>

        {visibleContacts.length > 0 && (
          <ul className="ContactList">
            {visibleContacts.map((contact) => (
              <ContactCard key={uuidv4()} contact={contact} />
            ))}
          </ul>
        )}

        {isLoading && <Loader />}

        {contacts.length > 0 && !isLoading && (
          <button className="showMoreBtnStyle" onClick={this.handleApiFetcher}>
            <span className="buttonTitle">Show More</span>
          </button>
        )}
      </div>
    );
  }
}
