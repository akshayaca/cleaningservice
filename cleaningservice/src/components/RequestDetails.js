import React, { useState, useRef } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import Modal from 'react-modal';

// Replace this with the actual path to your image asset
import livingRoomImage from '../Image/LivingRoom.png';

const RequestDetails = () => {
  const totalSlides = 8;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [serviceStarted, setServiceStarted] = useState(false);
  const [filingStarted, setFilingStarted] = useState(false);
  const [commencementDate, setCommencementDate] = useState(null);
  const [proof, setProof] = useState(null);
  const [selectedAssignee, setSelectedAssignee] = useState(null); // State to store the selected assignee

  const fileInputRef = useRef();

  const handleSlideChange = (direction) => {
    setCurrentSlide((prev) => direction === 'left' ? (prev === 0 ? totalSlides - 1 : prev - 1) : (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const startService = () => {
    setServiceStarted(true);
    setCommencementDate(new Date());
  };

  const handleFileReport = () => {
    setFilingStarted(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProof(file);
    }
  };

  const handleSubmit = () => {
    const confirmSubmission = window.confirm("Are you sure that the proof has been verified?");
    if (confirmSubmission) {
      console.log("Submission confirmed");
      // Redirect to listings page and update status logic should be implemented here
    }
  };

  const handleAssigneeChange = (selectedOption) => {
    if (!serviceStarted) { // Allow changing assignee only if service hasn't started
      setSelectedAssignee(selectedOption);
    }
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        {/* Image carousel */}
        <div className="relative">
          <button className="absolute left-0 z-10 inset-y-0 my-auto bg-black bg-opacity-20 hover:bg-opacity-30 text-white p-4" onClick={() => handleSlideChange('left')}>
            <FaArrowLeft />
          </button>
          <div className="flex overflow-hidden">
            <div className="flex min-w-full transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * (100 / totalSlides)}%)` }}>
              {Array.from({ length: totalSlides }, (_, index) => (
                <div key={index} className="flex-shrink-0 w-full max-w-[33.3333%]">
                  <img src={livingRoomImage} alt={`Living Room ${index + 1}`} className="w-full h-full object-cover w-1/3 cursor-pointer" onClick={() => openModal(livingRoomImage)} />
                </div>
              ))}
            </div>
          </div>
          <button className="absolute right-0 z-10 inset-y-0 my-auto bg-black bg-opacity-20 hover:bg-opacity-30 text-white p-4" onClick={() => handleSlideChange('right')}>
            <FaArrowRight />
          </button>
        </div>
        
        {/* Property details */}
        <div>
          <h2 className="text-2xl font-bold">Property Title</h2>
          <p>Description and details about the property including amenities, BHK, etc., sufficient for the cleaning company to know. Cleaning request specification like clean bathroom etc.</p>
          <p><strong>Address:</strong> [Property Address]</p>
          <p><strong>Requested Date:</strong> [DD/MM/YYYY]</p>
        </div>

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
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
        }}>
          <img src={selectedImage} alt="Selected" />
        </Modal>
      </div>

      {/* Right pane adjustments */}
      <div className="space-y-4">
        {/* Date Picker now represents the due date for the property from listing page */}
        <DatePicker
          selected={new Date()} // This should dynamically represent the due date
          onChange={(date) => console.log(date)}
          className="border p-2 rounded w-full"
          disabled={true} // Assume it's for display purposes only
        />

        {/* Assignee Selector */}
        <Select
          options={[{ value: 'teamLead1', label: 'Team Lead 1' }, { value: 'teamLead2', label: 'Team Lead 2' }]}
          className="w-full text-base border p-2 rounded"
          placeholder="Select..."
          onChange={handleAssigneeChange}
          value={selectedAssignee}
          isDisabled={serviceStarted} // Disable after service starts
        />

        <div className="flex items-center justify-between">
          {/* Start Service Button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startService}
          >
            Start Service
          </button>

          {/* File the Report Button */}
          <button
            className={`ml-2 ${serviceStarted ? 'bg-purple-500 hover:bg-purple-700' : 'bg-gray-500'} text-white font-bold py-2 px-4 rounded`}
            onClick={handleFileReport}
            disabled={!serviceStarted}
          >
            File the Report
          </button>
        </div>
      </div>

      {/* Filing Started Section */}
      {filingStarted && (
        <div className="md:col-span-3 mt-4">
          <p><strong>Date of Commencement:</strong> {commencementDate?.toLocaleString()}</p>
          <div>
            <label htmlFor="imageProof">Image Proof (Mandatory):</label>
            <input type="file" id="imageProof" name="imageProof" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} required />
          </div>
          <button
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
            disabled={!proof}
          >
            Submit Report
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
