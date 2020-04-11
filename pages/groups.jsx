import React, { Fragment, useEffect, useState } from "react";
import PT from "prop-types";

import "../styles/admin.scss";

import RequestService from "../util/requestService";
import { toUpperCaseFirstChar } from "../util/strings";

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
	function _parseFrontmatter() {

		// DECODE from base64
		const decodedContent = contentTypeContent.map(item => {
			return window.atob(item.content);
		});

		const parsedContentTypes = decodedContent.map(item => {
			const data = item
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

			const obj = {};
			data.split(",").forEach(property => {
				const splittedProperties = property.split(":");
				// if there's a dash symbol, replace it with underscore symbol, because, the object `key` cannot have a name like this: `key-name`
				const underscoredKey = splittedProperties[0].replace(/-/gm, "_");
				// remove the ` ` at the beginning of the string
				const unspacedValue = splittedProperties[1].slice(1);
				obj[underscoredKey] = unspacedValue;
			});
			return obj;
		});
		return parsedContentTypes;
	}

	function _renderContentTypes() {
		const contentTypes = _parseFrontmatter();
		return (
			contentTypes.map(item => {
				return(
					<div key={item.title} style={{ display: "flex", flexDirection: "row" }}>
						<p style={{ marginLeft: "10px" }}>{item.title}</p>
						<p style={{ marginLeft: "10px" }}>{item.content_type}</p>
						<p style={{ marginLeft: "10px" }}>{item.status}</p>
						<p style={{ marginLeft: "10px" }}>{item.date}</p>
					</div>
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