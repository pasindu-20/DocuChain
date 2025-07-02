import React, { useState } from 'react';
import axios from 'axios';

const VerifyDocumentPage = () => {
  const [docId, setDocId] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    if (!docId.trim()) {
      alert('Please enter a Document ID');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/documents/verify/${docId}`);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Document not found or invalid.');
      setResult(null);
    }
  };

  return (
    <div className="p-10">
      <input
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
        placeholder="Enter Document ID"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleVerify}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Verify
      </button>

      {result && (
        <div className="mt-4 border p-4 bg-gray-50 rounded">
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Type:</strong> {result.docType}</p>
          <p><strong>Issued By:</strong> {result.issuer}</p>
          <p><strong>Issue Date:</strong> {result.issueDate}</p>
          <a
            href={result.ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Document
          </a>
        </div>
      )}
    </div>
  );
};

export default VerifyDocumentPage;
