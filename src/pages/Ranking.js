import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionClear, actionResetPlayer } from '../redux/action';
import './Ranking.css';

class Ranking extends Component {
  handleClassName = (index) => {
    if (index === 0) return 'first';
    if (index === 1) return 'second';
    if (index === 2) return 'third';
    return 'ranking-li';
  }

  // handleClassName2 = (index) => {
  //   if (index === 0) return 'number1';
  //   if (index === 1) return 'number2';
  //   if (index === 2) return 'number3';
  //   return 'position';
  // }

  render() {
    const { history, dispatch } = this.props;
    const players = JSON.parse(localStorage.getItem('ranking'));

    const orderdPlayers = players.sort((a, b) => (b.score - a.score));

    return (
      <div className="ranking-container">
        <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
          {/* <div className='scrollbar'> */}
          <ol className="ranking-ol">
            { orderdPlayers.map((player, index) => (
              <li className={ this.handleClassName(index) } key={ index }>
                  {index + 1}
                  º
                <div className="player-info-container">
                  <img src={ player.picture } alt="avatar" />
                  <p data-testid={ `player-name-${index}` }>{ player.name }</p>
                  <p data-testid={ `player-score-${index}` }>
                    Score:
                    {' '}
                    { player.score }
                    {' '}
                  </p>
                </div>
              </li>
            )) }
          </ol>
          {/* </div> */}

          <button
            className="ranking-home-btn"
            type="button"
            data-testid="btn-go-home"
            onClick={ () => {
              history.push('/');
              dispatch(actionClear());
              dispatch(actionResetPlayer());
            } }
          >
            Home
          </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
