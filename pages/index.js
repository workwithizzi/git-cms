import React, { useState } from "react";
import Head from 'next/head'
import axios from "axios";

const API_REQUEST_CONFIG = {
  GITHUB_API_URL: "https://api.github.com"
}

const Home = () => {

  const [isResponse, setIsResponse] = useState(false);
  const [zen, setZen] = useState({});
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState({});
  const [profileAuth, setProfileAuth] = useState({});

  const _getZen = async () => {
    try {
      const zen = await axios.get(`${API_REQUEST_CONFIG.GITHUB_API_URL}/zen`);
      console.log(zen)
      setZen(zen);
      setIsResponse(true);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const _onUsernameChange = () => setUsername(event.target.value);

  const _getUser = async () => {
    try {
      const user = await axios.get(`${API_REQUEST_CONFIG.GITHUB_API_URL}/users/${username}`);
      console.log(user)
      setProfile(user);
      setIsResponse(true);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const _getUserAuth = async () => {
    try {
      const user = await axios.get(`${API_REQUEST_CONFIG.GITHUB_API_URL}/users/${username}`, {
        auth: {
          username: process.env.GITHUB_PRIVATE_TOKEN,
        }
      });
      console.log(user)
      setProfileAuth(user);
      setIsResponse(true);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Git CMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to Git CMS
        </h1>

        <p className="description">
          Read file from the git repo
        </p>

        <div className="grid">
          <button className="card" onClick={_getZen}>
            <h3>GitHub Zen &rarr;</h3>
            <p>Get a random selection from the GitHub design philosophies.</p>
          </button>

          <div className="card">
            <h3 className="inline">GitHub User &rarr;</h3>
            <input className="inline input__text" placeholder="GitHub Username" onChange={_onUsernameChange} />
            <button className="button__card" onClick={_getUser}>Get a user GitHub profile.</button>
          </div>

          <div className="card">
            <h3 className="inline">GitHub Authenticated User &rarr;</h3>
            <input className="inline input__text" placeholder="GitHub Username" onChange={_onUsernameChange} />
            <button className="button__card" onClick={_getUserAuth}>Get a user GitHub profile.</button>
          </div>
        </div>
      </main>

      {isResponse &&
        <div className="grid">
          {zen.status === 200 && <p className="card__response">{zen.data}</p>}
          {profile.status === 200 && (
            <div>
              <h1>{profile.data.login}</h1>
              <img src={profile.data.avatar_url} alt="Profile picture" width="200px" />
              <p>{profile.data.name}</p>
              <p>{profile.data.location}</p>
              <p>Remaining requests: {profile.headers["x-ratelimit-remaining"]}</p>
            </div>
          )}
          {profileAuth.status === 200 && (
            <div>
              <h1>{profileAuth.data.login}</h1>
              <img src={profileAuth.data.avatar_url} alt="Profile picture" width="200px" />
              <p>{profileAuth.data.name}</p>
              <p>{profileAuth.data.location}</p>
              <p>Remaining requests: {profileAuth.headers["x-ratelimit-remaining"]}</p>
              <p>Plan: {profileAuth.data.plan.name} (only available for requests with Auth)</p>
            </div>
          )}
        </div>
      }

      <footer>
        <a
          href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .card__response {
          margin: 1rem;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .inline {
          display: inline-block;
        }

        .input__text {
          margin: 0 0.2rem 0.4rem;
          padding: 0.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          vertical-align: middle;
        }

        .button__card {
          margin: 0.2rem;
          padding: 0.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Home
