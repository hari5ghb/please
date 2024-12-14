import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import './index.css'

function WorkerDashboard() {
  const [completedCount, setCompletedCount] = useState(0);
  const [submittedIndexes, setSubmittedIndexes] = useState(Array(10).fill(false)); // Track submitted buttons
  const [reason, setReason] = useState(''); // Reason text
  const [showReasonBox, setShowReasonBox] = useState(false); // Show or hide reason box
  const [reasonSubmitted, setReasonSubmitted] = useState(false); // Track if the reason has been submitted
  const [isSubmitAllClicked, setIsSubmitAllClicked] = useState(false); // Track if "Submit All" is clicked
  const [inputFields, setInputFields] = useState(10); // Initially, 10 input fields
  const [rowStatus, setRowStatus] = useState(Array(10).fill('pending')); // Track the status of each row
  const [isCompleted, setIsCompleted] = useState(false); // Track if all fields are filled

  const handleSubmitAll = () => {
    setIsSubmitAllClicked(true); // Disable further edits once "Submit All" is clicked

    const updatedStatus = rowStatus.map((_, index) => {
      const inputs = document.querySelectorAll(`input[data-index='${index}']`);
      let isCompleted = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isCompleted = false;
        }
      });

      return isCompleted ? 'completed' : 'incomplete';
    });

    setRowStatus(updatedStatus);
    setCompletedCount(updatedStatus.filter(status => status === 'completed').length); // Update the count of completed rows
  };

  const handleFinish = () => {
    const inputs = document.querySelectorAll('input');
    let allFilled = true;

    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].disabled && inputs[i].value.trim() === '') {
        allFilled = false;
        break;
      }
    }

    if (allFilled) {
      setIsCompleted(true); // Mark as completed if all fields are filled
    } else {
      setShowReasonBox(true); // Show reason box if any field is empty
    }
  };

  const handleReasonSubmit = () => {
    if (reason.trim() !== '') {
      setReasonSubmitted(true); // Set reason submitted state to true
      setShowReasonBox(false); // Hide the reason box after submission
      setReason(''); // Clear the reason input
    } else {
      alert('Please provide a reason.');
    }
  };

  const handleAddInputField = () => {
    if (inputFields < 20) {
      setInputFields(inputFields + 1);
    } else {
      alert('Maximum 20 fields allowed.');
    }
  };

  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5">Work Completion Tracker</h1>

      {/* Completion Rectangle at the top-left of the table */}
      <div className="relative right-40 w-80 h-16 border-2 border-gray-400 rounded-lg flex items-center p-1 mb-5">
        {[...Array(inputFields)].map((_, index) => (
          <div
            key={index}
            className={`h-full mr-1 ${rowStatus[index] === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${100 / inputFields}%` }} // Each box is a percentage of the input fields
          ></div>
        ))}
      </div>

      {/* Counter Text */}
      <div className="mt-3 text-lg font-semibold relative left-40 bottom-20">
        Completed: {completedCount}/{inputFields}
      </div>

      {/* Work Rows with scrollable container */}
      <div className="w-full max-w-4xl overflow-x-auto max-h-[400px] overflow-y-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-white">Email</th>
              <th className="px-4 py-2 border border-gray-300 text-white">Phone Number</th>
              <th className="px-4 py-2 border border-gray-300 text-white">Website Name</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(inputFields)].map((_, index) => (
              <tr key={index} className="hover:bg-slate-500">
                <td className="px-4 py-2 border border-gray-300 text-white">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border-b-2 border-black focus:border-blue-500 text-black outline-none"
                    disabled={submittedIndexes[index] || isSubmitAllClicked} // Disable if submitted or Submit All clicked
                    data-index={index}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 text-white">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-2 border-b-2 border-black focus:border-blue-500 text-black outline-none"
                    disabled={submittedIndexes[index] || isSubmitAllClicked} // Disable if submitted or Submit All clicked
                    data-index={index}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 text-white">
                  <input
                    type="text"
                    placeholder="Website Name"
                    className="w-full p-2 border-b-2 border-black focus:border-blue-500 text-black outline-none"
                    disabled={submittedIndexes[index] || isSubmitAllClicked} // Disable if submitted or Submit All clicked
                    data-index={index}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button Container with left and right positioning */}
      <div className="mt-5 flex justify-between w-full max-w-4xl">
        {/* Button on the left */}
        <button
          onClick={handleAddInputField}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          + Add Field
        </button>

        {/* Button on the right */}
        <button
          onClick={handleSubmitAll}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Submit All
        </button>
      </div>

      {/* Finish Button */}
      <button
        onClick={handleFinish}
        className="mt-5 relative bottom-14 bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600"
      >
        Finish
      </button>

      {/* Reason Box */}
      {showReasonBox && (
        <div className="mt-5 p-5 border rounded-lg bg-gray-800 text-white w-full max-w-xl">
          <h2 className="text-xl font-bold mb-3">Why Didn't You Finish the Work?</h2>
          <textarea
            className="w-full p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Please provide the reason for incomplete fields..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-3">
            <button
              onClick={handleReasonSubmit}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
              Submit Reason
            </button>
          </div>
        </div>
      )}

      {/* Completed Message */}
      {isCompleted && !showReasonBox && (
        <div className="mt-5 flex items-center justify-center w-full max-w-xs p-3 bg-green-500 text-white rounded-lg shadow-md">
          <AiOutlineCheck className="mr-2 text-white text-xl" />
          <span>All fields are completed!</span>
        </div>
      )}

      {/* Reason Submitted Status with Transition */}
      {reasonSubmitted && (
        <div className="mt-5 flex items-center justify-center w-full max-w-xs p-3 bg-blue-500 text-white rounded-lg shadow-md transition-opacity opacity-0 animate-fadeIn">
          <AiOutlineCheck className="mr-2 text-white text-xl" />
          <span>Reason Submitted</span>
        </div>
      )}
    </div>
  );
}

export default WorkerDashboard;
