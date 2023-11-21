import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const UserSearchList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const trimmedSearchTerm = searchTerm.trim();
        const apiUrl = `${process.env.BACKEND_ENDPOINT}/user?name=${trimmedSearchTerm}`;
        try {
          const response = await fetch(apiUrl);
          if (response.ok) {
            const data = await response.json();
            setUsers(data.users);
          } else {
            console.error('Error fetching users:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching users:', error.message);
        }
    };

    fetchUsers();
  }, [searchTerm]); // Include searchTerm as a dependency

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={containerStyles}>
      <TextField
        label="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        variant="outlined"
        style={inputStyles}
      />

      <div style={cardsContainerStyles}>
        {users.map((user) => (
          <Card key={user._id} style={cardStyles} variant="outlined">
            <CardContent>
              <Typography variant="h6">{user.name}</Typography>
              <Typography>Age: {user.age}</Typography>
              <Typography>Height: {user.height}</Typography>
              <Typography>Weight: {user.weight}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const containerStyles = {
  maxWidth: '400px',
  margin: '0 auto',
  background: '#EDE7F6', // Light purple background
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  marginTop: '20px',
};

const inputStyles = {
  marginBottom: '16px',
};

const cardsContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
};

const cardStyles = {
  marginBottom: '16px',
};

export default UserSearchList;
