import  { useState } from 'react';
import axios from 'axios';
import '../Style/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3003/submit-form', formData); // Assuming backend server is running on localhost:5000
      alert('Message submitted successfully');
      // Reset form fields after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('Error submitting message');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>Have questions or feedback about Farmer Assistance? We should love to hear from you!</p>
      <p>Reach out to us via email at <a href="mailto:farmer.assistant.2024@gmail.com">farmer.assistant.2024@gmail.com</a>, or fill out the form below:</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
