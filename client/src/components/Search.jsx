import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import MUI from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(event) {
    // console.log(this._query.value);
    if (event.charCode === 13) {
      console.log(event.keyCode);
      this.props.onSearch(this._query.value);
      this.props.currentPodcastView('Search Results');
    }
  }

  render() {
    return (

      <MUI>
        {/*<AppBar className="search" 
                title="NETPODS" 
                iconClassNameRight="muidocs-icon-navigation-expand-more" 
                iconElementRight={ 

                  <div>

                  <FlatButton label="Home">
                    <Link to='/' onClick={() => 
                      {  this.props.getHomePage(); this.props.currentPodcastView('Top 10 Podcasts!');}}> 
                    </Link> 
                  </FlatButton> 

                  <FlatButton label="Login">
                    <Link to='/login'></Link>
                  </FlatButton> 

                  <FlatButton label="Logout">
                    <Link to='/logout' onClick={this.props.logoutUser}>
                    </Link>
                  </FlatButton> 

                  </div>}


        > */}

        <Toolbar>

          <IconButton touch={true}>
            <MenuIcon />
          </IconButton>


          <ToolbarTitle text="NETPODS" />

      {/* <div className='search'>
        
       <header> 

          <h1>NETPOD</h1>
        

          
          <Link to='/login' className='header-link'>Login</Link>
          <Link to='/logout' className='header-link' onClick={this.props.logoutUser}>Logout</Link>*/}
          <input
            type='text'
            placeholder="Search"
            onKeyPress={this.onSearch}
            ref={(input) => this._query = input }
          />

          </Toolbar>

        {/*</header>
      </div>

        </AppBar>*/}
      </MUI>

    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default Search;
