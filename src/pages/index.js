import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'


import './styles/index.scss';

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section main-image">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half">
                Image
              </div>

            </div>
          </div>
        </section>

        <section className="section products-list">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                Product 1
              </div>
              <div className="column is-4">
                Product 2
              </div>
            </div>
          </div>
        </section>

        <section className="section content-lists">
          <div className="container">
            <div className="content columns">
              <div className="column is-4">Benztown News</div>
              <div className="column is-4">Instagram</div>
              <div className="column is-4">Twiiter</div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
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
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
