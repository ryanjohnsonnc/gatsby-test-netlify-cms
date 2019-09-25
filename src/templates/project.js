import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { CarouselProvider, Slider, Slide} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

export default class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 

    }
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
                  <a href="#" class="page_title-nav-item is-size-6 has-text-white-">{project.title}</a>
                ))}
              </div>
              <div className="column is-9 page_content">
                <ProjectsList
                  projects={frontmatter.projectList}
                />
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
  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={this.props.projects.length}
        orientation="horizontal"
      >
        <Slider>
          {this.props.projects.map((project, i) => (
            <Slide key={i}>
              {project.title}
              <img src={project.featuredimage.childImageSharp.fluid.src} />
            </Slide>  
          ))}
        </Slider>
      </CarouselProvider>
    )
  }
}

ProjectsList.propTypes = {
  projects: PropTypes.array,
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


export class ProjectSlider extends React.Component {
  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={this.props.slides.length}
        orientation="horizontal"
      >
        <Slider>
          {this.props.slides.map((slide, i) => (
            <div key={i}>
              {slide.title}
              {/* {slide.projectSlides.map((item, j) => (
                <p key={j}>{item.description}</p>
              ))} */}
            </div>
            
              
          ))}
        </Slider>
      </CarouselProvider>
    )
  }
}

ProjectSlider.propTypes = {
  slides: PropTypes.array,
}


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