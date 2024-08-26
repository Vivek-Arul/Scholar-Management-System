import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import ScholarList from './components/ScholarList';
import ScholarProfile from './components/ScholarProfile';
import DepartmentOverview from './components/DepartmentOverview';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OverallOverview from './components/OverallOverview';
import './App.css';

class App extends Component {
  state = {
    scholars: [
      {
        id: 1,
        name: 'John Doe',
        department: 'Computer Science Engineering',
        orcid: '0000-0001-2345-6789',
        googleScholar: 'https://scholar.google.com/johndoe',
        sciencedirect: 'https://sciencedirect.com/johndoe',
        scopus: 'https://scopus.com/johndoe',
        researchWorks: {
          articles: 10,
          journals: 5,
          bookChapters: 2,
          conferences: 3,
          workshops: 4
        }
      },
      {
        id: 2,
        name: 'Jane Smith',
        department: 'Information Technology',
        orcid: '0000-0002-3456-7890',
        googleScholar: 'https://scholar.google.com/janesmith',
        sciencedirect: 'https://sciencedirect.com/janesmith',
        scopus: 'https://scopus.com/janesmith',
        researchWorks: {
          articles: 8,
          journals: 4,
          bookChapters: 3,
          conferences: 2,
          workshops: 6
        }
      }
    ]
  };

  departmentData = () => {
    const departments = this.state.scholars.reduce((acc, scholar) => {
      if (!acc[scholar.department]) {
        acc[scholar.department] = { articles: 0, journals: 0, bookChapters: 0, conferences: 0, workshops: 0 };
      }
      acc[scholar.department].articles += scholar.researchWorks.articles;
      acc[scholar.department].journals += scholar.researchWorks.journals;
      acc[scholar.department].bookChapters += scholar.researchWorks.bookChapters;
      acc[scholar.department].conferences += scholar.researchWorks.conferences;
      acc[scholar.department].workshops += scholar.researchWorks.workshops;
      return acc;
    }, {});

    return Object.keys(departments).map(department => ({
      name: department,
      researchWorks: departments[department]
    }));
  };

  addScholar = (scholar) => {
    this.setState({ scholars: [...this.state.scholars, scholar] });
  };

  updateScholar = (id, updatedScholar) => {
    this.setState(prevState => ({
      scholars: prevState.scholars.map(scholar =>
        scholar.id === id ? { ...scholar, ...updatedScholar } : scholar
      )
    }));
  };

  deleteScholar = (id) => {
    this.setState(prevState => ({
      scholars: prevState.scholars.filter(scholar => scholar.id !== id)
    }));
  };
  
  render() {
    return (
      <Router>
        <Navbar />
        <hr></hr>
        <main role="main" className="flex-shrink-0">
          <div className="root container">
            <Routes>
              <Route path="/" element={<ScholarList scholars={this.state.scholars} />} />
              <Route path="/admin" element={<AdminDashboard
                scholars={this.state.scholars}
                addScholar={this.addScholar}
                updateScholar={this.updateScholar}
                deleteScholar={this.deleteScholar}
                />} 
              />
              <Route path="/scholar/:id" element={<ScholarProfile scholars={this.state.scholars} />} />
              <Route path="/department/:name" element={<DepartmentOverview scholars={this.state.scholars} />} />
              <Route path="/overall" element={<OverallOverview departmentData={this.departmentData()} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
