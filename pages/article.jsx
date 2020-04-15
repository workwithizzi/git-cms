import React, { Fragment, useState } from "react";
import { parseCookies } from "nookies";
import md from "markdown-it";
import moment from "moment";

import "../styles/admin.scss";

import RequestService from "../util/requestService";


const MarkdownIt = new md();

function ArticlePage(props) {

	const [articleData, setArticleData] = useState(props.markdownData);
	const [isEditMode, setEditMode] = useState(false);

	// GET the markdown file content
	async function _fetchDataOnRender(path) {
		// GET the current CT mardown file
		const file = await RequestService.getLimberContentTypes(path);
		// DECODE base64 to a String
		const buff = Buffer.from(file.content, "base64");
		const decodedContent = buff.toString("ascii");

		// GET frontmatter
		let frontmatter = decodedContent.split("---")[1].slice(1);
		// FORMAT frontmatter with `---`
		const _frontmatter = `---`;
		frontmatter = `${_frontmatter}\n${frontmatter}${_frontmatter}`;

		// SEPARATE markdown from the frontmatter
		const content = decodedContent.split("---")[2].slice(2);

		// WRAP-UP into an Object
		const markdownData = {
			frontmatter,
			content,
			sha: file.sha,
			path: file.path,
		};
		setArticleData(markdownData);
	}

	function _onEdit() {
		setEditMode(true);
	}

	async function _onSave() {
		setEditMode(false);

		// GET frontmatter from the markdown file
		const _frontmatter = articleData.frontmatter
		// remove `---` separation
			.split("---")[1]
		// delete the 1st character which is a `new line`
			.slice(1)
		// replace others `new line` characters
			.replace(/(\r\n|\n|\r)/gm, ",")
		// delete trailing comma
			.slice(0, -1)
		// delete all the `"` to avoid duplication of them when converting to the object
			.replace(/"/gm, "");

		// MAKE object of the frontmatter
		const obj = {};
		_frontmatter.split(",").forEach(property => {
			const splittedProperties = property.split(":");
			// if there's a dash symbol, replace it with underscore symbol, because, the object `key` cannot have a name like this: `key-name`
			const underscoredKey = splittedProperties[0].replace(/-/gm, "_");
			// remove the ` ` at the beginning of the string
			const unspacedValue = splittedProperties[1].slice(1);
			obj[underscoredKey] = unspacedValue;
		});
		// SET current date
		obj.date = moment(new Date()).format("YYYY-DD-MM");

		// convert frontmatter object into String with the new date
		const _fr = `---`;
		let str = "";
		const fr = JSON.stringify(obj).slice(1, -1);
		fr.split(",").forEach(property => {
			const row = `${property.split(":")[0].replace(/['"]+/g, "")}: ${property.split(":")[1]}\n`;
			str += row;
		});
		const newFrm = `${_fr}\n${str}${_fr}`;

		// TODO: update state via setState
		//THIS IS a DIRTY WAY, but to set it via `setter` it needs a wrapper function
		articleData.frontmatter = newFrm;

		// UPDATE content
		const _updatedContent = `${articleData.frontmatter}\n\n${articleData.content}`;
		const contentsBase64 = window.btoa(_updatedContent);
		const body = {
			message: `Update file's content via GitHub API at ${moment(new Date()).format()}`, // Required. The commit message.
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
		const res = await RequestService.updateLimberArticleContent(articleData.path, body);
		if (res.content) {
			alert("Success!");
		} else {
			alert("Fail!");
		}
		// FETCH data after it was updated at git to have the current value at state
		_fetchDataOnRender(articleData.path);
	}

	function _handleChange() {
		setArticleData({ ...articleData, content: event.target.value });
	}

	function _onCancel() {
		setEditMode(false);
	}

	return (
		<Fragment>
			<div style={{ display: "block" }}>
				{isEditMode ? (
					<Fragment>
						<textarea style={{ display: "block", width: "20rem", height: "20rem" }} value={articleData.content} onChange={_handleChange} />
						<button onClick={_onSave}>Save</button>
						<button onClick={_onCancel}>Cancel</button>
					</Fragment>
				) : (
					<Fragment>
						<div dangerouslySetInnerHTML={{ __html: MarkdownIt.render(`${articleData.content}`) }} />
						<button onClick={_onEdit}>Edit</button>
					</Fragment>
				)}
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
	const markdownData = {
		frontmatter,
		content,
		sha: file.sha,
		path: file.path,
	};

	return { markdownData };
};

export default ArticlePage;
