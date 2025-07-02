const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { NFTStorage, File } = require('nft.storage');
const Document = require('../models/Document');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const nftClient = new NFTStorage({ token: process.env.WEB3STORAGE_TOKEN });

async function uploadToIPFS(filePath) {
  const content = await fs.promises.readFile(filePath);
  const file = new File([content], path.basename(filePath));
  const cid = await nftClient.storeBlob(file);
  return `https://${cid}.ipfs.nftstorage.link`;
}

router.post('/register', upload.single('file'), async (req, res) => {
  const { name, docType, issueDate, issuer } = req.body;
  const localPath = req.file.path;

  try {
    const ipfsUrl = await uploadToIPFS(localPath);
    fs.unlinkSync(localPath); // Clean up uploaded file

    const newDoc = new Document({
      name,
      docType,
      issueDate,
      ipfsUrl,
      issuer,
    });

    await newDoc.save();
    res.json({ nftId: newDoc._id });
  } catch (error) {
    console.error('IPFS Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload to IPFS' });
  }
});

router.get('/verify/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    res.json(doc);
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;