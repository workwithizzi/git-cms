import React, { Fragment, useState, useEffect } from "react";
import { parseCookies } from "nookies";
import md from "markdown-it";

import "../styles/admin.scss";

const MarkdownIt = new md();

function ArticlePage() {

	const [articleData, setArticleData] = useState({});
	const [isEditMode, setEditMode] = useState(false);

	useEffect(() => {
		const cookies = parseCookies();
		setArticleData(JSON.parse(cookies.markdown));
	}, []);

	function _onEdit() {
		setEditMode(true);
	}

	function _onSave() {
		setEditMode(false);
		const contentsBase64 = window.btoa(articleData.content);
		const body = {
			message: "Update file's content via GitHub API", // Required. The commit message.
			content: contentsBase64, // Required. The new file content, using Base64 encoding.
			sha: articleData.sha, // Required if you are updating a file. The blob SHA of the file being replaced.
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
		console.log(body);
	}

	function _handleChange() {
		setArticleData({ ...articleData, content: event.target.value });
	}

	return (
		<Fragment>
			<div style={{ display: "block" }}>
				{
					isEditMode ? (
						<Fragment>
							<textarea style={{ display: "block", width: "20rem", height: "20rem" }} value={articleData.content} onChange={_handleChange} />
							<button onClick={_onSave}>Save</button>
						</Fragment>
					) : (
						<Fragment>
							<div dangerouslySetInnerHTML={{ __html: MarkdownIt.render(`${articleData.content}`) }} />
							<button onClick={_onEdit}>Edit</button>
						</Fragment>
					)
				}
			</div>
		</Fragment>
	);
}

export default ArticlePage;
