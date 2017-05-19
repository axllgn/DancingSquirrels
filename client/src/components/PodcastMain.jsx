import React from 'react';
import $ from 'jquery';
import PodcastList from './PodcastList.jsx';
import PropTypes from 'prop-types';

const PodcastMain = (props) => {

  // console.log("PodcastMain PROPS", props);

  return (

    <div className='main-container'>

      <PodcastList
        podcasts={props.podcasts}
        onClickPodcast={props.onClickPodcast} 
        currentPodcastView={props.currentPodcastView}/>
        
    </div>
  );
};

PodcastMain.propTypes = {
  podcasts: PropTypes.array.isRequired,
  onClickPodcast: PropTypes.func.isRequired
};

export default PodcastMain;
