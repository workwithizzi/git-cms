import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
import jsyaml from "js-yaml";
import PT from "prop-types";

import "../styles/admin.scss";

import Layout from "../components/Layout";
import Drawer from "../components/Drawer";
import RenderLimberSettings from "../components/RenderLimberSettings";

import RequestService from "../util/requestService";

function AdminPage({ router, limberSettings }) {

	// PARSE "limber/settings.yml" content as JS Object and PUT to the State BEFORE on page render
	useEffect(() => {
		_parseSettings(limberSettings);
	}, []);

	// DEFINE State
	const [settings, setSettings] = useState({});

	// PARSE "limber/settings.yml" content as JS Object and PUT to the State
	async function _parseSettings(settings) {
		const settingsFileContent = settings.content;
		const fromBase64ToString = window.atob(settingsFileContent);
		setSettings(jsyaml.load(fromBase64ToString));
	}

	return (
		<>
			<Layout>
				<Drawer activePath={router.asPath} limberData={settings} />
				{
					router.asPath === "/admin" && (
						<>
							<h1 className="o-title">Welcome to the Admin page of the Git CMS</h1>
						</>
					)
				}

				{
					router.asPath === "/admin?page=settings" && (
						<>
							<RenderLimberSettings settings={settings} />
						</>
					)
				}
			</Layout>
		</>
	);
}

// GET "limber/settings.yml" file
AdminPage.getInitialProps = async() => {
	// it is not wraped in a try-catch block as RequestService has it's own error handling
	const response = await RequestService
		.getLimberSettings({
			auth: {
				username: process.env.GITHUB_PRIVATE_TOKEN,
			},
		});
	return { limberSettings: response};
};

AdminPage.propTypes = {
	router: PT.object.isRequired,
	limberSettings: PT.object.isRequired,
};

export default withRouter(AdminPage);
