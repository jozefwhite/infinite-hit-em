// src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import { request, gql } from 'graphql-request';
import styles from './About.module.css';

const endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT;

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAboutContent = async () => {
      const query = gql`
        {
          page(where: { slug: "about" }) {
            title
            content {
              html
              text
            }
          }
        }
      `;

      try {
        const data = await request(endpoint, query);
        setAboutData(data.page);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching About data:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  if (loading) {
    return <div className={styles.aboutContainer}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.aboutContainer}>
        <p>Sorry, we couldn't load the content at the moment.</p>
      </div>
    );
  }

  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>{aboutData?.title}</h1>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: aboutData?.content?.html }}
      />
    </div>
  );
};

export default About;
