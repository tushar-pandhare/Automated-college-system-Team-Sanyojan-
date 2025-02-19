import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const ElectionPage = () => {
  const getInitialState = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const sampleCandidates = [
    { id: 1, name: "Alice Smith", votes: 0, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Bob Johnson", votes: 0, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Charlie Brown", votes: 0, image: "https://via.placeholder.com/150" },
  ];

  // State initialization
  const [candidates, setCandidates] = useState(() => 
    getInitialState('candidates', sampleCandidates)
  );
  const [profile, setProfile] = useState(() => 
    getInitialState('profile', null)
  );
  const [editingProfile, setEditingProfile] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: '',
    email: '',
    image: null,
    preview: ''
  });
  const [allEmails] = useState(() => 
    new Set(getInitialState('registeredEmails', []))
  );

  // Persist data
  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('registeredEmails', JSON.stringify([...allEmails]));
  }, [candidates, profile, allEmails]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfile(prev => ({
          ...prev,
          image: file,
          preview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileInput = (e) => {
    const { name, value } = e.target;
    setNewProfile(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    if (!newProfile.name || !newProfile.email) return;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newProfile.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Check if email already exists
    if (allEmails.has(newProfile.email)) {
      alert('This email is already registered');
      return;
    }

    const profileToSave = {
      ...newProfile,
      id: uuidv4(),
      image: null,
      hasVoted: false,
      createdAt: new Date().toISOString()
    };

    setProfile(profileToSave);
    allEmails.add(newProfile.email);
    setEditingProfile(false);
    setNewProfile({ name: '', email: '', image: null, preview: '' });
  };

  const handleVote = (candidateId) => {
    if (!profile || profile.hasVoted) return;

    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, votes: candidate.votes + 1 } 
        : candidate
    ));

    setProfile(prev => ({
      ...prev,
      hasVoted: true
    }));
  };

  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Section */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Voter Profile</h2>
        
        {!profile ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    {newProfile.preview ? (
                      <img src={newProfile.preview} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <span className="text-gray-500">Add Photo</span>
                    )}
                  </div>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={newProfile.name}
                  onChange={handleProfileInput}
                  className="w-full p-2 mb-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={newProfile.email}
                  onChange={handleProfileInput}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <button
              onClick={saveProfile}
              disabled={!newProfile.name || !newProfile.email}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Register Profile
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={profile.preview || "https://via.placeholder.com/100"} 
                alt="Profile" 
                className="rounded-full w-16 h-16 mr-4 object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">{profile.name}</h3>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-sm text-gray-500">
                  {profile.hasVoted ? 'Vote submitted' : 'Eligible to vote'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setEditingProfile(true)}
              className="text-blue-600 hover:text-blue-700"
              disabled={profile.hasVoted}
            >
              Edit Profile
            </button>
          </div>
        )}

        {editingProfile && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <label htmlFor="imageUploadEdit" className="cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    {newProfile.preview ? (
                      <img src={newProfile.preview} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <span className="text-gray-500">Change Photo</span>
                    )}
                  </div>
                </label>
                <input
                  id="imageUploadEdit"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={newProfile.name}
                  onChange={handleProfileInput}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={saveProfile}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingProfile(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Voting Section */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Cast Your Vote</h2>
        {!profile ? (
          <p className="text-red-500">Please register a profile to vote</p>
        ) : profile.hasVoted ? (
          <p className="text-green-600">You have already voted. Thank you!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {candidates.map(candidate => (
              <div key={candidate.id} className="bg-white p-4 rounded-lg shadow-md">
                <img 
                  src={candidate.image} 
                  alt={candidate.name} 
                  className="w-full h-32 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold mb-2">{candidate.name}</h3>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to vote for this candidate?')) {
                      handleVote(candidate.id);
                    }
                  }}
                  className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Vote Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Election Results</h2>
        <p className="mb-4">Total Votes Cast: {totalVotes}</p>
        <div className="space-y-4">
          {candidates.map(candidate => (
            <div key={candidate.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{candidate.name}</h3>
                  <p className="text-gray-600">Votes: {candidate.votes}</p>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${(candidate.votes / (totalVotes || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectionPage;