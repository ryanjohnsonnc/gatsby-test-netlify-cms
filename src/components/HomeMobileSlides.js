import React from 'react'
import PropTypes from 'prop-types'
import Slider from "react-slick"


class HomeMobileSlides extends React.Component {
  // constructor(){
  //   super();

    
  // }

  render() {
    var mobileSettings = {
      dots: true,
      controls: false,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: false,
    };

    var slideJSON = this.props.slides
    var slidesObj = JSON.parse(slideJSON);

    return (
      <div className={`c_MobileSlides`}>

        <Slider {...mobileSettings}>
          {slidesObj.map(slide => (
            <div className="slide solution_slide" key={slide.title}>
              <h3 className="is-size-3 is-uppercase has-text-weight-bold">{slide.title}</h3>
              <p className="is-size-4 has-text-weight-bold">{slide.content}</p>
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}

HomeMobileSlides.propTypes = {
  slides: PropTypes.string,
}

export default HomeMobileSlides

