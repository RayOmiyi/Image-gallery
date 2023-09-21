import React, { useState } from 'react';
import { BsFillRocketTakeoffFill } from 'react-icons/bs';
import useStorage from '../hooks/useStorage';
import { useAuth } from '../hooks/useAuth';
import { useDropzone } from 'react-dropzone';
import './UploadForm.css'
const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { startUpload, progress } = useStorage();
  const { user } = useAuth();

  // Define a callback function for handling dropped files
  const onDrop = (acceptedFiles) => {
    // Assuming you only want to handle one file at a time
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  // Use the useDropzone hook to set up the drop zone area
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', // Accept only image files
    multiple: false, // Allow only one file to be dropped at a time
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      // Start the upload process
      startUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <div className='text-center mt-10'>
      <form onSubmit={handleSubmit} className='flex items-center flex-col gap-8'>
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'active' : ''}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here</p>
          ) : (
            <p>Drag & drop an image here or click to select one</p>
          )}
        </div>
        {selectedFile && (
          <p>Selected file: {selectedFile.name}</p>
        )}
        <button
          type='submit'
          className={`btn gap-3 ${Boolean(progress) && 'loading'}`}
          disabled={!selectedFile}
        >
          Upload<BsFillRocketTakeoffFill />
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
