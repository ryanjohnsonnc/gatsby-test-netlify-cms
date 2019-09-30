import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import HorizontalScroll from 'react-scroll-horizontal'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

export default class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      projectOpen: false,
      project: 99
    }

    this.updateProject = this.updateProject.bind(this);
  }

  updateProject = project => {      
    this.setState({
      projectOpen: !this.state.projectOpen,
      project: project
    })
  }

  changeProject = e => {      
    this.setState({
      project: e.target.attributes['data-project'].value
    })
  }

  closeProject = project => {      
    this.setState({
      projectOpen: false,
      project: 99
    })
  }

  render() {
    const { frontmatter } = this.props.data.markdownRemark

    return (
      <Layout>
        <div className={`page c_project page_title--left is-flex`}>
          <div className="container">
            <div className="columns is-flex">
              <div className={`column is-3 page_title has-background-black show-subnav--${this.state.projectOpen}`}>
                <h1 className="is-size-1 has-text-weight-bold has-text-white main-title">{frontmatter.title}</h1>
                <div className="page_subnav">
                  <h1 className="is-size-4 has-text-weight-bold has-text-white">{frontmatter.title}</h1>

                  {frontmatter.projectList.map((project, i) => (
                    <button 
                      data-project={i} 
                      className={`page_title-nav-item is-size-6 ${this.state.project === i ? 'active' : ''}`}
                      onClick={this.changeProject}
                    >
                      {project.title}
                    </button>
                  ))}
                </div>
              </div>
              <div className={`column is-9 page_wrapper project-visible--${this.state.projectOpen} project-visible--${this.state.project}`}>
                <ProjectsList
                  projects={frontmatter.projectList}
                  handler={this.updateProject}
                />

                {frontmatter.projectList.map((project, i) => (
                  <ProjectSlider
                    images={project.projectSlides}
                    project={i}
                    handler={this.closeProject}
                  />
                ))}
                
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

Project.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}


export class ProjectsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 

    }
  }

  sendData = (e) => {
    this.props.handler(e.target.attributes['data-project'].value);
  }

  goToProjects = e => {
    window.location = '/projects'
  }
  render() {
    return (
      <div className="c_projectsList">
        <HorizontalScroll
          reverseScroll = {true}
          className     = {"project_wrapper"}
          config        ={{ stiffness: 160, damping: 110 }}
        >
          {this.props.projects.map((project, i) => (
            <div className="project_slide">
              <div className="project_slide-wrapper">
                <div 
                  className="project_trigger"
                  onClick={this.sendData}
                  data-project={i}
                ></div>
                <header className="slide_header">
                  <h2 className="title is-size-4 has-text-weight-bold">{project.title}</h2>
                </header>
                <img className="slide_image" alt="Basic Descriptions" src={project.previewImage.childImageSharp.fluid.src} />
              </div>
            </div>
          ))}
        </HorizontalScroll>

        <AniLink 
          cover
          direction="right"
          to="/projects" 
          className={`projectSlider_back`}
          title="Back To Projects"
        >
          <i className="arrow"></i>
          <span className="text">Back</span>
        </AniLink>
      </div>
    )
  }
}

ProjectsList.propTypes = {
  projects: PropTypes.array,
}


export class ProjectSlider extends React.Component {
  render() {
    return (
      <div className={`c_projectSlider project--${this.props.project}`}>
        <HorizontalScroll
          reverseScroll = {true}
          className     = {"projectSlider_wrapper"}
          config        ={{ stiffness: 160, damping: 110 }}
        >
          {this.props.images.map((image, i) => (
            <div className="slide" key={i}>
              <figure className="slide_image-wrapper">
                <div className="slide_content">
                  <p>{image.slideDescription}</p>
                </div>
                <img className="slide_image" alt="Basic Descriptions" src={image.slideImage.childImageSharp.fluid.src} />
              </figure>
            </div>  
          ))}
        </HorizontalScroll>
        
        <button 
          className={`projectSlider_back`}
          onClick={this.props.handler}
        >
          <i className="arrow"></i>
          <span className="text">Back</span>
        </button>
      </div>
    )
  }
}

ProjectSlider.propTypes = {
  images: PropTypes.array,
}


export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        heading
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 600, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        projectList {
          title
          previewImage {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          projectSlides {
            slideDescription
            slideImage {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`