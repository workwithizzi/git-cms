import React from "react";
import PT from "prop-types";

function Layout({ children }) {
	return (
		<>
			<main>
				{children}
			</main>
		</>
	);
}

Layout.propTypes = {
	children: PT.node.isRequired,
};

export default Layout;
