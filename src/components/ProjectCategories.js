import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import HorizontalScroll from 'react-scroll-horizontal'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

class ProjectCategories extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      show: false
    }
  }
  
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const componentClasses = ['c_projectCategories'];
    if (this.state.show) { componentClasses.push('show'); }

    return (
      <div className={componentClasses.join(' ')}>
        <HorizontalScroll
          reverseScroll = {true}
          className     = {"projectSlider_wrapper"}
          config        ={{ stiffness: 160, damping: 110 }}
        >
          {posts && posts.map(({ node: post }) => (
            <div className="slide">
              <SlideContent
                image={post.frontmatter.featuredimage.childImageSharp.fluid.src}
                title={post.frontmatter.title}
                slug={post.fields.slug}
              />
              
            </div>  
          ))}

          <div className="slide slide--last">
            <figure className="slide_image-wrapper">
              
            </figure>
          </div> 
        </HorizontalScroll>
      </div>
    )
  }
}

ProjectCategories.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  show: 'React.PropTypes.bool',
}


export class SlideContent extends React.Component {
  slideImageStyle = (src) => ({
    backgroundImage: 'url(' + src + ')'
  })
  render() {
    const slug = this.props.slug
    return (
      <figure className="slide_image-wrapper">
        <AniLink 
          cover 
          direction="left"
          bg="pink" 
          className="slide_link" 
          to={slug}
          
        >
          
        </AniLink>
        <span className="slide_title">{this.props.title}</span>
        <div 
          className="slide_image" 
          style={this.slideImageStyle(this.props.image)}
        >
        </div>
      </figure>
    )
  }
}

SlideContent.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  slug: PropTypes.string,
}

export default () => (
  <StaticQuery
    query={graphql`
      query ProjectCategoryQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "project" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 300, quality: 80) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ProjectCategories data={data} count={count} />}
  />
)
