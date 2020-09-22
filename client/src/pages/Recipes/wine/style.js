// WineRecipes - custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2),
    width: '100%',
    maxWidth: 365
    // backgroundColor: theme.palette.background.paper,
    // [theme.breakpoints.up('md')]: {
    //   maxWidth: 512
    // }
  },
  textField: {
    maxWidth: 35
  }
}));
