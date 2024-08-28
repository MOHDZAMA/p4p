import React, { useState, useEffect } from "react";
import "../App.css";

function DataFetcher() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = (pageNum) => {
    setLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=8&_page=${pageNum}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setLoading(false);
        setLoadingMore(false);
      });
  };

  const handlePost = () => {
    if (newTitle.trim() && newBody.trim()) {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: newTitle,
          body: newBody,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPosts((prevPosts) => [data, ...prevPosts]);
          setNewTitle("");
          setNewBody("");
          setSuccessMessage("Post created successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        });
    }
  };

  const loadMorePosts = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && page === 1) {
    return <p>Loading...</p>;
  }

  return (
    <div className="data-fetcher">
      <h2>Posts</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePost();
        }}
      >
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder="Body"
        />
        <button type="submit">Create Post</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </li>
        ))}
      </ul>
      {loadingMore ? (
        <p>Loading more posts...</p>
      ) : (
        <button onClick={loadMorePosts}>Load More Posts</button>
      )}
    </div>
  );
}

export default DataFetcher;
