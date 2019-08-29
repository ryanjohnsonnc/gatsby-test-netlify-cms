import React from 'react'
import PropTypes from 'prop-types'

class HomeCards extends React.Component {
  constructor(){
    super();

    this.state = {
      singleOpen: false,
    };

    this.toggleSingle = this.toggleSingle.bind(this);
    this.handler = this.handler.bind(this);
  }

  toggleSingle() {
    this.setState({
      singleOpen: !this.state.singleOpen
    });
  }

  handler(){
    this.setState({
      singleOpen: !this.state.singleOpen
    });
  }

  render() {
    return (
      <div className={`c_homeCards single-open-${this.state.singleOpen}`}>
        <div className="homeCards_wrapper is-clearfix">
          {this.props.cards.map(card => (
            <HomeCard 
              title={card.solution}
              image={card.solutionImage.childImageSharp.fluid.src}
              quote={card.solutionQuote}
              slides={card.solutionInfo}
              action={this.handler}
            />
          ))}     
        </div>
      </div>
    )
  }
}

HomeCards.propTypes = {
  cards: PropTypes.array,
}

// INDIVIDUAL CARD COMPONENT (Main Piece Here)
class HomeCard extends React.Component {
  constructor(){
    super();

    this.state = {
      cardOpen: false,
    };

    this.toggleSingleCard = this.toggleSingleCard.bind(this);
  }

  cardImageStyle = (src) => ({
    backgroundImage: 'url(' + src + ')'
  });

  toggleSingleCard() {
    this.setState({
      cardOpen: !this.state.cardOpen
    });
    this.props.action();
  };

  render() {
    return (
      <div key={this.props.title} className={`homeCards_card ${this.state.cardOpen ? 'card-open': ''} `}>
        <div>                    
          <figure 
            className="card_image" 
            style={this.cardImageStyle(this.props.image)}
          >
            <h3 className="title is-size-4 is-uppercase has-text-weight-bold">{this.props.title}</h3>
          </figure>
          
          <div className="card_content">
            <p>{this.props.quote}</p>
            <button 
              onClick={this.toggleSingleCard}
              className="button is-primary is-thin"
            >
              Explore More
            </button>
          </div>
        </div>
      </div>
    )
  }
}

HomeCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.array,
  quote: PropTypes.string,
  slides: PropTypes.array,
}

export default HomeCards

