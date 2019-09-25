import React from 'react'
import PropTypes from 'prop-types'
import { CarouselProvider, DotGroup, Slider, Slide} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

//This file contains 3 components (HomeCards, HomeCard, CardCarousel)
class HomeCards extends React.Component {
  constructor(){
    super();

    this.state = {
      singleOpen: false,
    };

    this.toggleSingle = this.toggleSingle.bind(this);
  }

  toggleSingle(){
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
              key={card.solution}
              title={card.solution}
              image={card.solutionImage.childImageSharp.fluid.src}
              quote={card.solutionQuote}
              slides={card.solutionInfo}
              action={this.toggleSingle}
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
export class HomeCard extends React.Component {
  constructor(){
    super();

    this.state = {
      cardOpen: false
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
    const cardOpen = this.state.cardOpen;

    return (
      <div key={this.props.title} className={`homeCards_card ${this.state.cardOpen ? 'card-open': ''} `}>
        <div className="card_wrapper">                    
          <figure 
            className="card_image" 
            style={this.cardImageStyle(this.props.image)}
          >
            <h3 className="title is-size-4 is-uppercase has-text-weight-bold">{this.props.title}</h3>
          </figure>
          
          <div className="card_content">
            {cardOpen ? ( // The single card is open
              <div className="card_content--open">
                <div className="card_content-left">
                  <p>{this.props.quote}</p>
                </div>
                <div className={`card_content-right card-${this.state.cardOpen ? 'open': 'closed'} `}>
                  <CardCarousel
                   slides={this.props.slides}
                  />
                  <button 
                    onClick={this.toggleSingleCard}
                    className="modal_close"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : ( // The single card is not open
              <div className="card_content--closed">
                <p>{this.props.quote}</p>
                <button 
                  onClick={this.toggleSingleCard}
                  className="button is-primary is-thin"
                >
                  Explore More
                </button>
              </div>
            )}
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


export class CardCarousel extends React.Component {
  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={this.props.slides.length}
        orientation="horizontal"
      >
        <Slider>
          {this.props.slides.map(slide => (
            <Slide className="slide solution_slide" key={slide.title}>
              <div>
                <h3 className="is-size-4 is-uppercase has-text-weight-bold">{slide.title}</h3>
              </div>
              <p className="is-size-3 has-text-weight-bold">{slide.content}</p>
            </Slide>
          ))}
        </Slider>
        <DotGroup
          className="carousel_nav"
          dotNumbers="true"
          showAsSelectedForCurrentSlideOnly="true"
        >
        </DotGroup>
      </CarouselProvider>
    )
  }
}

CardCarousel.propTypes = {
  slides: PropTypes.array,
}

export default HomeCards

