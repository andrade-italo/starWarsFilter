import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';

class Question extends React.Component {
  render() {
    const { results, contador } = this.props;

    return (
      <div className="questions">
        { results.map((element, index) => {
          if (contador === index) {
            return (
              <div key={ index }>
                <div dangerouslySetInnerHTML={ { __html: sanitizeHtml(element.category) } } data-testid="question-category" id="question-category" />
                <div dangerouslySetInnerHTML={ { __html: sanitizeHtml(element.question) } } data-testid="question-text" id="questionText" />
              </div>
            );
          } return ('');
        }) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.fetch.results,
});

Question.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  contador: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Question);
