import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
// API Key: ba866326b7f24af2adcfb2ac80652cd8
// news.data : pub_6771452e76aeaa845b9f8f4e02ea4f535bc7f
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<News key="general" pageSize={3} country="us" category="general" />} />
            <Route path="/business" element={<News key="business" pageSize={3} country="us" category="business" />} />
            <Route path="/entertainment" element={<News key="entertainment" pageSize={3} country="us" category="entertainment" />} />
            <Route path="/general" element={<News key="general" pageSize={3} country="us" category="general" />} />
            <Route path="/health" element={<News key="health" pageSize={3} country="us" category="health" />} />
            <Route path="/science" element={<News key="science" pageSize={3} country="us" category="science" />} />
            <Route path="/sports" element={<News key="sports" pageSize={3} country="us" category="sports" />} />
            <Route path="/technology" element={<News key="technology" pageSize={3} country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
