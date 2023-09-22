import React, { useState, useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore('images');
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedImages, setDraggedImages] = useState([]); // State to keep track of the order of images

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Update the state with the new order when images change
  useEffect(() => {
    setDraggedImages(images);
  }, [images]);

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  // Function to handle drag-and-drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) return; // No valid destination, do nothing

    const reorderedImages = [...draggedImages];
    const [draggedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, draggedImage);

    // Update the state with the new order
    setDraggedImages(reorderedImages);
  };

  // Function to filter images based on search query
  const filteredImages = draggedImages.filter((image) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const userEmail = image.userEmail.toLowerCase();
    const tags = image.tags || [];
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="gallery">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid md:grid-cols-3 justify-center gap-4 mt-10"
            >
              {filteredImages.map((image, index) => (
                <Draggable
                  key={image.imageUrl}
                  draggableId={image.imageUrl}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`card card-compact w-full bg-base-100 shadow-xl`}
                    >
                      <figure className="max-h-[15rem]">
                        <img src={image.imageUrl} alt="" />
                      </figure>
                      <div className="card-body">
                        <p>Upload by: {image.userEmail}</p>
                        <span>Created on: {image.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageGallery;
