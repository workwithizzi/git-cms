import React from "react";
import PT from "prop-types";

function Layout({ children }) {
	return (
		<>
			<main className="l-container">
				{children}
			</main>
		</>
	);
}

Layout.propTypes = {
	children: PT.node.isRequired,
};

export default Layout;
