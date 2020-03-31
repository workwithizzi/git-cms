import React from "react";
import { withRouter } from "next/router";
import PT from "prop-types";

import "../styles/admin.scss";

import Layout from "../components/Layout";
import Drawer from "../components/Drawer";

function AdminPage({ router }) {

	return (
		<>
			<Layout>
				<h1 className="o-title">Welcome to the Admin page of the Git CMS</h1>

				<Drawer activePath={router.pathname} />
			</Layout>
		</>
	);
}

AdminPage.propTypes = {
	router: PT.shape({
		pathname: PT.string.isRequired,
		route: PT.string.isRequired,
		query: PT.object,
		asPath: PT.string.isRequired,
		components: PT.object,
		isFallback: PT.bool.isRequired,
		events: PT.object,
		push: PT.func.isRequired,
		replace: PT.func.isRequired,
		reload: PT.func.isRequired,
		back: PT.func.isRequired,
		prefetch: PT.func.isRequired,
		beforePopState: PT.func.isRequired,
	}),
};

export default withRouter(AdminPage);
