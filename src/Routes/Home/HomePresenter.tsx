import React from 'react';
import {Link} from 'react-router-dom';

function HomePresenter() {
  return (
    <div>
      <h1>HomePresenter</h1>
      <ol>
        <li>
          <Link to={'/keyword/롤챔스'}>Keyword</Link>
        </li>
        <li>
          <Link to={'/statistics'}>Statistics</Link>
        </li>
        <li>
          <Link to={'/star/5'}>Star</Link>
        </li>
      </ol>
    </div>
  );
}

export default HomePresenter;
