import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import HomeCardsMobile from '../components/HomeCardsMobile'
import HomeCards from '../components/HomeCards'

class IndexPageTemplate extends React.Component {
  constructor(){
    super();

    this.state = {
      cardsOpen: false,
      arrow: true
    }

    this.toggleCards = this.toggleCards.bind(this);
    this.handler = this.handler.bind(this);
  }

  toggleCards() {
    this.setState({
      cardsOpen: !this.state.cardsOpen
    });
  }

  toggleArrow(){
    this.setState({
      arrow: !this.state.arrow
    });
  }

  handler(){
    this.setState({
      cardsOpen: !this.state.cardsOpen
    });
  }

  render() {
    return (
      <div className="c_indexPage has-background-black section">
        <div className={`indexPage_content cardsOpen-${this.state.cardsOpen} container`}>
          <div className="columns indexPage_content-container">
            <header className="indexPage_header column is-6">
              <h1 className="is-size-4 is-uppercase has-text-weight-bold">{this.props.headline}</h1>
              <p>{this.props.intro}</p>
              <button className="button is-primary first" onClick={this.toggleCards}>
                Learn More
              </button>
              <Link className="button is-primary is-hollow" to="/about">
                See Projects
              </Link>
            </header>
          </div>

          <button 
            className={`homeCards_close arrow-${this.state.cardsOpen}`}
            onClick={this.toggleCards}
          >
          </button>

          <HomeCardsMobile
            cards={this.props.cards}
          />

          <HomeCards
            cards={this.props.cards}
            action={this.handler}
            arrow={this.toggleArow}
          />

          <div className="indexPage_about-callout">
            <span className="is-size-6 has-color-grey-dark bannered"><span>Want to learn more about the company?</span></span>
            <Link className="is-size-7 has-text-weight-bold is-uppercase has-color-grey-dark" to="/about">
              About Us
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

IndexPageTemplate.propTypes = {
  headline: PropTypes.string,
  intro: PropTypes.string,
  cards: PropTypes.array,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        headline={frontmatter.title}
        intro={frontmatter.description}
        cards={frontmatter.solutionCards}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heading
        description
        solutionCards {
          solution
          solutionShort
          solutionQuote
          solutionImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          solutionInfo {
            title
            content
          }
        }
      }
    }
  }
`