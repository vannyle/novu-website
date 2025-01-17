/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import Content from 'components/pages/article/content';
import Hero from 'components/pages/article/hero';
import RelatedArticles from 'components/pages/article/related-articles';
import SocialShare from 'components/pages/article/social-share';
import Layout from 'components/shared/layout';
import Link from 'components/shared/link';
import Separator from 'components/shared/separator';
import Subscribe from 'components/shared/subscribe';
import ArrowIcon from 'images/arrow.inline.svg';

const Article = ({ data: { strapiArticle: article, relatedArticles }, location, pageContext }) => {
  const seo = {
    title: article.seo?.title,
    description: article.seo?.description,
    slug: `${pageContext.blogPageURL}/${article.slug}`,
    preventIndexing: article.seo?.preventIndexing,
    keywords: article.seo?.keywords,
    ogImage: article.seo?.ogImage?.localFile.publicURL,
  };

  const hero = {
    title: article.title,
    description: article.description,
    image: article.cover,
    author: article.author,
    date: article.date,
    category: article.category,
    blogPageURL: pageContext.blogPageURL,
  };

  const content = {
    content: article.content.data.childrenMdx[0].body,
    contentMedia: article.content?.medias,
  };

  const socialShare = {
    url: location.href,
    author: article.author,
    date: article.date,
  };

  const relatedArticlesProps = {
    items: relatedArticles.nodes.map((article) => ({
      ...article,
      slug: `/${pageContext.blogPageURL}/${article.slug}`,
    })),
    blogPageURL: pageContext.blogPageURL,
  };

  return (
    <Layout seo={seo}>
      <article className="safe-paddings pt-40 sm:pt-28">
        <div className="container-sm relative">
          <Link
            className="sticky top-8 z-10 -mb-8 -ml-28 flex h-8 w-8 items-center justify-center rounded-full bg-gray-2 transition-colors duration-200 hover:text-primary-1 lg:-ml-20 md:hidden"
            to={`/${pageContext.blogPageURL}`}
          >
            <ArrowIcon className="h-2" />
          </Link>

          <Hero {...hero} />
          <Content {...content} />
          <Separator className="mt-14 px-0" backgroundColor="black" />
          <SocialShare {...socialShare} />
        </div>
      </article>
      {relatedArticlesProps.items.length >= 3 && <RelatedArticles {...relatedArticlesProps} />}
      <Subscribe />
      <Separator backgroundColor="black" />
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($id: String!, $categoryName: String!) {
    strapiArticle(id: { eq: $id }) {
      id
      slug
      date(formatString: "MMMM D, YYYY")
      category {
        color
        name
        slug
      }
      title
      description
      author {
        name
        avatar {
          alternativeText
          localFile {
            url
            childImageSharp {
              gatsbyImageData(width: 36, height: 36)
            }
          }
        }
      }
      cover {
        alternativeText
        localFile {
          url
          childImageSharp {
            gatsbyImageData(width: 800, height: 431)
          }
        }
      }
      content {
        data {
          childrenMdx {
            body
          }
        }

        medias {
          src
          localFile {
            url
            childImageSharp {
              gatsbyImageData(width: 800)
            }
          }
        }
      }

      seo {
        title
        description
        preventIndexing
        keywords
        ogImage {
          localFile {
            publicURL
          }
        }
      }
    }

    relatedArticles: allStrapiArticle(
      limit: 3
      sort: { fields: createdAt, order: DESC }
      filter: { category: { name: { eq: $categoryName } }, id: { ne: $id } }
    ) {
      nodes {
        title
        description
        slug
        date(formatString: "MMMM D, YYYY")
        category {
          color
          name
          slug
        }
        author {
          name
          avatar {
            alternativeText
            localFile {
              url
              childImageSharp {
                gatsbyImageData(width: 36, height: 36)
              }
            }
          }
        }
        image: cover {
          alternativeText
          localFile {
            url
            childImageSharp {
              gatsbyImageData(width: 384, height: 214)
            }
          }
        }
      }
    }
  }
`;

export default Article;
