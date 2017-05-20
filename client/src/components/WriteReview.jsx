import React from 'react';
import $ from 'jquery';

class WriteReview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: ''
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

  handleOnReviewSubmit(e) {
    let context = this;
    let summaryInput = $($(e.target).siblings( '.summary' ));
    let reviewInput = $($(e.target).siblings( '.review' ));
    let summary = summaryInput.val();
    let review = reviewInput.val();
    if (context.state.loggedIn && context.state.loggedIn.length > 0) {
      let options = {
        collectionId: context.props.collectionId,
        summary: summary,
        review: review,
        username: context.state.loggedIn
      };
      $.post('/post-review', options)
          .done(result => {
            summaryInput.val('');
            reviewInput.val('');
            this.props.refreshReview();
          });

    } else {
      window.location.href = '/login';
    }
  }

  render() {
    return (
          <div className='review-container'>
            <label className='review-label'>Summary: </label>
            <input className='summary' type='text'></input><br/>
            <label className='label-review'>Review: </label>
            <textarea className='form-control review' rows='7' cols='50'></textarea><br/>
            <button onClick={(e) => this.handleOnReviewSubmit(e)} >Submit</button>
            <div className='clearfix'/>
          </div>
    );
  }
}

export default WriteReview;
