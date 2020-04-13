import React, { Fragment, useState, useEffect } from "react";
import { parseCookies } from "nookies";
import md from "markdown-it";

import "../styles/admin.scss";

const MarkdownIt = new md();

function ArticlePage() {

	const [content, setContent] = useState("");

	useEffect(() => {
		const cookies = parseCookies();
		setContent(cookies.markdown);
	}, []);

	return (
		<Fragment>
			<div style={{ display: "block" }}>
				<div dangerouslySetInnerHTML={{ __html: MarkdownIt.render(content) }} />
			</div>
		</Fragment>
	);
}

export default ArticlePage;
