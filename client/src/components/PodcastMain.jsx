import React from 'react';
import $ from 'jquery';
import PodcastList from './PodcastList.jsx';
import PropTypes from 'prop-types';

const PodcastMain = (props) => {

  return (
    <div className='main-container'>
      
      <PodcastList
        podcasts={ props.podcasts }
        categories={props.categories}
        arts={props.arts}
        comedy={props.comedy}
        education={props.education}
        kidsFamily={props.kidsFamily}
        health={props.health}
        tvFilm={props.tvFilm}
        music={props.music}
        newsPolitics={props.newsPolitics}
        religionSpirituality={props.religionSpirituality}
        scienceMedicine={props.scienceMedicine}
        sportsRecreation={props.sportsRecreation}
        technology={props.technology}
        business={props.business}
        gamesHobbies={props.gamesHobbies}
        societyCulture={props.societyCulture}
        governmentOrganizations={props.governmentOrganizations}
        onClickPodcast={props.onClickPodcast } 
        currentPodcastView={props.currentPodcastView}
        loggedIn={ props.loggedIn } />
    </div>

  );
};

PodcastMain.propTypes = {
  podcasts: PropTypes.array.isRequired,
  onClickPodcast: PropTypes.func.isRequired
};

export default PodcastMain;
