import React from "react";
import { graphql } from "gatsby";

import Layout from "../../components/Layout";

import "./blog-style.scss";

const BlogPage = props => {
  console.log(props);
  return (
    <Layout>
      <section className="section main-image">
        <div className="container blog-posts">
          <h1 className="title">Blog</h1>
          {props.data.allMarkdownRemark.edges.map(({ node }) => {
            return (
              <div className="blog-post" key={node.id}>
                <h2 className="blog-post__title">{node.frontmatter.title}</h2>
                <div className="blog-post__body">
                  {node.frontmatter.description}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
export const blogPageQuery = graphql`
  query blogPageQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___title] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
`;
