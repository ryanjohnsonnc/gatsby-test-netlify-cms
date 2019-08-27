import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import HomeCards from '../components/HomeCards'

class IndexPageTemplate extends React.Component {
  constructor(){
    super();

    this.state = {
      cardsOpen: false
    }
  }

  render() {
    return (
      <div className="c_indexPage has-background-black section">
        <div className="indexPage_content container">
          <div className="columns">
            <header className="indexPage_header column is-6">
              <h1 className="is-size-4 is-uppercase has-text-weight-bold">{this.props.headline}</h1>
              <p>{this.props.intro}</p>
              <Link className="button is-primary is-hollow" to="/about">
                See Projects
              </Link>
            </header>
          </div>


          <HomeCards 
            cards={this.props.cards}
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



// export const FindexPageTemplate = ({
//   image,
//   stitle,
//   title,
//   heading,
//   subheading,
//   mainpitch,
//   description,
//   intro,
// }) => (
//   <div>
//     <div
//       className="full-width-image margin-top-0"
//       style={{
//         backgroundImage: `url(${
//           !!image.childImageSharp ? image.childImageSharp.fluid.src : image
//         })`,
//         backgroundPosition: `top left`,
//         backgroundAttachment: `fixed`,
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           height: '150px',
//           lineHeight: '1',
//           justifyContent: 'space-around',
//           alignItems: 'left',
//           flexDirection: 'column',
//         }}
//       >
//         <h1
//           className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
//           style={{
//             boxShadow:
//               'rgb(224, 24, 78) 0.5rem 0px 0px, rgb(224, 24, 78) -0.5rem 0px 0px',
//             backgroundColor: 'rgb(224, 24, 78)',
//             color: 'white',
//             lineHeight: '1',
//             padding: '0.25em',
//           }}
//         >
//           {title}
//         </h1>

//         <h2>
//           {stitle}
//         </h2>
//         <h3
//           className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
//           style={{
//             boxShadow:
//               'rgb(224, 24, 78) 0.5rem 0px 0px, rgb(224, 24, 78) -0.5rem 0px 0px',
//             backgroundColor: 'rgb(224, 24, 78)',
//             color: 'white',
//             lineHeight: '1',
//             padding: '0.25em',
//           }}
//         >
//           {subheading}
//         </h3>
//       </div>
//     </div>
//     <section className="section section--gradient">
//       <div className="container">
//         <div className="section">
//           <div className="columns">
//             <div className="column is-10 is-offset-1">
//               <div className="content">
//                 <div className="content">
//                   <div className="tile">
//                     <h1 className="title">{mainpitch.title}</h1>
//                   </div>
//                   <div className="tile">
//                     <h3 className="subtitle">{mainpitch.description}</h3>
//                   </div>
//                 </div>
//                 <div className="columns">
//                   <div className="column is-12">
//                     <h3 className="has-text-weight-semibold is-size-2">
//                       {heading}
//                     </h3>
//                     <p>{description}</p>
//                   </div>
//                 </div>
//                 <Features gridItems={intro.blurbs} />
//                 <div className="columns">
//                   <div className="column is-12 has-text-centered">
//                     <Link className="btn" to="/products">
//                       See all products
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="column is-12">
//                   <h3 className="has-text-weight-semibold is-size-2">
//                     Latest stories
//                   </h3>
//                   <BlogRoll />
//                   <div className="column is-12 has-text-centered">
//                     <Link className="btn" to="/blog">
//                       Read more
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   </div>
// )