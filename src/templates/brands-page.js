import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

//import './brands-page.scss';

export const BrandsPageTemplate = (props) => {
  const { page, posts } = props;
  console.log(posts);
  return (
    <section className="section container brands-page">
        <h1 className="title">
          {page.frontmatter.title}
        </h1>
        <div
          className="brands-page__description"
          dangerouslySetInnerHTML={{__html: page.html}}
        />
        <div className="columns is-vcentered">
          <p>Brands go here.</p>
        </div>
    </section>
  )
}

const BrandsPage = ({ data }) => {
  return (
    <Layout>
      <BrandsPageTemplate {...data} />
    </Layout>
  )
}

export default BrandsPage

export const brandsPageQuery = graphql`
  query brandsPage($id: String!)  {
    posts:allMarkdownRemark(
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
            title
            description
          }
        }
      }
    }
    page:markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
    }
  }
`
