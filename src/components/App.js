import React from 'react';
import '../App.css';
import CreateForm from "./CreateForm";
import List from "./List";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container">
      <CreateForm/>
      <p/>
      <List/>
    </div>
  );
}

export default App;
