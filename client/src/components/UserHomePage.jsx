import React from 'react';
import $ from 'jquery';
import Search from './Search.jsx';
import PodcastList from './PodcastList.jsx';
import PropTypes from 'prop-types';
import FavoritePodcasts from './FavoritePodcasts.jsx';


class UserHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      favoritePodcasts: []
    };
    let hrefArr = window.location.href.split('/');
    this.username = hrefArr[hrefArr.length - 1];
    this.getFavorites = this.getFavorites.bind(this);

    console.log("USER HOMEPAGE P",this.props);
  }

  getFavorites() {
    console.log(this.username);
    $.get('/favorite', {
      username: this.username
    })
      .done((result) => {
        this.setState({
          favoritePodcasts: result
        });
      });
  }

  render() {
    return (
      <div className='main-container'>
        <h2 className='podcast-results'>{this.username}'s Home Page</h2>
        <FavoritePodcasts
          favPodcasts={this.state.favoritePodcasts}
          getFavPodcasts={this.getFavorites}
          onClickPodcast={this.props.onClickPodcast}
          loggedIn={this.state.loggedIn}/>
        <h2 className='podcast-results'>Add Podcasts!</h2>
        <PodcastList
          podcasts={this.props.podcasts}
          onClickPodcast={this.props.onClickPodcast}
          getFavPodcasts={this.getFavorites}
          loggedIn={this.state.loggedIn}/>
      </div>
    )
  }
}

UserHomePage.propTypes = {
  onSearch: PropTypes.func.isRequired,
  podcasts: PropTypes.array.isRequired,
  onClickPodcast: PropTypes.func.isRequired
};

export default UserHomePage;
