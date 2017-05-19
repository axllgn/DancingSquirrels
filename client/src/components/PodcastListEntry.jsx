import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import ViewRating from './ViewRating.jsx';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class PodcastListEntry extends React.Component {

  constructor(props) {
    super(props);

    this.onClickPodcast = this.onClickPodcast.bind(this);
    // this.onFavorite = this.onFavorite.bind(this);
    // let hashArr = window.location.hash.split('/');
    // this.username = hashArr[hashArr.length - 1];

    console.log("PODCAST",this.props)
  }

  // onFavorite() {
  //   // console.log(hashArr[hashArr.length - 1]);
  //   $.post('/favorite', {
  //     username: this.username,
  //     feedUrl: this.props.podcast.feedUrl,
  //     collectionId: this.props.podcast.collectionId,
  //     artworkUrl100: this.props.podcast.artworkUrl100,
  //     collectionName: this.props.podcast.collectionName,
  //     artistName: this.props.podcast.artistName
  //   })
  //     .done(result => console.log(result));
  // }

  onClickPodcast() {
    this.props.onClickPodcast(
      this.props.podcast.feedUrl, this.props.podcast.collectionId, 
      () => {
        this.context.router.history.push('/episodes');
    });
  }

  render() {

    return ( 

              <div className="tileContainer">

                { this.props.loggedIn ? 
                      <IconButton className="favBtn"
                                  onClick={ () => this.onFavorite(this.props.podcast) }> 
                                <StarBorder color="#333" /> 
                        </IconButton> : null }

                  <div className="tile"
                        onClick={ () => this.onClickPodcast(this.props.podcast) }
                        key={this.props.podcast.artworkUrl600} >
                    
                    { this.props.loggedIn ?  
                      (<IconButton className="favBtn">
                        <StarBorder color="#333" />
                      </IconButton>) : null }

                    <img className="tileImg" 
                         src={this.props.podcast.artworkUrl600} />

                  </div>

                  <div className="tileInfo">
                    <p className="podTitle">{ this.props.podcast.collectionName }</p>
                    <em className="podGenre">{ this.props.podcast.primaryGenreName }</em>
                  </div>
                    
              </div> )
        
         {/*return (
          <GridTile
            onClick={ this.onClickPodcast }
            key={this.props.podcast.artworkUrl100}
            title={this.props.podcast.collectionName}
            cols={8}
            rows={8}
            actionIcon={<IconButton><StarBorder color="#333" /></IconButton>}
            titleStyle={{color: '#333'}}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            style={{ border: '1px solid red'}}
          >
            <img src={this.props.podcast.artworkUrl100} />
          </GridTile> );
      

    return (

      

        <div className='podcast-card' onClick={ this.onClickPodcast }>
          <img src={this.props.podcast.artworkUrl100} />
          
          <div className='podcast-title-author'>
            <h5>{this.props.podcast.collectionName}</h5>
            <p>{this.props.podcast.artistName}</p>

            {
              this.props.podcast.rating
              ? (<div>
                  <ViewRating rating={this.props.podcast.rating} />
                  <div className="review-num">
                    {this.props.podcast.noOfReviews} reviews
                  </div>
                </div>)
              : null
            }

          </div>
        </div>
    ); */}
  }

}

PodcastListEntry.contextTypes = {
  router: PropTypes.object
};

PodcastListEntry.propTypes = {
  podcast: PropTypes.object.isRequired,
  onClickPodcast: PropTypes.func.isRequired
};

export default PodcastListEntry;
