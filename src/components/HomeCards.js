import React from 'react'
import PropTypes from 'prop-types'
//mport PreviewCompatibleImage from '../components/PreviewCompatibleImage'
//import Img from "gatsby-image"
import Slider from "react-slick";
import Modal from 'react-modal';
import HomeMobileSlides from '../components/HomeMobileSlides'
const modalStyles = {
  content : {
    top                   : '0%',
    left                  : '0%',
    right                 : '0px',
    bottom                : '0px',
  }
};

Modal.setAppElement('#___gatsby')

class HomeCards extends React.Component {
  constructor(){
    super();

    this.state = {
      modalIsOpen: false,
      solution: '',
      image: '',
      quote: '',
      slides: [],
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal = (event) => {
    this.setState({
      modalIsOpen: true,
      solution: event.target.attributes['data-solution'].value,
      image: event.target.attributes['data-image'].value,
      quote: event.target.attributes['data-quote'].value,
      slides: event.target.attributes['data-slides'].value,
    });
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  cardImageStyle = (src) => ({
    backgroundImage: 'url(' + src + ')'
  })

  render() {
    var cardSettings = {
      dots: false,
      controls: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
    };
    return (
      <div className={`c_homeCards`}>
        <div className="">
          <div className="homeCards_wrapper">
            <Slider {...cardSettings}>
              {this.props.cards.map(card => (
                
                <div key={card.solution} className="homeCards_card">
                  <div>                    
                    <figure 
                      className="card_image" 
                      style={this.cardImageStyle(card.solutionImage.childImageSharp.fluid.src)}
                    ></figure>
                    
                    <div className="card_content">
                      <h3 className="title is-size-4 is-uppercase has-text-weight-bold">{card.solution}</h3>
                      <p>{card.solutionQuote}</p>
                      <button 
                        onClick={this.openModal} 
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
            </Slider>

            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={modalStyles}
              contentLabel="Solution Modal"
            > 
              <div className="card_modal-mobile">
                <figure 
                  className="card_image" 
                  style={this.cardImageStyle(this.state.image)}
                >
                  <h2 className="title has-color-white is-size-4 is-uppercase">{this.state.solution}</h2>
                </figure>
    
                <p className="card_quote">{this.state.quote}</p>

                <div className="card_slides">
                  <HomeMobileSlides
                    slides={this.state.slides}
                  />
                </div>
              
                <button className="modal_close" onClick={this.closeModal}>X</button>
              </div>
            </Modal>         
          </div>
        </div>
      </div>
    )
  }
}

HomeCards.propTypes = {
  cards: PropTypes.array,
}

export default HomeCards

