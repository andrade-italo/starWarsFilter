import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionClear } from '../redux/action';
import './feedback.css';

class Feedback extends Component {
  handleClick = () => {
    const { dispatch, history } = this.props;
    history.push('/');
    dispatch(actionClear());
  };

  click = () => {
    const { history } = this.props;
    history.push('./ranking');
  }

  render() {
    const { userName, score, finish, assertions, gravatarImage } = this.props;
    const msg = assertions <= 2 ? 'Could be better...' : 'Well Done!';
    return (
      <header className={ finish ? 'feedbackCardContainer' : 'feedbackContainer' }>
        <img src={ gravatarImage } alt="avatar" data-testid="header-profile-picture" />
        <p
          className={ finish ? 'feedbackCard' : 'feedback' }
          data-testid="header-player-name"
        >
          Nome:
          { ` ${userName}` }

        </p>
        <p
          className={ finish ? 'feedbackCard' : 'feedback' }
          data-testid={ finish ? 'feedback-total-score' : 'header-score' }
        >
          Score:
          { ` ${score}` }
        </p>
        <p
          className={ finish ? 'feedbackCard' : 'feedback' }
          data-testid="feedback-total-question"
        >
          Acertos:
          { ` ${assertions}` }

        </p>
        { finish ? (
          <div className="finish">
            <p data-testid="feedback-text">{ msg }</p>
            <button
              data-testid="btn-play-again"
              type="button"
              onClick={ this.handleClick }
            >
              Play Again
            </button>
            <button
              data-testid="btn-ranking"
              type="button"
              onClick={ this.click }
            >
              Ranking
            </button>
          </div>) : ('') }
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  userEmail: player.gravatarEmail,
  userName: player.name,
  score: player.score,
  assertions: player.assertions,
  finish: player.finish,
  gravatarImage: player.gravatarImage,
});

Feedback.propTypes = {
  gravatarImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  finish: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
