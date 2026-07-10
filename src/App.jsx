import React, { useState, useEffect } from 'react';
import { categories } from './data.js';
import './index.css';

function App() {
  // Load initial state from local storage or default to empty
  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('dsa-stars');
    return saved ? JSON.parse(saved) : {};
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('dsa-notes');
    return saved ? JSON.parse(saved) : {};
  });

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('dsa-stars', JSON.stringify(stars));
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('dsa-notes', JSON.stringify(notes));
  }, [notes]);

  const toggleStar = (title) => {
    setStars(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const updateNote = (title, text) => {
    setNotes(prev => ({
      ...prev,
      [title]: text
    }));
  };

  return (
    <div>
      <h1>DSA Mastery Tracker</h1>
      <div className="sheet-container">
        <table className="sheet-table">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>Star</th>
              <th style={{ width: '40%' }}>Question</th>
              <th style={{ width: '25%' }}>Links</th>
              <th style={{ width: '30%' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, catIndex) => (
              <React.Fragment key={catIndex}>
                {/* Category Header Row */}
                <tr className="category-row">
                  <td colSpan={4} className="category-title">
                    {category.name}
                  </td>
                </tr>
                
                {/* Question Rows */}
                {category.questions.map((q, qIndex) => (
                  <tr key={qIndex} className="question-row">
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className={`star-btn ${stars[q.title] ? 'starred' : ''}`}
                        onClick={() => toggleStar(q.title)}
                        title="Toggle Star"
                      >
                        {stars[q.title] ? '★' : '☆'}
                      </button>
                    </td>
                    <td className="question-title">{q.title}</td>
                    <td className="question-links">
                      {q.links.map((link, i) => (
                        <a key={i} href={link} target="_blank" rel="noreferrer">
                          Link {i + 1}
                        </a>
                      ))}
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className="notes-input" 
                        placeholder="Add your notes here..." 
                        value={notes[q.title] || ''}
                        onChange={(e) => updateNote(q.title, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
