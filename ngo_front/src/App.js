import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Header from "./views/Header";
import Footer from "./views/Footer";
import OrganizationList from "./views/OrganizationList";
import ProjectsList from "./views/ProjectsList";
import Ngo from "./views/Ngo";
import Company from "./views/Company";
import Project from "./views/Project";
import FindAction from "./views/FindAction";
import Grand from "./views/Grand";
import Faq from "./views/Faq";
import Contact from "./views/Contact";
import CategoryList from "./views/CategoryList";


function App() {
  return (
      <Router>
        <div>
            <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/organizations_list" element={<OrganizationList />} />
            <Route path="/projects_list" element={<ProjectsList />} />
            <Route path="/ngos/:id" element={<Ngo />} />
            <Route path="/companies/:id" element={<Company />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/find" element={<FindAction />} />
            <Route path="/grants/:id" element={<Grand />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/category-projects/:id" element={<CategoryList />} />
          </Routes>
            <Footer />
        </div>
      </Router>
  );
}

export default App;
