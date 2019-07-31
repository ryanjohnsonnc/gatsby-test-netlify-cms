import React from 'react'
//import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const IndustryCards = ({ cards }) => (
  
  <section className={`section c_industryCards has-background-grey-lighter`}>
    <div className="container">
      <div className="columns">
        {cards.map(card => (
          <div key={card.industry} className="column is-3">
            <h3>{card.industry}</h3>
            <p>{card.industryShort}</p>
            <PreviewCompatibleImage imageInfo={card.industryInfo.industryImage} />
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
