import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Main from '../components/Main';
import PeopleDirectory from '../page/PeopleDirectory';


function RouterMain() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path='/people/directory' element = {<PeopleDirectory/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default RouterMain;
