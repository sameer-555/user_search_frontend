import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';

const UserSearchList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const trimmedSearchTerm = searchTerm.trim();
      const apiUrl = `${process.env.REACT_APP_BACKEND_ENDPOINT}/user?name=${trimmedSearchTerm}`;

      try {
        setLoading(true);
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.error('Error fetching users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
      } finally {
        setLoading(false);
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

      {loading ? (
        <CircularProgress style={loaderStyles} />
      ) : (
        <div style={cardsContainerStyles}>
          {users.map((user, index) => (
            <Card key={user._id} style={cardStyles} variant="outlined">
              <CardContent>
                <div style={cancleHeader}>
                  <div>
                    <CancelIcon color='error' style={iconStyles} />
                  </div>
                  <div style={cancelledTextStyle}>Cancelled</div>
                  <div style={cancelHeaderTimeStyle}>
                    <div>
                      Order cancelled at
                    </div>
                    <div style={cancelHeaderDataStyle}>
                      {1+index}-11-2023
                    </div>
                  </div>
                </div>
                <div style={userContentStyles}>
                    <Typography>{user.name}</Typography>
                    <div>Age: {user.age}</div>
                    <div>Height: {user.height}</div>
                    <div>Weight: {user.weight}</div>
                </div>
                <div style={cardBottomStyles}>
                  <div style={orderStyle}>
                    <div style={orderHeader}>Order id:</div>
                    <div style={orderValue}>#{2334452+index}</div>
                  </div>
                  <div style={orderStyle}>
                    <div style={orderHeader}>Amount:</div>
                    <div style={orderValue}>${299*index}</div>
                  </div>
                  <Button style={reorderButtonStyle}>Reorder</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};



const orderHeader = {
  fontWeight: 300,
  padding: '2px'
}

const orderValue = {
  fontWeight: 600
}

const orderStyle = {
  paddingRight: '15px'
}

const cancelHeaderDataStyle = {
  alignSelf: 'center'
}

const cancelHeaderTimeStyle = {
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 200,
  marginLeft: "auto",
  fontSize: 'small'
}

const cancelledTextStyle = {
  fontWeight: 500,
  color: '#ff4d4d'
}

const reorderButtonStyle = {
  background: '#47d147',
  color: '#ffffff',
  marginLeft: "auto"
}

const cardBottomStyles = {
  display: 'flex',
  borderTop: '4px solid #e6e6e6',
  padding: '7px',
}

const userContentStyles = {
  padding: "8px",
  fontWeight: 200,
}

const iconStyles = {
  marginRight: '15px',
  marginTop: '5px'
};

const cancleHeader = {
  padding: '10px',
  background: '#ffe6e6',
  borderRadius: '8px 8px 0px 0px',
  display: 'flex',
  alignItems: 'center',
}
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
  borderRadius: ' 10px',
};

const loaderStyles = {
  margin: '20px auto',
  display: 'block',
};

export default UserSearchList;
