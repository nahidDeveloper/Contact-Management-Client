import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  '../styles/formContainer.css'




function ContactForm() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone_number: '',
      address: '',
    });
    const apiUrl = process.env.REACT_APP_API_URL;
   
    const handleRedirect = () => {
        // Redirect to another page(UseHistory not working)
        window.location.href = '/';
      };

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Send form data to the server
          const response = await axios.post(apiUrl+'/api/contacts', formData);
           // Show success toast notification
            toast.success('Contact added successfully');
            //Redirect
            handleRedirect()//To Main page
    
          // TODO: Handle the server response as needed
          console.log('Server response:', response.data);
    
          // TODO: Clear form 
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };

      return (
        <div>
        <div className="form-container" >
          <form  onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              pattern="[A-Za-z ]+" //Ensures only letters and space is allowed
              title="Only letters and spaces are allowed" //Warning message
              value={formData.name}
              onChange={handleChange}
              required
            />
    
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
    
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              pattern="[0-9]+"
              title="Only numbers are allowed"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
    
            <label htmlFor="address">Address:(Optional)</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
    
            <button type="submit">Add Contact</button>
          </form>
        </div>
        <button className="cancel-button" onClick={handleRedirect}>
        Cancel
      </button>
      </div>
      );

}

export default ContactForm;
