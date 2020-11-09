const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuid} = require('uuid');
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

// Create the BlobServiceClient object which will be used to create a container client
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Create a unique name for the container
const containerName = 'posts';

// Get a reference to a container
const containerClient = blobServiceClient.getContainerClient(containerName);

async function uploadFile(file) {
	const blobName = file.filename;
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  console.log("Now",file);
	console.log('\nUploading to Azure storage as blob:\n\t', blobName);

	// Upload data to the blob
	const uploadBlobResponse = await blockBlobClient.uploadFile(file.path);
	console.log(uploadBlobResponse);
	console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
	return uploadBlobResponse;
}

module.exports = uploadFile;
