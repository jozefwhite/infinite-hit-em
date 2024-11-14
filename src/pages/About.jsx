// src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import { request, gql } from 'graphql-request';

const endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT;

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAboutContent = async () => {
    const query = gql`
      {
        page(where: { slug: "about" }) {
          title
          content
        }
      }
    `;

    try {
      const data = await request(endpoint, query);
      setAboutData(data.page); // Access the single "About" page result directly
      setLoading(false);
    } catch (err) {
      console.error('Error fetching About data:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutContent();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading About...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Failed to load About content.</div>;

  return (
    <div style={{ padding: '2rem', marginTop: '60px' }}>
      <h1>{aboutData?.title}</h1>
      <p>{aboutData?.content}</p>
    </div>
  );
};

export default About;
