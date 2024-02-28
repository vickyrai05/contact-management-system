// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useContactContext } from '../Hooks/ContactContext'; // Update this import statement
// import './ContactList.css';

// const ContactLists = () => {
//   const navigate = useNavigate();
//   const { contacts, deleteContact } = useContactContext(); // Use your actual context and methods
//    console.log(contacts)
//   const handleDelete = (userId) => {
//     // Implement delete action here
//     console.log('Delete user with ID:', userId);
//     // Call the deleteContact method from the context
//    deleteContact(userId); // Make sure deleteContact is defined in your context
//   };
//   const handleEdit = (userId) => {
//     // Implement edit action here
//     navigate(`/contactForm/${userId}`); // Use a forward slash and curly braces around the parameter
//     console.log('Edit user with ID:', userId);
//   };
//   const filteredUsers = users.filter((user) =>
//     user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
//   );


//   return (
//     <div className="w3-container">
//       <h2>Contact Lists</h2>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <button className="btn-add" onClick={() => navigate('/ContactForm')}>
//         Add Contact
//       </button>

//       <table className="w3-table-all">
//         <thead>
//           <tr className="w3-red">
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {contacts.length === 0 ? (
//             <tr>
//               <td colSpan="4">No data available</td>
//             </tr>
//           ) : (
//             contacts.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phone}</td>
//                 <td>
//                   <button onClick={() => handleEdit(user.id)} className="btn-edit">
//                     Edit
//                   </button>
//                   <button onClick={() => handleDelete(user.id)} className="btn-delete">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ContactLists;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContactContext } from '../Hooks/ContactContext';
import './ContactList.css';

const ContactLists = () => {
  const navigate = useNavigate();
  const { contacts, deleteContact } = useContactContext();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (userId) => {
    // Implement delete action here
    console.log('Delete user with ID:', userId);
    // Call the deleteContact method from the context
    deleteContact(userId); // Make sure deleteContact is defined in your context
  };

  const handleEdit = (userId) => {
    // Implement edit action here
    navigate(`/contactForm/${userId}`); // Use a forward slash and curly braces around the parameter
    console.log('Edit user with ID:', userId);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w3-container">
      <h2>Contact Lists</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <input type="text"  placeholder='Search by name,email or phone...'/> */}
      </div>
     
      <button className="btn-add" onClick={() => navigate('/ContactForm')}>
        Add Contact
      </button>

      <table className="w3-table-all">
        <thead>
          <tr className="w3-red">
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length === 0 ? (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          ) : (
            filteredContacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button onClick={() => handleEdit(contact.id)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(contact.id)} className="btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactLists;

