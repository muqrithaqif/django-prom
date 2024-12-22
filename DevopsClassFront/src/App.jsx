import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { initializeApp } from "firebase/app";
function App() {

  const [name, setName] = useState('');
  const [savedNames, setSavedNames] = useState([]);

  useEffect(() => {
    fetchSavedNames();
  }, []);

  const fetchSavedNames = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/saved_names');
      console.log('Fetched names:', response.data.data);
      setSavedNames(response.data.data);
    } catch (error) {
      console.error('Error fetching saved names:', error);
    }
  };

  const handleAddName = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/add_name/', { name });
      console.log('Name added:', name);
      setName('');
      fetchSavedNames();
    } catch (error) {
      console.error('Error adding name:', error);
    }
  };

  // Function to handle removing a name
  const handleRemoveName = (id) => {
    setSavedNames(savedNames.filter((name) => name.id !== id));
  };

  return (
    <div className="App row justify-content-around">
      <div className="col-12 mb-5"><h1><i class="fas fa-hat-cowboy"></i> We Are Topi Putih</h1></div>
      <div className="col-5">
        <h2 className="pulse-text pb-3 fw-bold">Add Name For New Student</h2>
        <form onSubmit={handleAddName}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
          <button type="submit">Add Name</button>
        </form>
      </div>
      <div className="col-5">
        <h2>Saved Names</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {savedNames.length > 0 ? (
              savedNames.map((name) => (
                <tr key={name.id}>
                  <td>{name.id}</td>
                  <td>{name.saved_names}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No names saved</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
