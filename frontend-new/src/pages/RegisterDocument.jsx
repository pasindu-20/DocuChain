import React, { useState } from 'react';
import axios from 'axios';

const RegisterDocumentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    docType: '',
    issueDate: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const issuer = localStorage.getItem('walletAddress');
    if (!issuer) {
      alert('Wallet address not found. Please login first.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('docType', formData.docType);
    data.append('issueDate', formData.issueDate);
    data.append('file', formData.file);
    data.append('issuer', issuer);

    try {
      const res = await axios.post('http://localhost:5000/api/documents/register', data);
      alert(`Document NFT minted! ID: ${res.data.nftId}`);
    } catch (err) {
      console.error(err);
      alert('Error uploading document');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 space-y-4">
      <input
        name="name"
        onChange={handleChange}
        placeholder="Document Name"
        className="border p-2 w-full"
        required
      />
      <input
        name="docType"
        onChange={handleChange}
        placeholder="Document Type"
        className="border p-2 w-full"
        required
      />
      <input
        name="issueDate"
        onChange={handleChange}
        type="date"
        className="border p-2 w-full"
        required
      />
      <input
        name="file"
        onChange={handleChange}
        type="file"
        className="border p-2 w-full"
        accept=".pdf,.jpg,.jpeg,.png"
        required
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Mint NFT
      </button>
    </form>
  );
};

export default RegisterDocumentPage;
