import React from 'react'
import PropTypes from 'prop-types'
//mport PreviewCompatibleImage from '../components/PreviewCompatibleImage'
//import Img from "gatsby-image"
import Slider from "react-slick";

class HomeCards extends React.Component {
  constructor(){
    super();

    this.state = {
      cardsOpen: false
    }
  }

  cardImageStyle = (src) => ({
    backgroundImage: 'url(' + src + ')'
  })


  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '20px'
    };
    return (
      <section className={`c_homeCards`}>
        <div className="">
          <div className="homeCards_wrapper">
            <Slider {...settings}>
              {this.props.cards.map(card => (
                
                <div key={card.solution} className="homeCards_card">
                  <div>                    
                    <figure 
                      className="card_image" 
                      style={this.cardImageStyle(card.solutionImage.childImageSharp.fluid.src)}
                    ></figure>
                    
                    <div className="card_content">
                      <h3 className="title is-size-3 has-text-weight-bold">{card.solution}</h3>
                      <p>{card.solutionShort}</p>
                      <button href="#" className="button is-primary">Explore More</button>
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

            
          </div>
        </div>
      </section>
    )
  }
}

HomeCards.propTypes = {
  cards: PropTypes.shape({
    solution: PropTypes.string,
    solutionShort: PropTypes.string,
    solutionImage: PropTypes.string,
    solutionInfo: PropTypes.array,
  }),
}

export default HomeCards

