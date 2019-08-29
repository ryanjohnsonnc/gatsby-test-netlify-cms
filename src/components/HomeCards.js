import React from 'react'
import PropTypes from 'prop-types'



class HomeCards extends React.Component {
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
    const currentState = this.state.cardOpen;
    this.setState({ cardOpen: !currentState });
};

  render() {
    return (
      <div className={`c_homeCards single-open-${this.state.cardOpen}`}>
        <div className="homeCards_wrapper is-clearfix">
          {this.props.cards.map(card => (
            <div key={card.solution} className={`homeCards_card ${this.state.cardOpen ? 'card-open': null} `}>
              <div>                    
                <figure 
                  className="card_image" 
                  style={this.cardImageStyle(card.solutionImage.childImageSharp.fluid.src)}
                >
                  <h3 className="title is-size-4 is-uppercase has-text-weight-bold">{card.solution}</h3>
                </figure>
                
                <div className="card_content">
                  <p>{card.solutionQuote}</p>
                  <button 
                    onClick={() => {
                      this.toggleSingleCard();
                      this.setState({cardOpen: !this.state.cardOpen});
                    }}
                    data-solution={card.solution}
                    data-image={card.solutionImage.childImageSharp.fluid.src}
                    data-quote={card.solutionQuote}
                    data-slides={JSON.stringify(card.solutionInfo)}
                    className="button is-primary is-thin"
                  >
                    Explore More
                  </button>
                </div>
              </div>
            </div>
          ))}     
        </div>
        
      </div>
    )
  }
}

HomeCards.propTypes = {
  cards: PropTypes.array,
}

export default HomeCards

