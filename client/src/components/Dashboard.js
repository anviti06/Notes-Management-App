// display list of notes
// bloglist: represent list of notes inside a folder
import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from './blogs/BlogList';

const Dashboard = () => {
  const folder_name = window.location.pathname.split('/').pop();
  const addr = '/blogs/new/' + folder_name;
  return (
    <div>
      <BlogList />
      <div className="fixed-action-btn">
        <Link to={addr} className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
