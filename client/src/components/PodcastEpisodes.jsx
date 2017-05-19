import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import ViewRating from './ViewRating.jsx';
import Rating from './Rating.jsx';
import DisplayReview from './DisplayReview.jsx';
import WriteReview from './WriteReview.jsx';
import ReactAudioPlayer from 'react-audio-player'

class PodcastEpisodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.podcastEpisodes.rating || 0,
      noofreviews: this.props.podcastEpisodes.noofreviews || 0,
      nowPlaying: null
    };

    console.log("PodcastEpisodes Props", this.props.podcastEpisodes)
  }

  componentDidMount() {
    var reactContext = this;
    document.addEventListener('play', function(e){
      reactContext.setState({nowPlaying: $(e.target).attr('src')})
      //console.log($(e.target).attr('src'))
      console.log('presend', reactContext.state.nowPlaying)
      var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len;i++){
            if(audios[i] != e.target){
              if(!audios[i].paused){
                //********* Send play time ******
                audios[i].pause();
              }
            }
        }
    }, true);

    var collectionIds = [this.props.podcastEpisodes.collectionId];

    $.get('/search-rating', { collectionIds })
        .done(response => {
          if (response && Object.keys(response).length > 0) {
            this.setState({
              rating: Math.round(response[0].rating),
              noofreviews: response[0].noofreviews
            });
          }
        });
  }

  displayRefreshOnReviewSubmit() {
    this.child.refresh();
  }

  render() {

    return (
      <div className='podcast-episodes'>
        <div className='podcast-description'>
          {/*<h3>{props.podcastEpisodes.summary}</h3>*/}
          <img src={this.props.podcastEpisodes.image} height='200px' width='200px' />
          <h2>{this.props.podcastEpisodes.title}</h2>
          <p>{this.props.podcastEpisodes.description}</p>
          <div className='ratingcontainer'>
              <div className='viewrating'><ViewRating rating={this.state.rating}/></div>
              <div className='numreviews'>{this.state.noofreviews} reviews</div>
              <div className='addrating'><Rating collectionId={this.props.podcastEpisodes.collectionId}/></div>
            </div>
        </div>
        {this.props.podcastEpisodes.episodes.map((episode, itr) => {
          return (
            <div key={itr} className='podcast-episode'>
              <h4>{episode.title}</h4>
              <ReactAudioPlayer 
                src={episode.url}
                controls={true}
                preload="none"
                onPause={()=>{console.log(this)}}
              />

            </div>
          );
        })}

        <h3>User Reviews</h3>

        <WriteReview 
          collectionId={this.props.podcastEpisodes.collectionId} 
          refreshReview={this.displayRefreshOnReviewSubmit.bind(this)}
        />

        <DisplayReview 
          collectionId={this.props.podcastEpisodes.collectionId} 
          ref={instance => { this.child = instance; }} 
        />
        
      </div>

    );
  }
}
// {
//   this.state.renderEpisodes
//    ? <div className='podcast-episodes-wrapper'>
//     {
//       this.state.podcast.episodes.map((episode, itr) => {
//         return (
//           <div key={itr} className='podcast-episode'>
//             <h3>Title: {episode.title}</h3>
//             <audio controls>
//               <source src={episode.url} type="audio/mpeg" />
//             </audio>
//           </div>
//         );
//       }).slice(0, 10)
//     }
//     </div>
//    : null
// }

PodcastEpisodes.propTypes = {
  podcastEpisodes: PropTypes.object.isRequired
};

export default PodcastEpisodes;
