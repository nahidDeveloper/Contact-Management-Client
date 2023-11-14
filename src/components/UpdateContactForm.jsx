import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import  '../styles/formContainer.css'

function UpdateContactForm(){

    const { id } = useParams();
    const [contact, setContact] = useState({
      name: '',
      email: '',
      phone_number: '',
      address: '',
    });

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // Fetch the contact data when the component mounts
        const fetchContact = async () => {
          try {
            const response = await axios.get(apiUrl+`/api/contacts/${id}`);
            setContact(response.data);
          } catch (error) {
            console.error('Error fetching contact:', error);
          }
        };
    
        fetchContact();
      }, [id]);


      const handleRedirect = () => {
        // Redirect to another page(UseHistory not working)
        window.location.href = '/';
      };
      const handleChange = (e) => {
        setContact({
          ...contact,
          [e.target.name]: e.target.value,
        });
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Send the updated contact data to the server
          await axios.put(apiUrl+`/api/contacts/${id}`, contact);

          handleRedirect();
        } catch (error) {
          console.error('Error updating contact:', error);
        }
      };


    return(
      <div>
        <div className="form-container">
        <h2>Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            pattern="[A-Za-z ]" //Ensures only letters and space is allowed
            title="Only letters and spaces are allowed" //Warning message
            value={contact.name}
            onChange={handleChange}
            required
          />
  
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
  
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            pattern="[0-9]+"
            title="Only numbers are allowed"
            value={contact.phone_number}
            onChange={handleChange}
            required
          />
  
          <label htmlFor="address">Address:(Optional)</label>
          <input
            type="text"
            id="address"
            name="address"
            value={contact.address}
            onChange={handleChange}
          />
  
          <button type="submit">Update Contact</button>
        </form>
        
      </div>
      <button className="cancel-button" onClick={handleRedirect}>
        Cancel
      </button>
      </div>
    )
}
export default UpdateContactForm;