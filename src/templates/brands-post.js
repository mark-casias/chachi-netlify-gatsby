import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Image from "gatsby-image";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const BrandsPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  brands
}) => {
  const PostContent = contentComponent || Content;
  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            {brands.map((brand, key) => {
              // console.log(brand);
              return (
                <div className="brand" key={key}>
                  <div className="brand--image">
                    <Image fluid={brand.image.childImageSharp.fluid} />
                  </div>
                  <div className="brand--content">
                    <h2 className="brand--title">{brand.name}</h2>
                    <div className="brand--description">
                      {brand.description}
                    </div>
                  </div>
                </div>
              );
            })}
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

BrandsPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BrandsPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BrandsPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Brand">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        brands={post.frontmatter.brands}
      />
    </Layout>
  );
};

BrandsPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BrandsPost;

export const pageQuery = graphql`
  query BrandsPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        more
        date
        icon {
          childImageSharp {
            fixed(height: 100) {
              src
            }
          }
        }
        brands {
          name
          description
          image {
            childImageSharp {
              fluid(maxHeight: 200) {
                aspectRatio
                src
              }
            }
          }
        }
      }
    }
  }
`;
