import React from 'react'
//import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const IndustryCards = ({ cards }) => (
  
  <section className={`section c_industryCards has-background-grey-lighter`}>
    <div className="container">
      <div className="columns industryCards_wrapper">
        {cards.map(card => (
          <div key={card.industry} className="column industryCards_card">
            <h3 className="title">{card.industry}</h3>
            <p>{card.industryShort}</p>
          </div>
        ))}
      </div>
      <div className="industryCards_infoBox">
        {cards.map(card => (
          <div key={card.industry} className="infoBox_item columns">
            <div className="column">
              <p>{card.industryInfo.industryLong}</p>
            </div>
            <div className="column">
              <PreviewCompatibleImage imageInfo={card.industryInfo.industryImage} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// IndustryCards.propTypes = {
//   cards: PropTypes.arrayOf({
//     industry: PropTypes.string,
//     industryShort: PropTypes.string,
//     industryInfo: PropTypes.shape({
//       industryLong: PropTypes.string,
//       //industryImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//     })
//   })
// }

export default IndustryCards
