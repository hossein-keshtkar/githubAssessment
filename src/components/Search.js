import React, { useState } from "react";
import Table from "./Table";
import "./search.css";

export default function Search() {
  const [result, setResult] = useState("");
  const [user, setUser] = useState("");
  const [repo, setRepo] = useState("");

  const api = `https://api.github.com/repos/${user}/${repo}/commits`;
  const token = "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";

  const header = { Authorization: "token " + token };
  const userHandler = (e) => setUser(e.target.value);
  const repoHandler = (e) => setRepo(e.target.value);

  const fetchHandler = async () => {
    try {
      const respons = await fetch(api, {
        method: "GET",
        headers: header,
      });
      const result = await respons.json();
      console.log(result);
      setResult(result);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="container">
      <div className="search">
        <div>
          GitHub user/org:
          <input
            onChange={userHandler}
            className="input"
            value={user}
            type="text"
          />
          Repo name:
          <input
            onChange={repoHandler}
            className="input"
            value={repo}
            type="text"
          />
          <button onClick={fetchHandler}>search</button>
        </div>
      </div>
      <div className="form">
        <h2 className="title">Commit Feed</h2>
        <div style={{ color: "black" }}>
          Showing results for /{user}/{repo}
        </div>
        {result.length > 0 &&
          result.map((i, index) => (
            <Table
              author={i.commit.author.name}
              date={i.commit.author.date}
              msg={i.commit.message}
              url={i.commit.url}
              key={index}
            />
          ))}
      </div>
      {result.message === "Not Found" && (
        <Table msg={result.documentation_url} url={result.message} />
      )}
    </div>
  );
}
