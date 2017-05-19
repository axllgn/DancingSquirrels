import React from 'react';
import $ from 'jquery';
import PodcastList from './PodcastList.jsx';
import PropTypes from 'prop-types';

const PodcastMain = (props) => {
     {console.log('-----MAIN PROPS-----', props)}

  return (
    <div className='main-container'>
      
      {props.categories.map((category) => {
        return (

        <PodcastList
          podcasts={ props[category] }
          category = {category}
          onClickPodcast={props.onClickPodcast } 
          currentPodcastView={props.currentPodcastView}
          loggedIn={ props.loggedIn } />
        
          )
      })}

    </div>

  );
};

PodcastMain.propTypes = {
  podcasts: PropTypes.array.isRequired,
  onClickPodcast: PropTypes.func.isRequired
};

export default PodcastMain;
