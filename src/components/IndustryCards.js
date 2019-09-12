import React from 'react'
import PropTypes from 'prop-types'
// import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import $ from 'jquery';

class IndustryCards extends React.Component {
  constructor() {
    super();

    this.state = {
      popoverContent: '',
      popoverImage: '',
    };

    this.updatePopover = this.updatePopover.bind(this);
  }

  updatePopover = (content, image) => {      
    this.setState({
      popoverContent: content,
      popoverImage: image
    })
  }

  componentDidMount() {
    // Simulate hover on first industry card
    var firstCard = $('.c_industryCards .industryCards_card:first-of-type');

    firstCard.mouseover();
  }
  
  render() {
    return (
      <section className={`section c_industryCards has-background-grey-lighter ${this.state.popoverContent}`}>
        <div className="container">
          <div className="columns industryCards_wrapper">
            {this.props.cards.map(card => (
              <IndustryCard
                key={card.industry}
                industry={card.industry}
                industryShort={card.industryShort}
                info={card.industryInfo}
                handler = {this.updatePopover}
              />
            ))}
          </div>
          <div className="industryCards_infoBox">
            <div className="infoBox_item columns">
              <div className="column content-column">
                <p>{this.state.popoverContent}</p>
              </div>
              <div className="column image-column">
                <img alt='Industry Photograph' className="infoBox_image" src={this.state.popoverImage} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

IndustryCards.propTypes = {
  cards: PropTypes.array,
}

// INDIVIDUAL CARD COMPONENT (Main Piece Here)
class IndustryCard extends React.Component {
  constructor(){
    super();

    this.state = {
      popoverContent: '',
      popoverImage: '',
    };
  }

  sendData = () => {
    this.props.handler(this.props.info.industryLong, this.props.info.industryImage.childImageSharp.fluid.src);
  }

  render() {

    return (
      <div 
        key={this.props.industry} 
        className={`column industryCards_card`}
        onMouseEnter={this.sendData}
      >
        <h3 className="title">{this.props.industry}</h3>
        <p>{this.props.industryShort}</p>
      </div>
    )
  }
}

IndustryCard.propTypes = {
  industry: PropTypes.string,
  industryShort: PropTypes.string,
  info: PropTypes.object,
}


export default IndustryCards
