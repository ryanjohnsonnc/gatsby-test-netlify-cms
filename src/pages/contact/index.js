import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import ContactForm from '../../components/ContactForm'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <div className="page contact-page page_title--left is flex">
          <div className="container">
            <div className="columns is flex">
              <div className="column is-3 page_title has-background-black">
                <h1 className="is-size-1 has-text-weight-bold has-text-white">CONTACT US FOR MORE INFO</h1>
              </div>
              <div className="column is-9 page_content">
                <div className="content">
                  <p className="is-size-4 has-text-weight-bold">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
