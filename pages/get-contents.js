import React, { useState, useEffect } from "react";
import Head from 'next/head'
import axios from "axios";

const API_REQUEST_CONFIG = {
	GITHUB_API_URL: "https://api.github.com",
	OWNER: "workwithizzi",
	REPO: "git-cms-test",
};

// GET ALL FILES
const GET_ALL_CONTENTS_REQUEST = `${API_REQUEST_CONFIG.GITHUB_API_URL}/repos/${API_REQUEST_CONFIG.OWNER}/${API_REQUEST_CONFIG.REPO}/contents/`;
// ---



const GITHUB_FILE_PATH = "limber.yml";


const GET_CONTENTS_REQUEST = `${API_REQUEST_CONFIG.GITHUB_API_URL}/repos/${API_REQUEST_CONFIG.OWNER}/${API_REQUEST_CONFIG.REPO}/contents/${API_REQUEST_CONFIG.GITHUB_FILE_PATH}`;
const PUT_CONTENTS_REQUEST = `${API_REQUEST_CONFIG.GITHUB_API_URL}/repos/${API_REQUEST_CONFIG.OWNER}/${API_REQUEST_CONFIG.REPO}/contents/${API_REQUEST_CONFIG.GITHUB_FILE_PATH}`;
const DELETE_CONTENTS_REQUEST = `${API_REQUEST_CONFIG.GITHUB_API_URL}/repos/${API_REQUEST_CONFIG.OWNER}/${API_REQUEST_CONFIG.REPO}/contents/test.yml`;

const GetContents = (props) => {

	console.log(props);

	const [files, setFiles] = useState([]);
	// const [contents, setContents] = useState("");

	useEffect(() => {
		setFiles(props.allFiles);
	}, [props.allFiles]);

	const _listAllFiles = files =>
		files.map(file => {
			return (
				<ul>
					<li key={file.sha}>
						<p>{file.name}</p>
						<button>Get Content</button>
						<button>Update Content</button>
						<button>Delete File</button>
					</li>
				</ul>
			);
		});

	// const _updateContents = () => {
	// 	setContents(event.target.value);
	// }

	// const _uploadContent = async () => {
	// 	const contentsBase64 = window.btoa(contents);
	// 	try {
	// 		const uploadContent = await axios.put(PUT_CONTENTS_REQUEST,
	// 		{
	// 				message: "Edit file via GitHub API", // Required. The commit message.
	// 				content: contentsBase64, // Required. The new file content, using Base64 encoding.
	// 				sha: props.sha, // Required if you are updating a file. The blob SHA of the file being replaced.
	// 				branch: "master", // The branch name. Default: the repository’s default branch (usually master)
	// 				// The person that committed the file. Default: the authenticated user.
	// 				// committer: {
	// 				// 	name: "",
	// 				// 	email: ""
	// 				// },
	// 				// The author of the file. Default: The committer or the authenticated user if you omit committer.
	// 				// author: {
	// 				// 	name: "",
	// 				// 	email: ""
	// 				// }
	// 		},
	// 		{
	// 			auth: {
	// 				username: process.env.GITHUB_PRIVATE_TOKEN,
	// 			}
	// 		});
	// 		console.log(uploadContent);
	// 	} catch (error) {
	// 		console.log(error);
	// 		return;
	// 	}
	// }

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

				<div>
					<h2>All Files:</h2>
					{files && _listAllFiles(files)}
					{/* {props.text && (
						<>
							<textarea style={{ width: "30rem", height: "30rem" }} onChange={_updateContents} value={contents} />
							<button style={{ display: "block" }} className="button__card" onClick={_uploadContent}>Upload Content</button>
						</>
					)} */}
				</div>
			</main>
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

// GET all files axios request
const getAllFiles = async () => {
	try {
		const files = await axios.get(GET_ALL_CONTENTS_REQUEST, {
			auth: {
				username: process.env.GITHUB_PRIVATE_TOKEN,
			}
		});
		console.log(`FILES: ${JSON.stringify(files.data)}`);
		return files.data;
	} catch (error) {
		console.log(error);
		return error;
	}
}

// SSR: GET all the files
GetContents.getInitialProps = async () => {
	let response = {};
	try {
		const allFiles = await getAllFiles();
		response.allFiles = allFiles;
	} catch(error) {
		response.error = error;
	}
	return response;
}

export default GetContents;
