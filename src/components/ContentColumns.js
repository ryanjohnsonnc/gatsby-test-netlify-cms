import React from 'react'
import PropTypes from 'prop-types'

export const ContentColumns = ({ columnOneContent, columnTwoContent, className }) => (
  <section className={`section c_contentColumns ${className}`}>
    <div className="container">
      <div className="columns">
        <div className="column is-desktop is-6">
          <h2 className="title">History</h2>
          <p>{columnOneContent}</p>
        </div>
        <div className="column is-desktop is-6">
          <h2 className="title">Advantages</h2>
          <p>{columnTwoContent}</p>
        </div>
      </div>
    </div>
  </section>
)

ContentColumns.propTypes = {
  columnOneContent: PropTypes.string,
  columnTwoContent: PropTypes.string,
  className: PropTypes.string,
}

export default ContentColumns
