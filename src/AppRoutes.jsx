import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import ContactList from './pages/contacts/ContactList'
import AddContact from './pages/contacts/AddContact'
import UpdateContact from './pages/contacts/UpdateContact'

function AppRoutes() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<ContactList/>} />
          <Route path="/add-contact" element={<AddContact/>}/>
          <Route path="/update-contact/:id" element={<UpdateContact/>}/>

        </Routes>
      </Router>
    );
  }
  
  export default AppRoutes;