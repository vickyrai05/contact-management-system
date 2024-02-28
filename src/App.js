import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactLists from './component/ContactLists.jsx';
import ContactForm from './component/ContactForm.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactLists />} />
        <Route path="/contactForm" element={<ContactForm />} />
        <Route path="/contactForm/:userId" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;
