import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from 'react-router-dom';

const ScholarList = ({ scholars }) => {
  // Validate that scholars is an array
  if (!Array.isArray(scholars)) {
    return <div>Error: Scholars data is not available.</div>;
  }

  // Group scholars by department
  const groupedScholars = scholars.reduce((groups, scholar) => {
    const department = scholar.department || 'Unknown'; // Default to 'Unknown' if department is missing
    if (!groups[department]) {
      groups[department] = [];
    }
    groups[department].push(scholar);
    return groups;
  }, {});

  return (
    <div className="mt-4">
      <h2>Scholar List</h2>
      {Object.keys(groupedScholars).length === 0 ? (
        <p>No scholars available.</p>
      ) : (
        Object.keys(groupedScholars).map((department) => (
          <div key={department} className="mb-4">
            <h3>{department}</h3>
            <ul className="list-group">
              {groupedScholars[department].map((scholar) => (
                <li key={scholar.id} className="list-group-item">
                  <Link to={`/scholar/${scholar.id}`}>
                    {scholar.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

// Add PropTypes for validation
ScholarList.propTypes = {
  scholars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    department: PropTypes.string,
  })).isRequired,
};

export default ScholarList;
