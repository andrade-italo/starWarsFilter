import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import { actionToken, actionPlayer, actionFetch } from '../redux/action';
import './login.css';

class Login extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    isDisabled: true,
  }

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    }, () => this.handleDisable());
  }

  handleDisable = () => {
    const { userName, userEmail } = this.state;

    if ((userName && userEmail !== '') && userEmail.endsWith('.com')) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleClick = async () => {
    const { dispatch } = this.props;
    const { userName, userEmail } = this.state;

    const fetchApiToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await fetchApiToken.json();

    localStorage.setItem('token', response.token);

    dispatch(actionToken(response.token));

    const hash = md5(userEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;

    dispatch(actionPlayer({ userEmail, userName, url }));
    dispatch(actionFetch(response.token));
  }

  render() {
    const { userName, userEmail, isDisabled } = this.state;
    const { result, history } = this.props;
    if (result.length > 0) history.push('/tela');

    return (
      <div className="App">
        <header className="App-header">
          <img id="imgTrivia" src={ logo } className="App-logo" alt="logo" />
          <form className="loginContainer">
            <label htmlFor="input-player-name">
              Nome:
              {' '}
              <input
                autoComplete="off"
                value={ userName }
                name="userName"
                placeholder="Digite seu nome"
                onChange={ this.handleChange }
                type="text"
                data-testid="input-player-name"
                id="input-player-name"
              />
            </label>
            <label htmlFor="input-gravatar-email">
              Email:
              {' '}
              <input
                autoComplete="off"
                placeholder="email@provedor.com"
                value={ userEmail }
                name="userEmail"
                onChange={ this.handleChange }
                type="email"
                data-testid="input-gravatar-email"
                id="input-player-name"
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.handleClick }
              id="btn-play"
            >
              Play
            </button>
          </form>

          <Link to="settings">
            <button
              type="button"
              id="btnSettings"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>

        </header>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
  result: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  result: state.fetch.results,
});

export default connect(mapStateToProps, null)(Login);
