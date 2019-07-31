import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import ContentColumns from '../components/ContentColumns'
import IndustryCards from '../components/IndustryCards'

export const AboutPageTemplate = ({ title, altTitle, history, advantages, record, cards, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  console.log(cards);
  return (
    <div>
      <section className="section has-background-black page-hero">
        <div className="container">
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
      
      <ContentColumns 
        columnTwoContent={advantages}
        columnOneContent={history}
        className= "about"
      />
     

      <section className="section record">
        <div className="container">
          <div className="columns">
            <div className="column is-desktop is-6">
              <div class="record_image"></div>
            </div>
            <div className="column is-desktop is-6 record_content">
              <h2 className="title">Track Record</h2>
              <p>{record}</p>
            </div>
          </div>
        </div>
      </section>

      <IndustryCards 
        cards={cards}
      />

      <section className="section has-background-grey-lighter">
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
  cards: PropTypes.array,
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
        cards= {post.frontmatter.industryCards}
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
        industryCards {
          industry
          industryShort
          industryInfo {
            industryLong
  
          }
        }
      }
    }
  }
`