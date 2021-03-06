import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import PodcastListEntry from './PodcastListEntry.jsx';

import MUI from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


class PodcastList extends React.Component {
  constructor(props) {
    super(props);
    let hrefArr = window.location.href.split('/');
    this.username = hrefArr[hrefArr.length - 1];
    this.onClickPodcast = this.onClickPodcast.bind(this);
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

  onClickPodcast(podcast) {
    console.log("CLICKED ",podcast)
    var context = this;
    this.props.onClickPodcast(
      podcast.feedUrl, podcast.collectionId, 
      () => {
        this.context.router.history.push('/episodes');
    });
  }

  render() {

    const styles = { root: {
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-around'
                    },
                    gridList: {
                      display: 'flex',
                      flexWrap: 'nowrap',
                      overflowX: 'auto'
                    },
                    titleStyle: {
                      color: 'rgb(0, 188, 212)',
                    }
    };

    return (

      <div>

        <h3 className='podcast-results'>
        { this.props.currentPodcastView ? this.props.currentPodcastView.toUpperCase() : null  }
        </h3>

        <MUI>
        <div className="gridListContainer" style={styles.root}>
        <GridList style={ styles.gridList } 
                  cols={4}
                  cellHeight='auto'
                  padding={20}
                  >

          { this.props.podcasts.map( (podcast, itr) => {
            { console.log("POD", podcast) }
            return ( 
              <div className="tileContainer" onClick={ () => this.onClickPodcast(podcast) }>

              { this.props.loggedIn ? 
                    <IconButton className="favBtn"
                                onClick={ this.onFavorite.bind(this, podcast) }> 
                              <StarBorder color="#333" /> 
                      </IconButton> : null }

                      
                <GridTile
                  key={podcast.artworkUrl100}
                  cols={4}
                  rows={4}
                  actionIcon={ 
                    <IconButton className="favBtn">
                      <StarBorder color="#333" />
                    </IconButton>
                  }
                  className="tile">
                  <img className="tileImg" src={podcast.artworkUrl100}/>
                </GridTile>
                <div className="tileInfo">
                  <h4>{ podcast.collectionName }</h4>
                  <em>{ podcast.primaryGenreName }</em>
                </div>
                  
              </div> )
          
           {/* 
            
            chunk from the gridtile
            actionIcon={<IconButton><StarBorder color="#333" /></IconButton>}
                titleStyle={{color: '#333'}}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)" 
            
            
            return (<div>

                      <PodcastListEntry
                        key={itr}
                        podcast={podcast}
                        onClickPodcast={this.props.onClickPodcast}
                        loggedIn={this.props.loggedIn} />

                        { this.props.loggedIn ? 
                          <button className='favorite-button' 
                                  onClick={ this.onFavorite.bind(this, podcast) }> 
                                  Favorite 
                          </button> : null }

                    </div> );  */}

            
          }) }

        </GridList>
        </div>
        </MUI>
      </div>
      
    );
  }
}

/*
  <h3 className='podcast-results'>{this.props.currentPodcastView}</h3>
  <div className='podcast-wrapper'>
    {
      this.props.podcasts.map((podcast, itr) => {
        return (
          <div key={itr}>
            <PodcastListEntry
              key={itr}
              podcast={podcast}
              onClickkPodcast={this.props.onClickPodcast}
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
*/

PodcastList.propTypes = {
  podcasts: PropTypes.array.isRequired,
  onClickPodcast: PropTypes.func.isRequired,
  getFavPodcasts: PropTypes.func,
  loggedIn: PropTypes.bool
};

PodcastList.contextTypes = {
  router: PropTypes.object
};

export default PodcastList;
