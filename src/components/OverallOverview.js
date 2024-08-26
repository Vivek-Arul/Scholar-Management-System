import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverallOverview = ({ departmentData }) => {
  const [selectedResearchWork, setSelectedResearchWork] = useState('articles');

  // Filtered data based on selected research work
  const data = {
    labels: departmentData.map(department => department.name),
    datasets: [
      {
        label: selectedResearchWork.charAt(0).toUpperCase() + selectedResearchWork.slice(1),
        data: departmentData.map(department => department.researchWorks[selectedResearchWork]),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  const handleFilterChange = (e) => {
    setSelectedResearchWork(e.target.value);
  };

  return (
    <div>
      <h2 class="text-center">Overall Research Work Overview</h2>
      <div className="mb-3">
        <label htmlFor="researchWorkSelect" className="form-label">Select Research Work Type:</label>
        <select
          id="researchWorkSelect"
          className="form-select"
          value={selectedResearchWork}
          onChange={handleFilterChange}
        >
          <option value="articles">Articles</option>
          <option value="journals">Journals</option>
          <option value="bookChapters">Book Chapters</option>
          <option value="conferences">Conferences</option>
          <option value="workshops">Workshops</option>
        </select>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default OverallOverview;
