import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
import jsyaml from "js-yaml";
import PT from "prop-types";

import "../styles/admin.scss";

import Layout from "../components/Layout";
import Drawer from "../components/Drawer";
import RenderLimberSettings from "../components/RenderLimberSettings";

import RequestService from "../util/requestService";
import parseYaml from "../util/parseYaml";

function AdminPage({ router, limberSettings }) {

	// PARSE "limber/settings.yml" content as JS Object and PUT to the State BEFORE on page render
	useEffect(() => {
		_parseSettings(limberSettings);
		_parsePages();
	}, []);

	// DEFINE State
	const [settings, setSettings] = useState({});
	const [pagesSettings, setPagesSettings] = useState({});

	// PARSE "limber/settings.yml" content as JS Object and PUT to the State
	function _parseSettings(settings) {
		const data = parseYaml(settings);
		setSettings(data);
	}

	async function _parsePages() {
		// it is not wraped in a try-catch block as RequestService has it's own error handling
		const response = await RequestService
			.getLimberPagesSettings({
				auth: {
					username: process.env.GITHUB_PRIVATE_TOKEN,
				},
			});
		const data = parseYaml(response);
		setPagesSettings(data);
	}

	function _fetchPages(path) {
		console.log(path);
	}

	function _renderContentGroups(groups) {
		return groups.map(group => {
			if (router.asPath === `/admin?page=${group.name}`) {
				return (
					<div key={Math.random(100)}>
						{
							group.label && <h1>{group.label}</h1>
						}
						{
							group.description && <h3>{group.description}</h3>
						}
						{
							group.name === pagesSettings.name && _fetchPages(pagesSettings.path)
						}
					</div>
				);
			}
		});
	}

	return (
		<>
			<Layout>
				<Drawer activePath={router.asPath} limberData={settings} />

				{/* Dashboard tab */}
				{
					router.asPath === "/admin" && (
						<>
							<h1 className="o-title">Welcome to the Admin page of the Git CMS</h1>
						</>
					)
				}

				{/* Settings tab */}
				{
					router.asPath === "/admin?page=settings" && (
						<>
							<RenderLimberSettings settings={settings} />
						</>
					)
				}

				{/* Content-Groups tabs */}
				{
					settings.groups && _renderContentGroups(settings.groups)
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
