import React from 'react';
import { Link, graphql } from 'gatsby'

import Layout from '../../components/Layout';

const BlogPage = (props) => {
  return(
    <Layout>
      <section className="section main-image">
        <div className="container">
          <h1>Blog</h1>
          <div>Blogs to go here</div>
        </div>
      </section>
    </Layout>
  )
}

export default BlogPage;
export const blogPageQuery = graphql`
  query blogPageQuery {
    allMarkdownRemark(
      sort: { order: DESC , fields: [frontmatter___title] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          id
          html
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