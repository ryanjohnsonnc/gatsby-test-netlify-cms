import React from 'react'
import PropTypes from 'prop-types'
//mport PreviewCompatibleImage from '../components/PreviewCompatibleImage'
//import Img from "gatsby-image"
import Slider from "react-slick";
import Modal from 'react-modal'
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

  returnSlides = (slides) => ({
   
  })
  returnSlides(slides) {
    return JSON.parse(slides);
  }

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

                    {/* {card.solutionInfo.map(slide => (
                      <div className="slide_content">
                        {slide.title}
                        {slide.content}
                      </div>
                    ))} */}
                  </div>
                </div>
              ))}
            </Slider>

            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={modalStyles}
              contentLabel="Example Modal"
            >
              <figure 
                className="card_image" 
                style={this.cardImageStyle(this.state.image)}
              >
                <h2 className="title">{this.state.solution}</h2>
              </figure>
                
              <p>{this.state.quote}</p>
              {this.returnSlides(this.state.slides)}
              
              {/* {this.state.slides.map(slide => (
                <div>
                  {slide.title}
                </div>
  
              ))} */}
              
              <button onClick={this.closeModal}>close</button>
            </Modal>
            
          </div>
        </div>
      </div>
    )
  }
}

HomeCards.propTypes = {
  // cards: PropTypes.shape({
  //   solution: PropTypes.string,
  //   solutionShort: PropTypes.string,
  //   solutionImage: PropTypes.string,
  //   solutionInfo: PropTypes.array,
  // }),
  cards: PropTypes.array,
}

export default HomeCards

