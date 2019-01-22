import React from 'react';
import { Link, graphql } from 'gatsby'

import Layout from '../../components/Layout';

const BrandsPage = (props) => {
  return(
    <Layout>
      <section className="section main-image">
        <div className="container">
          <h1>Brands</h1>
          <div>Brands to go here</div>
        </div>
      </section>
    </Layout>
  )
}

export default BrandsPage;
export const brandsPageQuery = graphql`
  query brandsPageQuery {
    allMarkdownRemark(
      sort: { order: DESC , fields: [frontmatter___title] },
      filter: { frontmatter: { templateKey: { eq: "brands-post" } }}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`