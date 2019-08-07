import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class TeamCards extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <section className={`section c_teamCards has-background-grey-lighter`}>
        <div className="container">
          <div className="columns is-multiline">
            {posts &&
              posts.map(({ node: post }) => (
                <div className="is-parent column is-3 teamCards_card" key={post.id}>
                  <div class="card_wrapper">
                    {post.frontmatter.featuredimage ? (
                      <div className="card_image">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: post.frontmatter.featuredimage,
                            alt: `Picture of ${
                              post.name
                            }`,
                          }}
                        />
                      </div>
                    ) : 'no image'}

                    <Link
                      className="title is-size-4 card_title"
                      to='/about'
                    >
                      {post.frontmatter.name}
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    )
  }
}

TeamCards.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query TeamCards {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "team-member" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                name
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
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
    render={(data, count) => <TeamCards data={data} count={count} />}
  />
)
