import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Questions</Link>
        </li>
        <li>
          <Link to="/res">responses</Link>
        </li>
        <li>
          <Link to="/setting">settings</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
