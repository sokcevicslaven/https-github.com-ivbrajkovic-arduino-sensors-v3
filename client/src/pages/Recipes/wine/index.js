// Wine recipes

import React, { useState, useEffect, useRef } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { setErrorAction } from '../../../store/actions';

// Material UI
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

// Custom styles
import useStyles from './style';

// Helper fnc
import { fetchHelper } from '../../../helper';

// Add recipes row into database
const addRecipesData = async (data, dispatch) => {
  try {
    // Fetch update recipes API
    await fetchHelper({
      url: '/recipes',
      method: 'POST',
      token: window.localStorage.getItem('token'),
      data
    });
    return true;
  } catch (error) {
    dispatch(setErrorAction(error));
  }
};

// Get recipes data from database
const deleteRecipesData = async (day, dispatch) => {
  try {
    // Fetch recipes API
    await fetchHelper({
      url: '/recipes/' + day,
      method: 'DELETE',
      token: window.localStorage.getItem('token')
    });
    return true;
  } catch (error) {
    dispatch(setErrorAction(error));
  }
};

// Get recipes data from database
const getRecipesData = async dispatch => {
  try {
    // Fetch recipes API
    const { data } = await fetchHelper({
      url: '/recipes',
      token: window.localStorage.getItem('token')
    });

    return data;
  } catch (error) {
    dispatch(setErrorAction(error));
  }
};

// Update wine recipes data
const updateRecipesData = async (data, dispatch) => {
  try {
    // Fetch recipes API
    await fetchHelper({
      url: '/recipes',
      method: 'PUT',
      token: window.localStorage.getItem('token'),
      data
    });
    return true;
  } catch (error) {
    dispatch(setErrorAction(error));
  }
};

const WineRecipes = () => {
  // Styles
  const newRowRef = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();

  // Local state
  const [state, setState] = useState([]);

  /************************************************************
   * Handlers
   ************************************************************/

  const valueChange = (i, e) => {
    const { name, value } = e.target;
    setState(state => {
      const newState = [...state];
      newState[i][name] = value;
      return newState;
    });
  };

  const deleteHandler = async day => {
    const success = await deleteRecipesData(day, dispatch);
    success &&
      setState(state => {
        const newState = [...state].filter(el => el.day !== day);
        return newState;
      });
  };

  const addHandler = async () => {
    const row = newRowRef.current;
    const day = row.querySelector('input[name="day"');
    const min = row.querySelector('input[name="min"');
    const max = row.querySelector('input[name="max"');
    const data = { day: day.value, min: min.value, max: max.value };

    // Send data to database
    if (!(await addRecipesData(data, dispatch))) return;

    setState(state => {
      const newState = [...state, data];
      return newState;
    });

    day.value = '';
    min.value = '';
    max.value = '';
  };

  const updateHandler = async day => {
    const data = state.find(el => el.day === day);
    data && updateRecipesData(data, dispatch);
  };

  /************************************************************
   * Effects
   ************************************************************/

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecipesData(dispatch);
      data && setState(data);
    };
    fetchData();
  }, []);

  return (
    <Paper elevation={12} className={classes.root}>
      <Typography variant='subtitle1'>Wine recipe</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Day</TableCell>
            <TableCell align='right'>Min</TableCell>
            <TableCell align='right'>Max</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((row, i) => (
            <TableRow key={i}>
              <TableCell align='left'>{row.day}.</TableCell>
              <TableCell align='right'>
                <TextField
                  className={classes.textField}
                  name='min'
                  value={row.min}
                  onChange={e => valueChange(i, e)}
                />
              </TableCell>
              <TableCell align='right'>
                <TextField
                  className={classes.textField}
                  name='max'
                  value={row.max}
                  onChange={e => valueChange(i, e)}
                />
              </TableCell>
              <TableCell align='right'>
                <IconButton onClick={() => deleteHandler(row.day)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => updateHandler(row.day)}>
                  <RefreshIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          <TableRow ref={newRowRef}>
            <TableCell align='left'>
              <TextField className={classes.textField} name='day' />
            </TableCell>
            <TableCell align='right'>
              <TextField className={classes.textField} name='min' />
            </TableCell>
            <TableCell align='right'>
              <TextField className={classes.textField} name='max' />
            </TableCell>
            <TableCell align='left'>
              <IconButton onClick={addHandler}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default WineRecipes;
