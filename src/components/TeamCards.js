import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Modal from 'react-modal'
//import Content, { HTMLContent } from '../components/Content'

const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#___gatsby')

class TeamCards extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      name: '',
      title: '',
      bio: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal = (event) => {
    this.setState({
      modalIsOpen: true,
      name: event.target.attributes['data-name'].value,
      title: event.target.attributes['data-title'].value,
      bio: event.target.attributes['data-bio'].value
    });
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="c_teamCards"> 
        <div className="columns is-multiline">
          {posts &&
            posts.map((
              { node: post }
            ) => (
              <div className="is-parent column is-3 teamCards_card" key={post.id}>
                <div className="card_wrapper">
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
                  
                  <div className="card_info">
                    <span
                      className="title is-size-4 card_title"
                    >
                      {post.frontmatter.name}
                    </span>
                  </div>
                </div>
                <div 
                  href="/here"
                  onClick={this.openModal} 
                  data-name={post.frontmatter.name}
                  data-title={post.frontmatter.title}
                  data-bio={post.frontmatter.bio}
                  className="card_link is-size-7 has-text-weight-bold"
                >
                  Open Modal
                </div>
                
              </div>
            ))}

            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={modalStyles}
              contentLabel="Example Modal"
            >

              <h2 className="title">{this.state.name}</h2>
              <h3>{this.state.title}</h3>
              <p>{this.state.bio}</p>
              <button onClick={this.closeModal}>close</button>
              
            </Modal>
        </div>
      </div>
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
              html
              frontmatter {
                title
                name
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                bio
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
