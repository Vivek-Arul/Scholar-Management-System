import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/customStyles.css'; // Ensure the path is correct

const AdminDashboard = ({ scholars, addScholar, updateScholar, deleteScholar }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [orcid, setOrcid] = useState('');
  const [googleScholar, setGoogleScholar] = useState('');
  const [sciencedirect, setSciencedirect] = useState('');
  const [scopus, setScopus] = useState('');
  const [idToEdit, setIdToEdit] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    department: '',
    orcid: '',
    googleScholar: '',
    sciencedirect: '',
    scopus: '',
    researchWorks: {
      articles: 0,
      journals: 0,
      bookChapters: 0,
      conferences: 0,
      workshops: 0
    }
  });

  const departments = [
    'Computer Science Engineering',
    'Information Technology',
    'Electronics and Communication Engineering',
    'Mechanical Engineering', // Example department
    'Civil Engineering'      // Example department
  ];

  // Use effect to reset form when idToEdit changes
  useEffect(() => {
    if (idToEdit === null) {
      resetForm();
    } else {
      const scholar = scholars.find(scholar => scholar.id === idToEdit);
      if (scholar) {
        setEditData({
          name: scholar.name,
          department: scholar.department,
          orcid: scholar.orcid,
          googleScholar: scholar.googleScholar,
          sciencedirect: scholar.sciencedirect,
          scopus: scholar.scopus,
          researchWorks: { ...scholar.researchWorks }
        });
      }
    }
  }, [idToEdit, scholars]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newScholar = {
      id: idToEdit || Math.random(),
      name: editData.name,
      department: editData.department,
      orcid: editData.orcid,
      googleScholar: editData.googleScholar,
      sciencedirect: editData.sciencedirect,
      scopus: editData.scopus,
      researchWorks: editData.researchWorks
    };
    
    if (idToEdit) {
      updateScholar(idToEdit, newScholar);
    } else {
      addScholar(newScholar);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDepartment('');
    setOrcid('');
    setGoogleScholar('');
    setSciencedirect('');
    setScopus('');
    setIdToEdit(null);
    setEditData({
      name: '',
      department: '',
      orcid: '',
      googleScholar: '',
      sciencedirect: '',
      scopus: '',
      researchWorks: {
        articles: 0,
        journals: 0,
        bookChapters: 0,
        conferences: 0,
        workshops: 0
      }
    });
  };

  const handleEdit = (scholar) => {
    setIdToEdit(scholar.id);
    setEditData({
      name: scholar.name,
      department: scholar.department,
      orcid: scholar.orcid,
      googleScholar: scholar.googleScholar,
      sciencedirect: scholar.sciencedirect,
      scopus: scholar.scopus,
      researchWorks: { ...scholar.researchWorks }
    });
  };

  const handleDelete = (id) => {
    deleteScholar(id);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard - Manage Scholars</h2>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Add / Edit Scholar</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Department:</label>
                  <select
                    className="form-control"
                    value={editData.department}
                    onChange={(e) => setEditData(prev => ({ ...prev, department: e.target.value }))}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>ORCID ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.orcid}
                    onChange={(e) => setEditData(prev => ({ ...prev, orcid: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Google Scholar Profile:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.googleScholar}
                    onChange={(e) => setEditData(prev => ({ ...prev, googleScholar: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>ScienceDirect ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.sciencedirect}
                    onChange={(e) => setEditData(prev => ({ ...prev, sciencedirect: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Scopus ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.scopus}
                    onChange={(e) => setEditData(prev => ({ ...prev, scopus: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Articles:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editData.researchWorks.articles}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      researchWorks: { ...prev.researchWorks, articles: +e.target.value }
                    }))}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Journals:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editData.researchWorks.journals}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      researchWorks: { ...prev.researchWorks, journals: +e.target.value }
                    }))}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Book Chapters:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editData.researchWorks.bookChapters}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      researchWorks: { ...prev.researchWorks, bookChapters: +e.target.value }
                    }))}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Conferences:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editData.researchWorks.conferences}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      researchWorks: { ...prev.researchWorks, conferences: +e.target.value }
                    }))}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Workshops:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editData.researchWorks.workshops}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      researchWorks: { ...prev.researchWorks, workshops: +e.target.value }
                    }))}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  {idToEdit ? 'Update Scholar' : 'Add Scholar'}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <h3 className="text-center mb-4">Existing Scholars</h3>
          <ul className="list-group">
            {scholars.map(scholar => (
              <li key={scholar.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{scholar.name}</h5>
                  <p className="mb-1">{scholar.department}</p>
                </div>
                <div>
                  <button onClick={() => handleEdit(scholar)} className="btn btn-warning btn-sm mx-1">Edit</button>
                  <button onClick={() => handleDelete(scholar.id)} className="btn btn-danger btn-sm mx-1">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
