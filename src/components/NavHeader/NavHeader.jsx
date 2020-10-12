import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, InputBase, Toolbar, AppBar } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Link, withRouter } from 'react-router-dom';
import './styles/nav-header.scss';

class NavHeader extends Component {
  handleSearch = ({ target: { value } }) => {
    const { history } = this.props;

    const route = value ? `/?search=${value}` : '/';

    history.push(route);
  }

  render () {
    return (
      <AppBar
        className="nav-header"
        position="static"
      >
        <Toolbar>
          <Typography variant="h4">
            <Link
              to="/"
              className="nav-header__link"
            >
              Home
            </Link>
          </Typography>

          <div className="nav-header__search">
            <div className="nav-header__search-icon">
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: 'nav-header__search-input',
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={this.handleSearch}
            />
          </div>
          <Link
            to="/upload"
            className="nav-header__upload-btn"
          >
            upload
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

NavHeader.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(NavHeader);
