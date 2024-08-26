import React from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

const DepartmentOverview = ({ scholars }) => {
  const { name } = useParams();
  const departmentScholars = scholars.filter(scholar => scholar.department === name);

  if (departmentScholars.length === 0) {
    return <div>No scholars found in this department.</div>;
  }

  const departmentData = {
    labels: departmentScholars.map(scholar => scholar.name),
    datasets: [
      {
        label: 'Total Research Work',
        data: departmentScholars.map(scholar => 
          scholar.researchWorks.articles + 
          scholar.researchWorks.journals + 
          scholar.researchWorks.bookChapters + 
          scholar.researchWorks.conferences + 
          scholar.researchWorks.workshops
        ),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="mt-4">
      <h2 class="text-center">{name} Department Overview</h2>
      <Bar
        data={departmentData}
        options={{
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />

      <div className="mt-4">
        <h3 class="text-center">Scholars</h3>
        <ul className="list-group">
          {departmentScholars.map(scholar => (
            <li key={scholar.id} className="list-group-item">
              <Link to={`/scholar/${scholar.id}`}>{scholar.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DepartmentOverview;
