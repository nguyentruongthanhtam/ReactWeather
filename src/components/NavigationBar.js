import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import InfoIcon from '@material-ui/icons/Info';
import StoreIcon from '@material-ui/icons/Store';
import WeatherIcon from '@material-ui/icons/WbSunny';

import {Link} from 'react-router-dom'
const styles = {
  root: {
    height: '10vh'
  },
  link: {
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,

  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Weather" className={classes.link} component={Link} to="/weather" icon={<WeatherIcon />}/>
        <BottomNavigationAction label="Store" className={classes.link} component={Link} to="/inventory" icon={<StoreIcon />}/>
        <BottomNavigationAction label="About" className={classes.link} icon={<InfoIcon />}/>
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
