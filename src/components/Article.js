import axios from "axios";
import React, { useState } from "react";

const Article = ({ article }) => {
  const [IsEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const dateParser = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  const handleEdit = () => {
    const data = { content: editedContent };

    axios
      .patch(`http://localhost:3003/articles/${article.id}`, data)
      .then(() => {
        setIsEditing(false);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3003/articles/${article.id}`)
      .then(() => window.location.reload());
  };

  return (
    <div
      className="article"
      style={{ background: IsEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateParser(article.date)}</em>
      </div>
      {IsEditing ? (
        <textarea
          onChange={(e) => setEditedContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : article.content}
        ></textarea>
      ) : (
        <p>{editedContent ? editedContent : article.content}</p>
      )}

      <div className="btn-container">
        {IsEditing ? (
          <button onClick={handleEdit}>Validate</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button
          onClick={() => {
            if (window.confirm("Voulez-vous supprimer cet article ?")) {
              handleDelete();
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Article;
