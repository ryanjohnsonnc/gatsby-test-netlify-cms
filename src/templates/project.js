import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import HorizontalScroll from 'react-scroll-horizontal'

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

  render() {
    const { frontmatter } = this.props.data.markdownRemark

    return (
      <Layout>
        <div className={`page c_project page_title--left is-flex`}>
          <div className="container">
            <div className="columns is-flex">
              <div className={`column is-3 page_title has-background-black`}>
                <h1 className="is-size-1 has-text-weight-bold has-text-white">{frontmatter.title}</h1>
                {frontmatter.projectList.map(project => (
                  <a href="#" className="page_title-nav-item is-size-6 has-text-white-">{project.title}</a>
                ))}
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
              <img className="slide_image" alt="Basic Descriptions" src={image.slideImage.childImageSharp.fluid.src} />
            </div>  
          ))}
        </HorizontalScroll>
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





// <Slide className="slide project_slide" key={slide.title}>
//   <div>
//     <h3 className="is-size-4 is-uppercase has-text-weight-bold">{slide.title}</h3>
//   </div>
// </Slide>

{/* <nav class="project_nav">
{frontmatter.projectList.map(project => (
  <div>{project.title}</div>
))}
</nav>
<ProjectSlider
slides={frontmatter.projectList}
/> */}