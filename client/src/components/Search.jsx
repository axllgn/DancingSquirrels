import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

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
      <div className='search'>
        <header>
          <h1>podiocast</h1>
          <Link to='/' className='header-link' onClick={() => { 
                                                                this.props.getHomePage(); 
                                                                this.props.currentPodcastView('Top 10 Podcasts!');
                                                              } 
                                                       }>Home</Link>
          <Link to='login' className='header-link'>Login</Link>
          <Link to='logout' className='header-link' onClick={this.props.logoutUser}>Logout</Link>
          <input
            type='text'
            placeholder="Search"
            onKeyPress={this.onSearch}
            ref={(input) => this._query = input }
          />
        </header>
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default Search;
