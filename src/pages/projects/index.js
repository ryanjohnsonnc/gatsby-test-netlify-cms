import React from 'react'

import Layout from '../../components/Layout'
import ProjectCategories from '../../components/ProjectCategories'

export default class ProjectsIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className={`page c_project page_title--left is-flex`}>
          <div className="container">
            <div className="columns is-flex">
              <div className={`column is-3 page_title has-background-black`}>
                <h1 className="is-size-1 has-text-weight-bold has-text-white main-title">Projects</h1>
              </div>
              <div className={`column is-9 page_wrapper`}>
                <ProjectCategories/>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
