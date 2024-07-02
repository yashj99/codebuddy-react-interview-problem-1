import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://codebuddy.review/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const {data} = await response.json();
      setPosts(data);
    } catch (error) {
      setError('Failed to fetch posts. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
        <h1 className="mb-7 text-4xl font-bold">Posts</h1>
        <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
          <Icon icon="mdi:arrow-left" className="mr-2" />
          Back to Home
        </Link>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <div key={post.id} className="rounded-lg bg-white p-7 shadow-lg">
              <img src={post.image} alt="Post" className="mb-4 rounded-lg" loading='lazy' />
              <div>
                <h2 className="text-2xl font-bold">{post.firstName} {post.lastName}</h2>
                <p className="text-gray-700">{post.writeup}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
