import React from 'react';
import $ from 'jquery';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }

  componentDidMount() {
    let context = this;
    $.get('/getUser', function(results) {
      if (results.user) {
        context.setState({
          loggedIn: results.user
        });
      }
    });
  }

  handleOnRatingClick(e) {
    if (this.state.loggedIn && this.state.loggedIn.length > 0) {
      $(e.target.previousSibling).prop('checked', true);
      var rating = $(e.target.previousSibling).val();
      $.post('/addRating', {collectionId: this.props.collectionId, rating: rating, username: this.state.loggedIn})
        .done(result => console.log(result));
    } else {
      window.location.href = '/login';
    }
  }

  render() {
    return (
      <div className="add-rating-container">
      <div className='add-rating-label'>Rate This</div>
        <div className="add-rating-wrapper">
          <form action="" onClick={(e) => this.handleOnRatingClick(e)}>
            <p className="clasificacion">
                <input id="radio10" type="radio" name="estrellas1" value="5"/>
                <label className='add-rating' htmlFor="radio10">&#9733;</label>
                <input id="radio20" type="radio" name="estrellas1" value="4" />
                <label className='add-rating' htmlFor="radio20">&#9733;</label>
                <input id="radio30" type="radio" name="estrellas1" value="3" />
                <label className='add-rating' htmlFor="radio30">&#9733;</label>
                <input id="radio40" type="radio" name="estrellas1" value="2" />
                <label className='add-rating' htmlFor="radio40">&#9733;</label>
                <input id="radio50" type="radio" name="estrellas1" value="1" />
                <label className='add-rating' htmlFor="radio50">&#9733;</label>
            </p>
          </form>
        </div>
      </div>
    );
  }

}

export default Rating;
