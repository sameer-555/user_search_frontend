import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useForm, Controller } from 'react-hook-form';

const AddUser = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();
  const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);

  const onSubmit = async (formData) => {
    const apiUrl = `${process.env.BACKEND_ENDPOINT}/add`
    // 'http://localhost:8000/user/add';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User added successfully!');
        reset();
        setSnackbarOpen(true);
      } else {
        console.error('Error adding user:', response.statusText);
        setError('name', { message: 'Error adding user. Please try again.' });
      }
    } catch (error) {
      console.error('Error adding user:', error.message);
      setError('name', { message: 'Error adding user. Please try again.' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card style={cardStyles} variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add User
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField label="Name" fullWidth {...field} error={!!errors.name} helperText={errors.name?.message} />
            )}
          />

          <Controller
            name="age"
            control={control}
            defaultValue=""
            rules={{ required: 'Age is required' }}
            render={({ field }) => (
              <TextField label="Age" type="number" fullWidth {...field} error={!!errors.age} helperText={errors.age?.message} />
            )}
          />

          <Controller
            name="height"
            control={control}
            defaultValue=""
            rules={{ required: 'Height is required' }}
            render={({ field }) => (
              <TextField label="Height" type="number" fullWidth {...field} error={!!errors.height} helperText={errors.height?.message} />
            )}
          />

          <Controller
            name="weight"
            control={control}
            defaultValue=""
            rules={{ required: 'Weight is required' }}
            render={({ field }) => (
              <TextField label="Weight" type="number" fullWidth {...field} error={!!errors.weight} helperText={errors.weight?.message} />
            )}
          />

          <Button type="submit" variant="contained" color="primary" style={buttonStyles}>
            Submit
          </Button>
        </form>
      </CardContent>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
          User added successfully!
        </MuiAlert>
      </Snackbar>
    </Card>
  );
};

const cardStyles = {
  maxWidth: '400px',
  margin: '0 auto',
  background: '#EDE7F6', // Light purple background
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  marginTop: '20px',
};

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const buttonStyles = {
  marginTop: '16px',
};

export default AddUser;
