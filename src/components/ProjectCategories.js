import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import HorizontalScroll from 'react-scroll-horizontal'


class ProjectCategories extends React.Component {
  slideImageStyle = (src) => ({
    backgroundImage: 'url(' + src + ')'
  })

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
    return (
      <div className="c_projectCategories">
        <HorizontalScroll
          reverseScroll = {true}
          className     = {"projectSlider_wrapper"}
          config        ={{ stiffness: 160, damping: 110 }}
        >
          {posts && posts.map(({ node: post }) => (
            <div className="slide">
              <figure className="slide_image-wrapper">
                <Link 
                  className="slide_link" to={`/${post.fields.slug}`}>
                  
                </Link>
                <span className="slide_title">{post.frontmatter.title}</span>
                <div 
                  className="slide_image" 
                  style={this.slideImageStyle(post.frontmatter.featuredimage.childImageSharp.fluid.src)}
                >
                </div>
              </figure>
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
