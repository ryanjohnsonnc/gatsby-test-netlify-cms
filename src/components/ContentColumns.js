import React from 'react'
import PropTypes from 'prop-types'

class ContentColumns extends React.Component {
  constructor(){
    super();

    this.state = {
      activeColumn: 'first'
    };

    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover = (e) => {
    this.setState({
      activeColumn: e.target.attributes['data-order'].value,
    })
    
    //this.state.activeColumn === 'first' ? newState.activeColumn = 'second' : this.setState(newState);
    console.log(e.currentTarget);
  }

  render() {

    return (
      <section className={`section c_contentColumns ${this.props.className} hover-${this.state.activeColumn}`}>
        <div className="container">
          <div className={`columns hover-${this.state.activeColumn}`}>
            <div 
              onMouseEnter={this.toggleHover}
              className="column is-desktop is-6"
              data-order="first"
            >
              <h2 className="title">History</h2>
              <p>{this.props.columnOneContent}</p>
            </div>
            <div 
              className="column is-desktop is-6"
              onMouseEnter={this.toggleHover}
              data-order="second"
            >
              <h2 className="title">Advantages</h2>
              <p>{this.props.columnTwoContent}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ContentColumns.propTypes = {
  columnOneContent: PropTypes.string,
  columnTwoContent: PropTypes.string,
  className: PropTypes.string,
}

export default ContentColumns
