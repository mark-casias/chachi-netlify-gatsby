import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from "gatsby-image";
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import './about-page.scss';

export const AboutPageTemplate = (props) => {
  const { image, title, content, contentComponent } = props;
  const PageContent = contentComponent || Content

  return (
    <section className="section container about-page">
        <h1 className="title">
          {title}
        </h1>
        <div className="columns is-vcentered">
          <div className="column is-8">
            <PageContent className="content" content={content} />
          </div>
          <div className="column">
            <Img fixed={image.childImageSharp.fixed} />
          </div>
        </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
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
        image={post.frontmatter.image}
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
        image {
          childImageSharp {
            fixed(width: 300, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
