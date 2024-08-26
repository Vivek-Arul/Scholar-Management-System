import React, { useState } from 'react';

const AddScholar = (props) => {
  // Initialize state for all form fields
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [orcid, setOrcid] = useState('');
  const [googleScholar, setGoogleScholar] = useState('');
  const [sciencedirect, setSciencedirect] = useState('');
  const [scopus, setScopus] = useState('');
  const [articles, setArticles] = useState(0);
  const [journals, setJournals] = useState(0);
  const [bookChapters, setBookChapters] = useState(0);
  const [conferences, setConferences] = useState(0);
  const [workshops, setWorkshops] = useState(0);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new scholar object
    const newScholar = {
      id: Math.random(), // Use a unique ID generation strategy
      name,
      department,
      orcid,
      googleScholar,
      sciencedirect,
      scopus,
      researchWorks: {
        articles,
        journals,
        bookChapters,
        conferences,
        workshops
      }
    };

    console.log('New Scholar Data:', newScholar); // Debugging line

    // Pass new scholar data to parent component
    props.addScholar(newScholar);
    
    // Reset form fields
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setDepartment('');
    setOrcid('');
    setGoogleScholar('');
    setSciencedirect('');
    setScopus('');
    setArticles(0);
    setJournals(0);
    setBookChapters(0);
    setConferences(0);
    setWorkshops(0);
  };

  return (
    <div className="mt-4">
      <h2>Add Scholar</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            className="form-control"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>ORCID ID:</label>
          <input
            type="text"
            className="form-control"
            value={orcid}
            onChange={(e) => setOrcid(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Google Scholar Profile:</label>
          <input
            type="text"
            className="form-control"
            value={googleScholar}
            onChange={(e) => setGoogleScholar(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>ScienceDirect ID:</label>
          <input
            type="text"
            className="form-control"
            value={sciencedirect}
            onChange={(e) => setSciencedirect(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Scopus ID:</label>
          <input
            type="text"
            className="form-control"
            value={scopus}
            onChange={(e) => setScopus(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Articles:</label>
          <input
            type="number"
            className="form-control"
            value={articles}
            onChange={(e) => setArticles(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Journals:</label>
          <input
            type="number"
            className="form-control"
            value={journals}
            onChange={(e) => setJournals(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Book Chapters:</label>
          <input
            type="number"
            className="form-control"
            value={bookChapters}
            onChange={(e) => setBookChapters(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Conferences:</label>
          <input
            type="number"
            className="form-control"
            value={conferences}
            onChange={(e) => setConferences(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div className="form-group">
          <label>Workshops:</label>
          <input
            type="number"
            className="form-control"
            value={workshops}
            onChange={(e) => setWorkshops(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Add Scholar</button>
      </form>
    </div>
  );
};

export default AddScholar;
