import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const AboutPageTemplate = ({ title, altTitle, history, advantages, record, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      <section className="section has-background-black page-hero">
        <div class="container">
          <div className="columns">
            <div className="column is-desktop is-7">
              <div className="section has-text-white">
                <h1 className="title is-size-1 has-text-weight-bold has-text-white">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section about">
        <div className="container">
          <div className="columns">
            <div className="column is-desktop is-6">
              <h2 className="title">History</h2>
              <p>{history}</p>
            </div>
            <div className="column is-desktop is-6">
              <h2 className="title">Advantages</h2>
              <p>{advantages}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title has-text-weight-bold is-bold-light">
                  {title}
                </h2>

                <h3>
                  {altTitle}
                </h3>
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  altTitle: PropTypes.string,
  history: PropTypes.string,
  advantages: PropTypes.string,
  record: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        altTitle = {post.frontmatter.stitle}
        history= {post.frontmatter.history}
        advantages= {post.frontmatter.advantages}
        record= {post.frontmatter.record}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        stitle
        history
        advantages
        record
      }
    }
  }
`