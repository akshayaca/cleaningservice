import React from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import livingRoomImage from '../Image/LivingRoom.png';

const ServiceListing = () => {
  const serviceRequests = new Array(8).fill(null).map((_, index) => ({
    title: `Property Title ${index + 1}`,
    dueBy: `Due Date ${index + 1}`,
  }));

  return (
    <div className="container mx-auto p-4">
      <ul className="space-y-4">
        {serviceRequests.map((request, index) => (
          <li
            key={index}
            className="flex items-center p-4 border-b border-gray-200 transition-all duration-300 hover:bg-gray-100 cursor-pointer transform hover:scale-105"
            onClick={() => console.log(`Opening details for request #${index + 1}`)}
          >
            {/* Request Info */}
            <div className="flex-1 flex items-center">
              {/* Image - hidden on smaller screens */}
              <img
                src={livingRoomImage}
                alt={`Service Request ${index + 1}`}
                className="hidden sm:block h-12 w-24 object-cover mr-4 rounded-lg" // Adjusted image size for demo
              />
              <span>
                Request from {request.title}
              </span>
            </div>

            {/* Due By and See More Icon */}
            <div className="flex items-center">
              <span className="mr-4 whitespace-nowrap">
                Due by {request.dueBy}
              </span>
              <div className="rounded-full p-2 hover:bg-gray-300 transition-colors duration-300">
                <FaEllipsisH className="text-lg text-gray-600" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceListing;
