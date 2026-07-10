import React, { useState, useEffect } from 'react';
import { categories } from './data.js';
import './index.css';

// Firebase imports
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, provider, db } from './firebase.js';

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
      <a href={url} target="_blank" rel="noreferrer" className="link-icon gfg-link" title="GeeksforGeeks" style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
        GFG
      </a>
    );
  }

  if (type === 'youtube') {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="link-icon other-link" title="YouTube">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
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
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [stars, setStars] = useState({});
  const [notes, setNotes] = useState({});
  const [done, setDone] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setStars(data.stars || {});
            setNotes(data.notes || {});
            setDone(data.done || {});
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        setDataLoaded(true);
      } else {
        setStars({});
        setNotes({});
        setDone({});
        setDataLoaded(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Save to Firebase whenever data changes (debounced by 1 second for notes)
  useEffect(() => {
    if (user && dataLoaded) {
      const timeoutId = setTimeout(() => {
        setDoc(doc(db, 'users', user.uid), {
          stars,
          notes,
          done
        }, { merge: true }).catch(err => console.error("Error saving data:", err));
      }, 1000); // 1 second debounce
      return () => clearTimeout(timeoutId);
    }
  }, [stars, notes, done, user, dataLoaded]);

  const handleLogin = () => {
    signInWithPopup(auth, provider).catch(err => console.error(err));
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const requireLogin = () => {
    if (!user) {
      alert("Please log in with Google to save your progress!");
      return false;
    }
    return true;
  };

  const toggleStar = (key) => {
    if (!requireLogin()) return;
    setStars(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDone = (key) => {
    if (!requireLogin()) return;
    setDone(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateNote = (key, text) => {
    if (!user) return;
    setNotes(prev => ({ ...prev, [key]: text }));
  };

  let globalIndex = 0;

  if (authLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Tracker...</p>
      </div>
    );
  }



  return (
    <div>
      <div className="nav-bar">
        <h2>DSA Mastery Tracker</h2>
        <div className="user-profile">
          {user ? (
            <>
              <img src={user.photoURL} alt="Profile" className="avatar" referrerPolicy="no-referrer" />
              <span className="user-email">{user.email}</span>
              <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
            </>
          ) : (
            <button className="google-btn" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={handleLogin}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in to Save
            </button>
          )}
        </div>
      </div>
      
      {(!dataLoaded && user) ? (
        <div className="loading-data">
          <div className="spinner small-spinner"></div>
          <p>Syncing your progress...</p>
        </div>
      ) : (
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
                  <tr className="category-row">
                    <td colSpan={6} className="category-title">
                      {category.name}
                    </td>
                  </tr>

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
                            placeholder={user ? "Add notes..." : "Sign in to add notes"}
                            value={notes[key] || ''}
                            onChange={(e) => updateNote(key, e.target.value)}
                            disabled={!user}
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
      )}
    </div>
  );
}

export default App;
