import React, { Fragment, useEffect, useState } from "react";
import { setCookie } from "nookies";
import PT from "prop-types";

import "../styles/admin.scss";

import RequestService from "../util/requestService";
import { toUpperCaseFirstChar } from "../util/strings";
import parseFrontmatter from "../util/parseFrontmatter";

function GroupsPage(props) {
	const { path, contentTypesData } = props;

	const [contentTypeContent, setContentTypeContent] = useState([]);

	useEffect(() => {
		async function _fetchData() {
			// `_getContentTypeFiles` returns an array which length equal to the number of content types in the `data/content/` directory.
			// And all the pages that are `not-actual` pages right now, will be undefined.
			const contentTypeFiles = await _getContentTypeFiles(contentTypesData);

			// Taking the first item from the array after throwing away `undefined` ones
			const currentContentTypeGroup = contentTypeFiles.filter(item => item !== undefined)[0];

			const contentTypeContent = await _getContentTypeFilesContent(currentContentTypeGroup);
			setContentTypeContent(contentTypeContent);
		}
		_fetchData();

	}, []);

	// Get the list of files from the `data/content/{page_name_content_type}/` folder
	function _getContentTypeFiles(data) {
		return Promise.all(
			// map through the array and if name === page url, do request
			data.map(async file => {
				// selecting the correct `{page_name_content_type}` folder to fetch the files, based on the url's `path`
				// condition assumes that the url matches the following schema: `/groups?group=pages`
				if (path.split("=")[1] === file.group) {
					return await RequestService
						.getLimberContentTypes(file.path);
				}
			})
		);
	}

	// GET the actual content of the `md` files
	function _getContentTypeFilesContent(data) {
		return Promise.all(
			data.map(async item => {
				return await RequestService
					.getLimberContentTypes(item.path);
			})
		);
	}

	// PARSE frontmatter of the `md` files
	function _parseFrontmatter(data) {
		// DECODE from base64
		const decodedContent = data.map(item => {
			return window.atob(item.content);
		});

		const parsedContentTypes = decodedContent.map(item => {
			return parseFrontmatter(item);
		});

		// ADD markdown file's `path` to the `frontmatter` Object
		// it is needed to pass the `path` to `article` page and fetch the needed file
		data.map((content, index) => {
			parsedContentTypes[index].path = content.path;
		});

		return parsedContentTypes;
	}

	// Temporarily passing the mardown further via coockie
	// later on we shoud add the global state management
	function _setCurrentFilePath(content) {
		setCookie(null, "file_path", content, {
			maxAge: 30 * 24 * 60 * 60,
			path: "/",
		});
	}

	function _renderContentTypes() {
		const contentTypes = _parseFrontmatter(contentTypeContent);
		return (
			contentTypes.map(item => {
				return(
					<a style={{ textDecoration: "none" }} href={`/article?type=${item.content_type}`} key={item.title} onClick={() => _setCurrentFilePath(item.path)}>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<p style={{ marginLeft: "10px" }}>{item.title}</p>
							<p style={{ marginLeft: "10px" }}>{item.content_type}</p>
							<p style={{ marginLeft: "10px" }}>{item.status}</p>
							<p style={{ marginLeft: "10px" }}>{item.date}</p>
						</div>
					</a>
				);
			})
		);
	}

	return (
		<Fragment>
			<div>
				<h1 className="o-title">{toUpperCaseFirstChar(path.split("=")[1])}</h1>
				{_renderContentTypes()}
			</div>
		</Fragment>
	);
}

GroupsPage.propTypes = {
	contentTypesData: PT.array.isRequired,
};

export default GroupsPage;
