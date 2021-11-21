import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TvIcon from '@material-ui/icons/Tv';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#2d313a',
    zIndex: 100,
  },
});
export default function MainNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(() => {
    if (value === 0) {
      history.push('/');
    } else if (value === 1) {
      history.push('/movies');
    } else if (value === 2) {
      history.push('/series');
    } else if (value === 3) {
      history.push('/search');
    }
  }, [value, history]);

  return (
    <div data-testid="main_nav">
      <BottomNavigation
        data-testid="mui-btm-nav"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          data-testid="whatshot"
          style={{ color: 'white' }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          data-testid="movie-icon"
          style={{ color: 'white' }}
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          data-testid="tv-icon"
          style={{ color: 'white' }}
          label="TV Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          data-testid="search-icon"
          style={{ color: 'white' }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
