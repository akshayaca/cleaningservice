import React, { useState, useEffect, useRef } from 'react';
import { FaEllipsisH, FaFilter, FaUserTie, FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import livingRoomImage from '../Image/LivingRoom.png';
import Layout from './Layout';

const FilterOptions = {
  TIME: {
    TODAY: 'Today',
    THIS_WEEK: 'This week',
    ALL_TIME: 'All time'
  },
  STATUS: {
    ONGOING: 'Ongoing',
    PAST: 'Past',
    YET_TO_START: 'Yet to Start',
    ALL_STATUS: 'All status'
  },
  REQUESTED_BY: {
    LANDLORD: 'Landlord',
    TENANT: 'Tenant'
  }
};

const today = new Date();
const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7 - today.getDay());

const ServiceListing = () => {
  const history = useHistory();
  const [timeFilter, setTimeFilter] = useState(FilterOptions.TIME.ALL_TIME);
  const [statusFilter, setStatusFilter] = useState(FilterOptions.STATUS.ALL_STATUS);
  const [requestedByFilter, setRequestedByFilter] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const filterMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const serviceRequests = new Array(8).fill(null).map((_, index) => ({
    id: index,
    title: `Property Title ${index + 1}`,
    dueBy: new Date(new Date().setDate(new Date().getDate() + index)), // for demonstration, index days from now
    status: index % 3 === 0 ? 'Ongoing' : index % 3 === 1 ? 'Past' : 'Yet to Start', // alternating status for demonstration
    isLandlord: index % 2 === 0
  }));

  const applyFilter = (option, type) => {
    if (type === 'TIME') {
      setTimeFilter(option);
    } else if (type === 'STATUS') {
      setStatusFilter(option);
    } else if (type === 'REQUESTED_BY') {
      setRequestedByFilter(option);
    }
    setShowFilterMenu(false);
  };

  const clearFilters = () => {
    setTimeFilter(FilterOptions.TIME.ALL_TIME);
    setStatusFilter(FilterOptions.STATUS.ALL_STATUS);
    setRequestedByFilter('');
  };

  const filteredRequests = serviceRequests.filter((request) => {
    // Time filtering
    const matchesTimeFilter = (timeFilter === FilterOptions.TIME.ALL_TIME) ||
                              (timeFilter === FilterOptions.TIME.TODAY && request.dueBy.toDateString() === today.toDateString()) ||
                              (timeFilter === FilterOptions.TIME.THIS_WEEK && request.dueBy < endOfWeek);

    // Status filtering
    const matchesStatusFilter =statusFilter === (FilterOptions.STATUS.ALL_STATUS) ||
                                                (statusFilter === request.status) ||
                                                (statusFilter === FilterOptions.STATUS.YET_TO_START && request.status === 'Yet to Start');

    
    // Requested by filtering
    const matchesRequestedByFilter = (!requestedByFilter) ||
                                     (requestedByFilter === FilterOptions.REQUESTED_BY.LANDLORD && request.isLandlord) ||
                                     (requestedByFilter === FilterOptions.REQUESTED_BY.TENANT && !request.isLandlord);

    return matchesTimeFilter && matchesStatusFilter && matchesRequestedByFilter;
  
  });
  

  const renderFilterMenu = () => (
    <div ref={filterMenuRef} className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
      <div className="text-lg px-4 py-2 text-gray-800">Time</div>
      {Object.values(FilterOptions.TIME).map((option) => (
        <div
          key={option}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          onClick={() => applyFilter(option, 'TIME')}
        >
          {option}
        </div>
      ))}
      <div className="text-lg px-4 py-2 text-gray-800">Status</div>
      {Object.values(FilterOptions.STATUS).map((option) => (
        <div
          key={option}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          onClick={() => applyFilter(option, 'STATUS')}
        >
          {option}
        </div>
      ))}
      <div className="text-lg px-4 py-2 text-gray-800">Requested by</div>
      {Object.values(FilterOptions.REQUESTED_BY).map((option) => (
        <div
          key={option}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          onClick={() => applyFilter(option, 'REQUESTED_BY')}
        >
          {option}
        </div>
 ))}
    </div>
  );

  const truncateTitle = (title) => {
    if (title.length > 25) {
      return `${title.substring(0, 25)}...`;
    }
    return title;
  };
  const navigateToDetails = (id) => {
    history.push(`/request/${id}`);
  };


  return (
    <Layout>
    <div className="container mx-auto p-4 relative">
   
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Service Requests</h1>
        <div>
          <button
            className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <FaFilter className="text-lg" />
          </button>
          {showFilterMenu && renderFilterMenu()}
          <button
            className="p-2 ml-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {filteredRequests.map((request, index) => (
          <li
            key={request.id}
            className="flex items-center p-4 border-b border-gray-200 transition-all duration-300 hover:bg-gray-100 cursor-pointer transform hover:scale-105"
            onClick={() => console.log(`Opening details for request #${request.id + 1}`)}
          >
          <div className="flex-1 flex items-center cursor-pointer" onClick={() => navigateToDetails(request.id)}>
        
            {/* Indicator Icon */}
            <div className="mr-3 flex-shrink-0">
              {request.isLandlord ? (
                <FaUserTie className="text-lg" title="Landlord" />
              ) : (
                <FaUser className="text-lg" title="Tenant" />
              )}
            </div>
            <div className="flex-1 flex items-center">
              <img
                src={livingRoomImage}
                alt={`Service Request ${request.id + 1}`}
                className="hidden sm:block h-12 w-24 object-cover mr-4 rounded-lg"
              />
              <span className="truncate" title={request.title}>
                Request from   {truncateTitle(request.title)}
              </span>
            </div>
            <div className="flex items-center">
              <span className="mr-4 whitespace-nowrap">
                Due by {request.dueBy.toDateString()}
              </span>
              <span className={`responsive-hide mr-4 whitespace-nowrap ${
                request.status === 'Past' ? 'text-red-500' :
                request.status === 'Ongoing' ? 'text-green-500' :
                request.status === 'Yet to Start' ? 'text-yellow-500' : ''
              }`}>
                {request.status}
              </span>
              <div className="rounded-full p-2 hover:bg-gray-300 transition-colors duration-300">
                <FaEllipsisH className="text-lg text-gray-600" />
              </div>
            </div>
            </div>
          </li>
        ))}
      </ul>

    </div>
    </Layout>
  );
};

export default ServiceListing;
