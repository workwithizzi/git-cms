import React, { Fragment, useState, useEffect } from "react";
import { parseCookies } from "nookies";
import md from "markdown-it";
import moment from "moment";

import "../styles/admin.scss";

import RequestService from "../util/requestService";

const MarkdownIt = new md();

function ArticlePage(props) {

	const [articleData, setArticleData] = useState("");
	const [isEditMode, setEditMode] = useState(false);

	useEffect(() => {
		// TODO: check the update of the content on each re-render
		setArticleData(props.markdownFile.content);
		console.log("triggered");
	}, []);

	function _onEdit() {
		setEditMode(true);
	}

	async function _onSave() {
		setEditMode(false);

		console.log(moment(new Date()).format());
		const _updatedContent = `${props.markdownFile.frontmatter}\n\n${articleData}`;
		const contentsBase64 = window.btoa(_updatedContent);
		const body = {
			message: "Update file's content via GitHub API", // Required. The commit message.
			content: contentsBase64, // Required. The new file content, using Base64 encoding.
			sha: props.markdownFile.sha, // Required if you are updating a file. The blob SHA of the file being replaced.
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
		};
		const res = await RequestService.updateLimberArticleContent(props.markdownFile.path, body);
		if (res.content) {
			alert("Success!");
		} else {
			alert("Fail!");
		}
	}

	function _handleChange() {
		setArticleData(event.target.value);
	}

	return (
		<Fragment>
			<div style={{ display: "block" }}>
				{
					isEditMode ? (
						<Fragment>
							<textarea style={{ display: "block", width: "20rem", height: "20rem" }} value={articleData} onChange={_handleChange} />
							<button onClick={_onSave}>Save</button>
						</Fragment>
					) : (
						<Fragment>
							<div dangerouslySetInnerHTML={{ __html: MarkdownIt.render(`${articleData}`) }} />
							<button onClick={_onEdit}>Edit</button>
						</Fragment>
					)
				}
			</div>
		</Fragment>
	);
}

ArticlePage.getInitialProps = async(props) => {
	// GET the `file_path` cookies which are set at `groups.jsx`
	const cookies = parseCookies(props);
	const currentFilePath = cookies.file_path;

	// GET the current CT mardown file
	const file = await RequestService.getLimberContentTypes(currentFilePath);

	// DECODE base64 to a String
	const buff = Buffer.from(file.content, "base64");
	const decodedContent = buff.toString("ascii");

	// GET frontmatter
	let frontmatter = decodedContent.split("---")[1].slice(1);
	// FORMAT frontmatter with `---`
	const _frontmatter = `---`;
	frontmatter = `${_frontmatter}\n${frontmatter}${_frontmatter}`;

	const content = decodedContent.split("---")[2].slice(2);

	// WRAP-UP into an Object and return as a prop
	const markdownFile = {
		frontmatter,
		content,
		sha: file.sha,
		path: file.path,
	};

	return { markdownFile };
};

export default ArticlePage;
