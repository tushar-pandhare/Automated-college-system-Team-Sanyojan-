import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ElectionComponent = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        axios.get('/api/elections/candidates')
            .then(response => setCandidates(response.data))
            .catch(err => console.error(err));
    }, []);

    const handleVote = (candidateId) => {
        axios.post('/api/elections/vote', { candidateId })
            .then(() => {
                setCandidates(candidates.map(candidate => 
                    candidate._id === candidateId ? { ...candidate, votes: candidate.votes + 1 } : candidate
                ));
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Student Election</h1>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate._id}>
                        {candidate.candidateName} - {candidate.votes} votes
                        <button onClick={() => handleVote(candidate._id)}>Vote</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ElectionComponent;
