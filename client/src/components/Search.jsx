import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import MUI from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

// import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
// import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import TextField from 'material-ui/TextField';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    console.log("SEARCH PROPS", this.props)
    this.onSearch = this.onSearch.bind(this);
    
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    
    this.onMenuClick = this.onMenuClick.bind(this);
    this.arts = this.arts.bind(this) 
    this.comedy = this.comedy.bind(this) 
    this.education = this.education.bind(this) 
    this.kidsFamily = this.kidsFamily.bind(this) 
    this.health = this.health.bind(this) 
    this.tvFilm = this.tvFilm.bind(this)
    this.music = this.music.bind(this)
    this.newsPolitics = this.newsPolitics.bind(this) 
    this.religionSpirituality = this.religionSpirituality.bind(this) 
    this.scienceMedicine = this.scienceMedicine.bind(this) 
    this.sportsRecreation = this.sportsRecreation.bind(this) 
    this.technology = this.technology.bind(this) 
    this.business = this.business.bind(this) 
    this.gamesHobbies = this.gamesHobbies.bind(this) 
    this.societyCulture = this.societyCulture.bind(this) 
    this.governmentOrganizations = this.governmentOrganizations.bind(this)

}

  handleToggle() { this.setState({open: !this.state.open}); }

  handleClose() { this.setState({open: false}); }

  onSearch(event) {
    if (event.charCode === 13) {
      setTimeout(() => {
        console.log('Search Query from component enter: ',this._query)
        this.props.onSearch(this._query);
        this.props.currentPodcastView('Search Results');
      }, 0);
    }
    else {
      setTimeout(() => {
        this.props.currentPodcastView('Search Results');
      }, 0);
    }
  }

  onMenuClick(genreID) {
    this.props.onMenuClick(genreID);
    this.handleClose();
  }
  arts() {
    this.onMenuClick(1301);
  } 
  comedy() {
    this.onMenuClick(1303);
  } 
  education() {
    this.onMenuClick(1304);
  } 
  kidsFamily() {
    this.onMenuClick(1305);
  } 
  health() {
    this.onMenuClick(1307);
  } 
  tvFilm() {
    this.onMenuClick(1309);
  } 
  music() {
    this.onMenuClick(1310);
  } 
  newsPolitics() {
    this.onMenuClick(1311);
  } 
  religionSpirituality() {
    this.onMenuClick(1314);
  } 
  scienceMedicine() {
    this.onMenuClick(1315);
  } 
  sportsRecreation() {
    this.onMenuClick(1316);
  } 
  technology() {
    this.onMenuClick(1318);
  } 
  business() {
    this.onMenuClick(1321);
  } 
  gamesHobbies() {
    this.onMenuClick(1323);
  } 
  societyCulture() {
    this.onMenuClick(1324);
  } 
  governmentOrganizations() {
   this.onMenuClick(1325);
  } 

  render() {
    return (

      <MUI>

      <Toolbar className="toolbar"  style={{ backgroundColor: '#F50057' }}>
        <ToolbarGroup>
          <IconButton touch={true}>
            <MenuIcon 
              onTouchTap ={this.handleToggle} 
              className="whiteIcon"/>

          <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
            >
            <MenuItem onTouchTap={this.handleClose}>Favorites</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>Unfinished</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>History</MenuItem>
            <Divider/>
            <MenuItem onTouchTap={this.arts}>Arts</MenuItem>
            <MenuItem onTouchTap={this.comedy}>Comedy</MenuItem>
            <MenuItem onTouchTap={this.education}>Education</MenuItem>
            <MenuItem onTouchTap={this.kidsFamily}>Kids & Family</MenuItem>
            <MenuItem onTouchTap={this.health}>Health</MenuItem>
            <MenuItem onTouchTap={this.tvFilm}>TV & Film</MenuItem>
            <MenuItem onTouchTap={this.music}>Music</MenuItem>
            <MenuItem onTouchTap={this.newsPolitics}>News & Politics</MenuItem>
            <MenuItem onTouchTap={this.religionSpirituality}>Religion & Spirituality</MenuItem>
            <MenuItem onTouchTap={this.scienceMedicine}>Science & Medicine</MenuItem>
            <MenuItem onTouchTap={this.sportsRecreation}>Sports & Recreation</MenuItem>
            <MenuItem onTouchTap={this.technology}>Technology</MenuItem>
            <MenuItem onTouchTap={this.business}>Business</MenuItem>
            <MenuItem onTouchTap={this.gamesHobbies}>Games & Hobbies</MenuItem>
            <MenuItem onTouchTap={this.societyCulture}>Society & Culture</MenuItem>
            <MenuItem onTouchTap={this.governmentOrganizations}>Government & Organizations</MenuItem>

          </Drawer>
          </IconButton>

          <Link to='/' onClick={() => 
                {  this.props.getHomePage(); this.props.currentPodcastView('Top 10 Podcasts!');}}>
            <ToolbarTitle 
            text="NETPODS" 
            style={{ color: 'white', letterSpacing: '2px' }} />
          </Link>

        </ToolbarGroup>

        <ToolbarGroup>

          {/*}  <Link to='/' onClick={() => 
                {  this.props.getHomePage(); this.props.currentPodcastView('Top 10 Podcasts!');}}>
                <FlatButton label="Home" style={{ color: 'white' }} />
            </Link> 

          */}

            <TextField hintText="Search"
                       ref={(input) => {
                          if (input) {
                            this._query = input.input.value; 
                          }
                       }}                       
                       onKeyPress={this.onSearch}/>

          { console.log("Logged in? ", this.props.loggedIn )}
          { !this.props.loggedIn ?
            (<Link to='/login'>
              <FlatButton label="Login" style={{ color: 'white' }}/>
            </Link>) 
            :
            (<Link to='/logout' onClick={ () => this.props.logoutUser() }>
                <FlatButton label="Logout" style={{ color: 'white' }}/>
              </Link>) }            

          </ToolbarGroup>
        </Toolbar>

      </MUI>

    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default Search;
