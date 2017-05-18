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

    const styles = { root: {
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-around',
                    },
                    gridList: {
                      display: 'flex',
                      flexWrap: 'nowrap',
                      overflowX: 'auto',
                    },
                    titleStyle: {
                      color: 'rgb(0, 188, 212)',
                    }
    };

    return (

      <div>

        <h3 className='podcast-results'>{this.props.currentPodcastView.toUpperCase()}</h3>

        <MUI>
        <div style={styles.root}>
        <GridList style={ styles.gridList } 
                  cols={4}
                  cellHeight='auto'
                  padding={20}
                  >

          { this.props.podcasts.map( (podcast, itr) => {

            return ( 

              <GridTile
                onClick={ this.onClickPodcast }
                key={podcast.artworkUrl100}
                cols={8}
                rows={4}
                style={{ border: '1px solid red'}}
              >
                <img src={podcast.artworkUrl100} />
              </GridTile> )
          
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
*/

PodcastList.propTypes = {
  podcasts: PropTypes.array.isRequired,
  onClickPodcast: PropTypes.func.isRequired,
  getFavPodcasts: PropTypes.func,
  loggedIn: PropTypes.bool
};

export default PodcastList;
