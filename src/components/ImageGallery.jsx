import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore('images');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  // Function to filter images based on search query
  const filteredImages = images.filter((image) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const userEmail = image.userEmail.toLowerCase();
    const tags = image.tags || []; // Handle images without tags
    const containsTag = tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery));
    return userEmail.includes(lowerCaseQuery) || containsTag;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by user email or tags"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered"
        />
      </div>
      <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
        {filteredImages.map((image) => (
          <div key={image.imageUrl} className="card card-compact w-full bg-base-100 shadow-xl">
            <figure className="max-h-[15rem]">
              <img src={image.imageUrl} alt="" />
            </figure>
            <div className="card-body">
              <p>Upload by: {image.userEmail}</p>
              <span>Created on: {image.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
