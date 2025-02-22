import React, { useState, useEffect, useCallback } from "react";

export default function Display() {
  const [books, setBooks] = useState({ total_books: 0, books: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchBooks = useCallback(async (query = "") => {
    try {
      let apiUrl = `http://127.0.0.1:8000/api/books/`;
      if (query) {
        apiUrl += `?${query}`;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      setBooks(data);
      console.log("Books Data:", data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <>
      <h1 style={{ width: "1200px", height: "30px", marginLeft: "500px" }}>
        Gutenberg Book Details
      </h1>
      <p style={{ width: "800px", height: "30px", marginLeft: "350px" }}>
        Use these filters: gutenberg_id, title, topic, language, author, mime_type
      </p>

      {/* Search Input Field */}
      <div>
        <input
          style={{ width: "1200px", height: "30px", margin: "20px" }}
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button style={{ width: "60px", height: "35px" }} onClick={() => fetchBooks(searchQuery)}>
          Search
        </button>
      </div>
      <div style={{ width: "1200px", height: "30px", margin: "20px" }}>
      {/* Display Books */}
      <p>Total Books: {books.total_books}</p>
      {books.books && books.books.length > 0 ? (
        books.books.map((book, index) => (
          <div key={index}>
            <p>ID: {book.id}</p>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Language: {book.language}</p>
            <p>Subject: {book.subject}</p>
            <p>Shelves: {book.shelves}</p>
            <p>Url: {book.url}</p>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
      <br/>
      </div>
      <div style={{ marginTop: "50px" }}>
        <button
          style={{ margin: "5px" }}
          disabled={!prevPage}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          style={{ margin: "5px" }}
          disabled={!nextPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
