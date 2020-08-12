import React from 'react';
import {Link} from 'react-router-dom';

function HomePresenter() {
  return (
    <div>
      <h1>HomePresenter</h1>
      <ol>
        <li>
          <Link to={'/keyword'}>Keyword</Link>
        </li>
        <li>
          <Link to={'/statistics'}>Statistics</Link>
        </li>
      </ol>
    </div>
  );
}

export default HomePresenter;
