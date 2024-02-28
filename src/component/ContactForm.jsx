import React, { useState, useEffect } from 'react';
import { useContactContext } from '../Hooks/ContactContext';
import { useNavigate, useParams } from 'react-router-dom';
import './ContactForm.css';

function ContactForm() {
  const { addContact, editContact, contacts } = useContactContext();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 100001),
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if userId is provided in the URL params
    if (userId) {
      const contact = contacts.find((contact) => contact.id === parseInt(userId, 10));

      // If contact is found, auto-fill the form
      if (contact) {
        setFormData({
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
        });
      }
    }
  }, [userId, contacts]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    // If there are validation errors, update the state and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit the form data
    if (userId) {
      // If userId is provided, it's an edit operation
      editContact(formData);
    } else {
      // If userId is not provided, it's an add operation
      addContact(formData);
    }

    // Show a pop-up message
    window.alert(userId ? 'Contact updated successfully!' : 'Contact added successfully!');

    // Reset form data and errors after submission
    setFormData({
      id: Math.floor(Math.random() * 100001),
      name: '',
      email: '',
      phone: '',
    });
    setErrors({});

    // Navigate to user list
    navigate('/');
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{userId ? 'Edit Contact' : 'Add Contact'}</div>
        <div className="underline"></div>
        <div className="inputs">
          <div className="input">
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="input">
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="input">
            <input
              type='text'
              placeholder='Phone-Number'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            {userId ? 'Update' : 'Submit'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
