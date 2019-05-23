import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { xml2json } from "xml-js";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import { Timeline } from "react-twitter-widgets";
import InstagramEmbed from "react-instagram-embed";

import Layout from "../components/Layout";

import hero from "../img/chachi-header-thanks.jpg";

import "./styles/index.scss";

export default class IndexPage extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
  }
  fetchPosts = () => axios.get(`https://benztown.com/chachi-news/rss`);
  setPosts = response => {
    const input = xml2json(response.data, { compact: true, spaces: 4 });
    const parsed = JSON.parse(input);
    this.setState({
      posts: parsed.rss.channel.item
    });
  };

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    return (
      <Layout>
        <section className="section main-image">
          <div className="container">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <img
                  src={hero}
                  alt="Chachi on a car"
                  style={{ margin: "0 auto" }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section products-list">
          <div className="container">
            <div className="columns is-centered">
              {posts.map(({ node }) => {
                return (
                  <div className="column is-4" key={node.id}>
                    <div className="columns">
                      <div className="circles column is-one-fifth">
                        <Link to={node.fields.slug}>
                          <Img
                            fixed={node.frontmatter.icon.childImageSharp.fixed}
                          />
                        </Link>
                      </div>
                      <div className="services column">
                        <h2>{node.frontmatter.title}</h2>
                        <div>
                          <div>{node.frontmatter.more}</div>
                          <div>
                            <Link to={node.fields.slug}>Learn More</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section content-lists">
          <div className="container">
            <div className="content columns">
              <div className="column is-4">
                <h3>Benztown News</h3>
                {/* http://www.benztown.com/news/rss/&chan=y&num=5&desc=1&utf=y */}
                {this.state.posts.slice(0, 5).map((post, key) => (
                  <div className="news_post" key={key}>
                    <h4 className="news_post__title">
                      <a href={post.link._text}>{post.title._text}</a>
                    </h4>
                    <div
                      className="news_post__text"
                      dangerouslySetInnerHTML={{
                        __html: post.description._text
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="column is-4">
                <h3>Instagram</h3>
                <InstagramEmbed
                  url="https://www.instagram.com/p/BsCoKk6nI6m/"
                  hideCaption={false}
                  containerTagName="div"
                />
              </div>
              <div className="column is-4">
                <h3>Twitter</h3>
                <Timeline
                  dataSource={{
                    sourceType: "profile",
                    screenName: "chachidenes"
                  }}
                  options={{
                    username: "ChachiDenes",
                    height: "400"
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___title] }
      filter: { frontmatter: { templateKey: { eq: "brands-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            more
            icon {
              childImageSharp {
                fixed(height: 25, width: 25) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
