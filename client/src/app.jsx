import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PodcastMain from './components/PodcastMain.jsx';
import UserHomePage from './components/UserHomePage.jsx';
import PodcastEpisodes from './components/PodcastEpisodes.jsx';
import Login from './components/Login.jsx';
import Search from './components/Search.jsx';
import Signup from './components/Signup.jsx';
import ReactRouter from 'react-router';
import LocalLogin from './components/LocalLogin.jsx';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* astros */
// import { AppBar } from 'react-toolbox/lib/app_bar';
import MUI from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPodcastView: 'Top 10 Podcasts!',
      podcasts: [],
      arts: [],
      comedy: [],
      education: [],
      kidsFamily: [],
      health: [],
      tvFilm: [],
      music: [],
      newsPolitics: [],
      religionSpirituality: [],
      scienceMedicine: [],
      sportsRecreation: [],
      technology: [],
      business: [],
      gamesHobbies: [],
      societyCulture: [],
      governmentOrganizations: [],
      podcastEpisodes: {},
      loggedIn: ''
    };

    this.categories = [['arts', 1301], 
                       ['comedy', 1303], 
                       ['education', 1304], 
                       ['kidsFamily',1305], 
                       ['health',1307], 
                       ['tvFilm', 1309], 
                       ['music', 1310], 
                       ['newsPolitics', 1311],
                       ['religionSpirituality', 1314],
                       ['scienceMedicine', 1315],
                       ['sportsRecreation', 1316],
                       ['technology', 1318],
                       ['business', 1321],
                       ['gamesHobbies', 1323],
                       ['societyCulture', 1324],
                       ['governmentOrganizations', 1325]]

    this.currentPodcastView = this.currentPodcastView.bind(this);
    this.getHomePage = this.getHomePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onClickPodcast = this.onClickPodcast.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.updateLoggedIn = this.updateLoggedIn.bind(this);
  }

  componentWillMount() {
    this.updateLoggedIn();
    this.getHomePage();
  }

  updateLoggedIn(){
    $.get('/getUser')
      .done((results) => {
        this.setState({ loggedIn: results.user });
        console.log('----> UPDATE USER NAME:', results.user);
      })    
  }

  onSearch(query) {
    $.post('/search', { search: query })
      .done((results) => {
        console.log('Search Query: ', query);
        this.setState({
          podcasts: results
        });
        this.updateRatings();
      });
  }

  onMenuClick(genreID) {
    console.log('Menu clicked from client with ID: ', genreID);
     $.post('/menu', { menuItem: genreID })
      .done((results) => {
        console.log(results);
        this.setState({
          podcasts: results
        });
        this.updateRatings();
      });
  }

  updateRatings() {
    var collectionIds = this.state.podcasts.map((podcast) => {
      return podcast.collectionId;
    });
    $.get('/search-rating', { collectionIds })
        .done(rating => {
          if (rating && Object.keys(rating).length > 0) {
            var newPodcasts = this.state.podcasts;
            rating.forEach(function(val) {
              for ( var item of newPodcasts ) {
                if (item.collectionId === val.podcast_id ) {
                  item.rating = Math.round(val.rating);
                  item.noOfReviews = val.noofreviews;
                  break;
                }
              }
            });
            this.setState({
              podcasts: newPodcasts
            });
          }
        });
  }

  onClickPodcast(feedUrl, collectionId, callback) {
    // post request to the server
    $.post('/podcast', {
      feedUrl: feedUrl,
      collectionId: collectionId
    })
      .done((podcastEpisodes) => {
        // when done renderEpisodes is true AND episodes is set to the results
        // console.log(podcastEpisodes[0]);
        this.setState({
          podcastEpisodes: podcastEpisodes[0],
        });
        console.log('podcastEpisodes: ', this.state.podcastEpisodes);
        console.log('podcasts: ', this.state.podcasts);
        callback();
      });
  }

  getHomePage() {

    $.get('/topTen')
      .done((results) => {
        this.setState({
          podcasts: results
        });
        this.updateRatings();
      });

    this.categories.forEach((category) => {

      $.post(`/${category[0]}`, { genreID: category[1] })
        .done((results) => {
          this.setState({
            category: results
          });
          this.updateRatings();
      });
      
    })
  }

  logoutUser() {
    $.get('/logout', () => {
      this.setState({ 
        loggedIn: false,
      });
    });
    ReactRouter.browserHistory.push('/');
  }

  currentPodcastView(newPage) {
    this.setState({
      currentPodcastView: newPage
    });
  }

  render() {
    var context = this;
    return (
      <Router>
      <div>
        <Search onSearch={this.onSearch}
                getHomePage={this.getHomePage}
                logoutUser={this.logoutUser}
                currentPodcastView={this.currentPodcastView}
                onMenuClick={this.onMenuClick}
                loggedIn = {this.state.loggedIn} />
        <Switch>
          <Route name="root"
                 exact path="/"
                 component={() => (<PodcastMain 
                                      onSearch={this.onSearch}
                                      podcasts={this.state.podcasts}
                                      arts={this.state.arts}
                                      comedy={this.state.comedy}
                                      education={this.state.education}
                                      kidsFamily={this.state.kidsFamily}
                                      health={this.state.health}
                                      tvFilm={this.state.tvFilm}
                                      music={this.state.music}
                                      newsPolitics={this.state.newsPolitics}
                                      religionSpirituality={this.state.religionSpirituality}
                                      scienceMedicine={this.state.scienceMedicine}
                                      sportsRecreation={this.state.sportsRecreation}
                                      technology={this.state.technology}
                                      business={this.state.business}
                                      gamesHobbies={this.state.gamesHobbies}
                                      societyCulture={this.state.societyCulture}
                                      governmentOrganizations={this.state.governmentOrganizations}
                                      onClickPodcast={this.onClickPodcast}
                                      currentPodcastView={this.state.currentPodcastView}
                                      onMenuClick={this.onMenuClick}
                                      loggedIn={this.state.loggedIn} />)} />
          <Route path="/loginLocal" 
                 component={LocalLogin} />

          <Route path="/login" 
                 component={Login} />

          <Route path="/signup" 
                 component={Signup} />

          <Route path="/episodes" 
                 component={() => (<PodcastEpisodes 
                                      podcastEpisodes={this.state.podcastEpisodes} /> )} />
          
          <Route path="/logout" 
                 component={() => (<PodcastMain 
                                      onSearch={this.onSearch}
                                      podcasts={this.state.podcasts}
                                      arts={this.state.arts}
                                      comedy={this.state.comedy}
                                      education={this.state.education}
                                      kidsFamily={this.state.kidsFamily}
                                      health={this.state.health}
                                      tvFilm={this.state.tvFilm}
                                      music={this.state.music}
                                      newsPolitics={this.state.newsPolitics}
                                      religionSpirituality={this.state.religionSpirituality}
                                      scienceMedicine={this.state.scienceMedicine}
                                      sportsRecreation={this.state.sportsRecreation}
                                      technology={this.state.technology}
                                      business={this.state.business}
                                      gamesHobbies={this.state.gamesHobbies}
                                      societyCulture={this.state.societyCulture}
                                      governmentOrganizations={this.state.governmentOrganizations}
                                      onClickPodcast={this.onClickPodcast}
                                      currentPodcastView={this.state.currentPodcastView}
                                      onMenuClick={this.onMenuClick} 
                                      loggedIn={this.state.loggedIn} /> )} />
          <Route
            path="/:username"
            component={() => (<UserHomePage
                                updateLoggedIn={ this.updateLoggedIn }
                                loggedIn={this.state.loggedIn}
                                onSearch={this.onSearch}
                                podcasts={this.state.podcasts}
                                arts={this.state.arts}
                                comedy={this.state.comedy}
                                education={this.state.education}
                                kidsFamily={this.state.kidsFamily}
                                health={this.state.health}
                                tvFilm={this.state.tvFilm}
                                music={this.state.music}
                                newsPolitics={this.state.newsPolitics}
                                religionSpirituality={this.state.religionSpirituality}
                                scienceMedicine={this.state.scienceMedicine}
                                sportsRecreation={this.state.sportsRecreation}
                                technology={this.state.technology}
                                business={this.state.business}
                                gamesHobbies={this.state.gamesHobbies}
                                societyCulture={this.state.societyCulture}
                                governmentOrganizations={this.state.governmentOrganizations}
                                onClickPodcast={this.onClickPodcast}
                                onMenuClick={this.onMenuClick}/> )} />

          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('podcast-main'));
