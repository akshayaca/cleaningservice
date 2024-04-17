import React, { useState, useRef,useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import Modal from 'react-modal';
import axios from 'axios';
import { format } from 'date-fns';

// Replace this with the actual path to your image asset
import livingRoomImage from '../Image/LivingRoom.png';

const RequestDetails = () => {
  const totalSlides = 8;
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [serviceStarted, setServiceStarted] = useState(false);
  const [filingStarted, setFilingStarted] = useState(false);
  const [commencementDate, setCommencementDate] = useState(null);
  const [proof, setProof] = useState(null);
  const [selectedAssignee, setSelectedAssignee] = useState(null); // State to store the selected assignee
  const [propertyDetails, setPropertyDetails] = useState({
    title: '',
    description: '',
    location: '',
    status: '',
    due: new Date(), // Default to current date, update with API response
  });
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`http://localhost:5001/api/requests/${id}`);
        const item = response.data[0];
        if (item) {
          setPropertyDetails({
            title: item.title || '',
            description: item.description || '',
            location: item.location || {},
            status: item.status || '',
            due: item.due ? new Date(item.due) : new Date(),
          });
        } else {
          // Handle the case where the array is empty or the data isn't as expected
          console.error('Item not found or the structure is not as expected', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch property details:', error);
      }
    };
  
    if (id) {
      fetchPropertyDetails();
    } else {
      console.error('No ID provided for fetching property details');
    }
  }, [id]);
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
  const formatAddress = (location) => {
    if (!location) return 'Loading...';
    const { addressLine1, addressLine2, city, state, country, zipCode } = location;
    return `${addressLine1}${addressLine2 ? `, ${addressLine2}` : ''}, ${city}, ${state}, ${zipCode}, ${country}`;
  };
  

  const handleSubmit = async () => {
    const confirmSubmission = window.confirm("Are you sure that the proof has been verified?");
    if (confirmSubmission && proof) {
      console.log("Submission confirmed");
  
      const formData = new FormData();
      formData.append('requestId', id);
      formData.append('title', propertyDetails.title);
      formData.append('status', propertyDetails.status);
      formData.append('dateOfCommencement', commencementDate);
      formData.append('image', proof);
  
      try {
        const response = await axios.post('http://localhost:5001/api/service-verifications', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        // Handle the response from the server
      } catch (error) {
        console.error('Failed to submit service verification:', error);
      }
    }
  };

  const handleAssigneeChange = (selectedOption) => {
    if (!serviceStarted) { // Allow changing assignee only if service hasn't started
      setSelectedAssignee(selectedOption);
    }
  };

  return (
    <>
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow">
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
        <h2 className="text-2xl font-bold">Title</h2>
       <h2>  {propertyDetails.title || 'Loading...'}</h2>
        <p><strong>Description</strong></p>
       <p> {propertyDetails.description || 'Loading details...'}</p>
        <p><strong>Address:</strong></p>
        <p>{propertyDetails.location.addressLine1}</p>
        <p>{propertyDetails.location.addressLine2}</p>
        <p>{propertyDetails.location.city}, {propertyDetails.location.state} {propertyDetails.location.zipCode}</p>
        <p>{propertyDetails.location.country}</p>
        <p><strong>Due Date:</strong> {format(propertyDetails.due, 'MM/dd/yyyy')}</p>
        <p><strong>Status:</strong> {propertyDetails.status || 'Loading...'}</p>
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
        <div>
        <p><strong>Due Date:</strong></p>
        <DatePicker
          selected={propertyDetails.due}
          className="border p-2 rounded w-full"
          disabled={true}
        />
      </div>
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
    </main>
    <Footer/>
    </div>
    </>

  );
};

export default RequestDetails;
