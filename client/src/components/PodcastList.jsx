import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import PodcastListEntry from './PodcastListEntry.jsx';

class PodcastList extends React.Component {
  constructor(props) {
    super(props);
    let hrefArr = window.location.href.split('/');
    this.username = hrefArr[hrefArr.length - 1];

    console.log("LIST PROPS", props)
  }

  onFavorite(podcast) {
    // console.log(hrefArr[hrefArr.length - 1]);
    $.post('/favorite', {
      username: this.username,
      feedUrl: podcast.feedUrl,
      collectionId: podcast.collectionId,
      artworkUrl100: podcast.artworkUrl100,
      collectionName: podcast.collectionName,
      artistName: podcast.artistName
    })
      .done((result) => {
        this.props.getFavPodcasts();
      });
  }

  render() {
    return (
      <div>
        <h3 className='podcast-results'>{this.props.currentPodcastView}</h3>
        <div className='podcast-wrapper'>
          {
            this.props.podcasts.map((podcast, itr) => {
              return (
                <div key={itr}>
                  <PodcastListEntry
                    key={itr}
                    podcast={podcast}
                    onClickPodcast={this.props.onClickPodcast}
                    loggedIn={this.props.loggedIn}/>
                  { this.props.loggedIn
                    ? <button className='favorite-button' onClick={this.onFavorite.bind(this, podcast)}>Favorite</button>
                    : null
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

PodcastList.propTypes = {
  podcasts: PropTypes.array.isRequired,
  onClickPodcast: PropTypes.func.isRequired,
  getFavPodcasts: PropTypes.func,
  loggedIn: PropTypes.bool
};

export default PodcastList;
