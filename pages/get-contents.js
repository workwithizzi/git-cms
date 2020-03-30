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

// GET FILE CONTENT
const GET_CONTENTS_REQUEST = `${API_REQUEST_CONFIG.GITHUB_API_URL}/repos/${API_REQUEST_CONFIG.OWNER}/${API_REQUEST_CONFIG.REPO}/contents/`;
const PUT_CONTENTS_REQUEST = `${API_REQUEST_CONFIG.GITHUB_API_URL}/repos/${API_REQUEST_CONFIG.OWNER}/${API_REQUEST_CONFIG.REPO}/contents/`;
const DELETE_CONTENTS_REQUEST = `${API_REQUEST_CONFIG.GITHUB_API_URL}/repos/${API_REQUEST_CONFIG.OWNER}/${API_REQUEST_CONFIG.REPO}/contents/`;

const GetContents = (props) => {

	const [files, setFiles] = useState([]);
	const [isRead, setIsRead] = useState(false);
	const [contents, setContents] = useState("");
	const [newFileName, setNewFileName] = useState("");

	useEffect(() => {
		setFiles(props.allFiles);
	}, [files]);

	const _getFileContent = async (path, isRead) => {
		const url = `${GET_CONTENTS_REQUEST}${path}`;
		try {
			const file = await axios.get(url, {
				auth: {
					username: process.env.GITHUB_PRIVATE_TOKEN,
				}
			});
			const res = file.data.content;
			console.log(`FILE CONTENT BASE64: ${res}`);
			const fromBase64ToString = window.atob(res);
			files.map((file, index) => {
				if (file.name === path) {
					files[index].content = fromBase64ToString;
					setContents(files[index].content);
				}
			})
			setFiles([... files]);
			setIsRead(isRead);
		} catch (error) {
			console.log(error);
		}
	}

	const _updateContents = event => {
		setContents(event.target.value);
	}

	const _uploadContent = async file => {
		const contentsBase64 = window.btoa(contents);
		const url = `${PUT_CONTENTS_REQUEST}${file.path}`
		try {
			const uploadContent = await axios.put(url,
			{
					message: "Edit file via GitHub API", // Required. The commit message.
					content: contentsBase64, // Required. The new file content, using Base64 encoding.
					sha: file.sha, // Required if you are updating a file. The blob SHA of the file being replaced.
					branch: "master", // The branch name. Default: the repository’s default branch (usually master)
					// The person that committed the file. Default: the authenticated user.
					// committer: {
					// 	name: "",
					// 	email: ""
					// },
					// The author of the file. Default: The committer or the authenticated user if you omit committer.
					// author: {
					// 	name: "",
					// 	email: ""
					// }
			},
			{
				auth: {
					username: process.env.GITHUB_PRIVATE_TOKEN,
				}
			});
			if (uploadContent.status === 200) {
				alert("Successfully Uploaded!")
			}
			console.log(uploadContent);
		} catch (error) {
			console.log(error);
			return;
		}
	}

	const _deleteFile = async file => {
		const url = `${DELETE_CONTENTS_REQUEST}${file.path}`
		try {
			const deleteFile = await axios.delete(url,
			{
				params:
					{
						message: "Delete file via GitHub API", // Required. The commit message.
						sha: file.sha, // Required if you are updating a file. The blob SHA of the file being replaced.
						branch: "master", // The branch name. Default: the repository’s default branch (usually master)
						// The person that committed the file. Default: the authenticated user.
						// committer: {
						// 	name: "",
						// 	email: ""
						// },
						// The author of the file. Default: The committer or the authenticated user if you omit committer.
						// author: {
						// 	name: "",
						// 	email: ""
						// }
				},
				auth: {
					username: process.env.GITHUB_PRIVATE_TOKEN,
				}
			});
			if (deleteFile.status === 200) {
				alert("Successfully Deleted!")
			}
			console.log(deleteFile);
		} catch (error) {
			console.log(error);
			return;
		}
	}

	const _listAllFiles = files =>
		files.map(file => {
			return (
				<div key={file.sha}>
						<p>{file.name}</p>
						<button onClick={() => _getFileContent(file.path, true)}>Get Content</button>
						<button onClick={() => _getFileContent(file.path, false)}>Update Content</button>
						<button onClick={() => _deleteFile(file)}>Delete File</button>
						<div>
							{
								(isRead && file.content) && (
									<pre>{file.content}</pre>
								)
							}
							{
								(!isRead && file.content) && (
									<>
										<textarea style={{ width: "30rem", height: "30rem" }} onChange={event => _updateContents(event)} value={contents} />
										<button style={{ display: "block" }} className="button__card" onClick={() => _uploadContent(file)}>Upload Content</button>
									</>
								)
							}
						</div>
				</div>
			);
		});

		const _onFileNameChange = () => {
			setNewFileName(event.target.value);
		}

		const _createFile = async () => {
			event.preventDefault();
			const url = `${PUT_CONTENTS_REQUEST}${newFileName}`
			try {
				const createFile = await axios.put(url,
				{
						message: "Create file via GitHub API", // Required. The commit message.
						content: "", // Required. The new file content, using Base64 encoding.
						branch: "master", // The branch name. Default: the repository’s default branch (usually master)
						// The person that committed the file. Default: the authenticated user.
						// committer: {
						// 	name: "",
						// 	email: ""
						// },
						// The author of the file. Default: The committer or the authenticated user if you omit committer.
						// author: {
						// 	name: "",
						// 	email: ""
						// }
				},
				{
					auth: {
						username: process.env.GITHUB_PRIVATE_TOKEN,
					}
				});
				if (createFile.status === 201) {
					alert("Successfully Created!")
				}
				console.log(createFile);
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

				<div>
					<h2>All Files:</h2>
					{files && _listAllFiles(files)}
					<hr />
					<h3>Create a file</h3>
					<form onSubmit={_createFile}>
					<input type="text" onChange={_onFileNameChange} />
					<button type="submit">Create File</button>
					</form>
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
