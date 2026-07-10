import React, { useState, useEffect } from 'react';
import { categories } from './data.js';
import './index.css';

function getLinkLabel(url) {
  if (url.includes('leetcode.com')) return 'leetcode';
  if (url.includes('geeksforgeeks.org')) return 'gfg';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  return 'other';
}

function LinkIcon({ url }) {
  const type = getLinkLabel(url);

  if (type === 'leetcode') {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="link-icon lc-link" title="LeetCode">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
      </a>
    );
  }

  if (type === 'gfg') {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="link-icon gfg-link" title="GeeksforGeeks">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.16-.95h3.064c.015.18.06.354.135.516.165.357.5.609.93.609.164 0 .326-.04.475-.116a.86.86 0 0 0 .391-.372c.072-.155.096-.327.068-.495a.876.876 0 0 0-.282-.508 1.378 1.378 0 0 0-.475-.252 5.505 5.505 0 0 0-.634-.169 8.196 8.196 0 0 1-1.07-.34 3.43 3.43 0 0 1-.952-.567 2.59 2.59 0 0 1-.677-.927 3.258 3.258 0 0 1-.243-1.313c0-.075.002-.149.006-.222a3.152 3.152 0 0 1 .39-1.36c.293-.49.7-.894 1.2-1.18a4.036 4.036 0 0 1 1.907-.472c.535-.005 1.065.1 1.558.309a3.236 3.236 0 0 1 1.226.931c.333.43.556.93.652 1.462h-3.018a.878.878 0 0 0-.108-.39.803.803 0 0 0-.348-.315.87.87 0 0 0-.452-.083.853.853 0 0 0-.42.152.739.739 0 0 0-.258.367.915.915 0 0 0-.033.472c.032.156.115.296.236.399.164.135.36.228.572.272.206.05.5.117.882.199.39.08.77.19 1.137.326.357.132.685.326.969.574.283.25.509.56.664.91.165.394.241.82.224 1.247.002.075 0 .15-.005.225zM2.552 14.315c.142.28.333.532.564.745a3.691 3.691 0 0 0 1.104.695 4.51 4.51 0 0 0 3.116-.016 3.79 3.79 0 0 0 2.135-2.078c.089-.306.14-.622.16-.95H6.567a1.21 1.21 0 0 1-.135.516c-.165.357-.5.609-.93.609a1.12 1.12 0 0 1-.475-.116.86.86 0 0 1-.391-.372 1.01 1.01 0 0 1-.068-.495.876.876 0 0 1 .282-.508c.13-.114.293-.198.475-.252.189-.06.41-.118.634-.169.374-.083.726-.194 1.07-.34.326-.129.649-.303.952-.567.26-.228.493-.5.677-.927.178-.388.27-.813.243-1.313a2.43 2.43 0 0 0-.006-.222 3.15 3.15 0 0 0-.39-1.36 3.098 3.098 0 0 0-1.2-1.18A4.036 4.036 0 0 0 5.398 6.5a4.29 4.29 0 0 0-1.558.309 3.236 3.236 0 0 0-1.226.931 3.28 3.28 0 0 0-.652 1.462h3.018a.878.878 0 0 1 .108-.39.803.803 0 0 1 .348-.315.87.87 0 0 1 .452-.083c.152.017.294.07.42.152a.739.739 0 0 1 .258.367c.04.15.048.308.033.472a.862.862 0 0 1-.236.399 1.378 1.378 0 0 1-.572.272c-.206.05-.5.117-.882.199a7.696 7.696 0 0 0-1.137.326 3.097 3.097 0 0 0-.969.574 2.508 2.508 0 0 0-.664.91 3.063 3.063 0 0 0-.224 1.247c-.002.075 0 .15.005.225z" />
        </svg>
      </a>
    );
  }

  if (type === 'youtube') {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="link-icon yt-link" title="YouTube">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>
    );
  }

  // Other links
  return (
    <a href={url} target="_blank" rel="noreferrer" className="link-icon other-link" title="External Link">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}

function App() {
  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('dsa-stars');
    return saved ? JSON.parse(saved) : {};
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('dsa-notes');
    return saved ? JSON.parse(saved) : {};
  });

  const [done, setDone] = useState(() => {
    const saved = localStorage.getItem('dsa-done');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('dsa-stars', JSON.stringify(stars));
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('dsa-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('dsa-done', JSON.stringify(done));
  }, [done]);

  const toggleStar = (key) => {
    setStars(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDone = (key) => {
    setDone(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateNote = (key, text) => {
    setNotes(prev => ({ ...prev, [key]: text }));
  };

  let globalIndex = 0;

  return (
    <div>
      <h1>DSA Mastery Tracker</h1>
      <div className="sheet-container">
        <table className="sheet-table">
          <thead>
            <tr>
              <th style={{ width: '4%', textAlign: 'center' }}>#</th>
              <th style={{ width: '4%', textAlign: 'center' }}>Done</th>
              <th style={{ width: '4%', textAlign: 'center' }}>Star</th>
              <th style={{ width: '33%' }}>Question</th>
              <th style={{ width: '20%' }}>Links</th>
              <th style={{ width: '35%' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, catIndex) => (
              <React.Fragment key={catIndex}>
                {/* Category Header Row - NO star/checkmark */}
                <tr className="category-row">
                  <td colSpan={6} className="category-title">
                    {category.name}
                  </td>
                </tr>

                {/* Question Rows */}
                {category.questions.map((q, qIndex) => {
                  globalIndex++;
                  const key = `${catIndex}-${qIndex}`;
                  return (
                    <tr key={qIndex} className={`question-row ${done[key] ? 'is-done' : ''}`}>
                      <td style={{ textAlign: 'center' }} className="q-number">
                        {globalIndex}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className={`done-btn ${done[key] ? 'done-active' : ''}`}
                          onClick={() => toggleDone(key)}
                          title="Mark as Done"
                        >
                          {done[key] ? '✅' : '⬜'}
                        </button>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className={`star-btn ${stars[key] ? 'starred' : ''}`}
                          onClick={() => toggleStar(key)}
                          title="Toggle Star"
                        >
                          {stars[key] ? '★' : '☆'}
                        </button>
                      </td>
                      <td className="question-title">
                        <span className={done[key] ? 'strike-through' : ''}>{q.title}</span>
                      </td>
                      <td className="question-links">
                        {q.links.map((link, i) => (
                          <LinkIcon key={i} url={link} />
                        ))}
                      </td>
                      <td>
                        <input
                          type="text"
                          className="notes-input"
                          placeholder="Add notes..."
                          value={notes[key] || ''}
                          onChange={(e) => updateNote(key, e.target.value)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
