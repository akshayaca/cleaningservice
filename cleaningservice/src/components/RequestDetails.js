import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaUpload } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import Modal from 'react-modal';

// Replace this with the actual path to your image asset
import livingRoomImage from '../Image/LivingRoom.png';

const RequestDetails = () => {
  // Assume each "slide" is a card containing an image
  const totalSlides = 8; // Total number of slides
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function to change the current slide
  const handleSlideChange = (direction) => {
    setCurrentSlide((prev) => {
      if (direction === 'left') {
        return prev === 0 ? totalSlides - 1 : prev - 1;
      } else {
        return prev === totalSlides - 1 ? 0 : prev + 1;
      }
    });
  };
  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  // ... other component state and functions

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        {/* Image carousel */}
        <div className="relative">
        <button
        className="absolute left-0 z-10 inset-y-0 my-auto bg-black bg-opacity-20 hover:bg-opacity-30 text-white p-4"
        onClick={() => handleSlideChange('left')}
      >
        <FaArrowLeft />
      </button>

          <div className="flex overflow-hidden">
            <div className="flex min-w-full transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * (100 / totalSlides)}%)` }}>
              {Array.from({ length: totalSlides }, (_, index) => (
                <div key={index} className="flex-shrink-0 w-full max-w-[33.3333%]">
                  <img
                    src={livingRoomImage}
                    alt={`Living Room ${index + 1}`}
                    className="w-full h-full object-cover w-1/3 cursor-pointer"
                    onClick={() => openModal(livingRoomImage)}
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute right-0 z-10 inset-y-0 my-auto bg-black bg-opacity-20 hover:bg-opacity-30 text-white p-4"
            onClick={() => handleSlideChange('right')}
          >
            <FaArrowRight />
          </button>
        </div>
        
        {/* Property details */}
        <div>
          <h2 className="text-2xl font-bold">Property Title</h2>
          <p>Description and details about the property</p>
          {/* Other details like address, size, etc. */}
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Start Service
          </button>
        </div>

   <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '500px',
            width: '90%',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <img src={selectedImage} alt="Selected" />
      </Modal>

        {/* File upload */}
        <div>
          <FaUpload className="inline-block mr-2" />
          <input type="file" className="block w-full text-sm py-2 px-3 border rounded" />
        </div>
      </div>

      {/* Right pane */}
      <div className="space-y-4">
        {/* Start date picker */}
        <DatePicker
          selected={new Date()}
          onChange={(date) => console.log(date)}
          className="border p-2 rounded w-full"
        />
        
        {/* Assignee selector */}
        <Select
          options={[
            // These options would be fetched from your user data, hard-coded here for example
            { value: 'teamLead1', label: 'Team Lead 1' },
            { value: 'teamLead2', label: 'Team Lead 2' },
            // ...more options
          ]}
          className="w-full text-base border p-2 rounded"
          placeholder="Select..."
          onChange={(selectedOption) => console.log(selectedOption)}
        />

        {/* Submit button */}
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
          Submit
        </button>
      </div>
    </div>
  );
};

export default RequestDetails;
