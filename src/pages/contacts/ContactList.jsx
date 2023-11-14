// src/ContactList.js
import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/contactList.css';
import _ from 'lodash';

function ContactList() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('name');//First Value name


  const debouncedSearch = useCallback(
    _.debounce((term,filter) => {
      fetchContacts(term,filter);
    }, 300),
    [] // Empty dependency array to ensure that the function is memoized
  );

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Debounce the search function call
    debouncedSearch(value,filterColumn);
  };

  useEffect(() => {
    fetchContacts();

    return () => {
      debouncedSearch.cancel();
    };
    
  }, [filterColumn,debouncedSearch]);

  async function fetchContacts(term='',filter='') {
    try {
      const response = await axios.get(apiUrl+`/api/contacts?search=${term}&filter=${filter}`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }

  const handleDelete = (contactId, contactName) => {
    // Show a confirmation dialog with contact name
    const isConfirmed = window.confirm(`Are you sure you want to delete ${contactName}?`);
    
    // If user confirms, call the onDelete function
    if (isConfirmed) {
      onDelete(contactId);
    }
  };

  const onDelete = async (contactId)=>{
    try {
     
      await axios.delete(apiUrl+`/api/contacts/${contactId}`);
  
      // Update the local state to reflect the deletion
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }

  }

  return (
    <div>
      <h2 className="contacts-header">Contacts</h2>
      <input
  type="text"
  placeholder="Search"
  value={searchTerm}
  onChange={handleSearchChange}
/>
      <select value={filterColumn} onChange={(e) => setFilterColumn(e.target.value)}>
  <option value="name">Name</option>
  <option value="email">Email</option>
  <option value="phone_number">Phone Number</option>
  <option value="address">Address</option>
</select>
       <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone_number}</td>
              <td>{contact.address}</td>
              <td>
              <Link to={`/update-contact/${contact.id}`}>
                  <button className="edit-button">
                    <i data-feather="edit"></i> Edit
                  </button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(contact.id, contact.name)}>
                  <i data-feather="trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-contact"> {/* Link to navigate to the AddContact page */}
        <button className="add-button">+</button>
      </Link>
    </div>
  );
}

export default ContactList;
