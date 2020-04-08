import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
import PT from "prop-types";

import "../styles/admin.scss";

import Layout from "../components/Layout";
import Drawer from "../components/Drawer";
import RenderLimberSettings from "../components/RenderLimberSettings";

import RequestService from "../util/requestService";

function AdminPage(props) {
	const { router, limberSettings } = props;

	// PARSE "limber/settings.yml" content as JS Object and PUT to the State BEFORE on page render
	useEffect(() => {
		_parsePages();
	}, []);

	// DEFINE State
	const [pagesSettings, setPagesSettings] = useState({});

	async function _parsePages() {
		// it is not wraped in a try-catch block as RequestService has it's own error handling
		const response = await RequestService
			.getLimberPagesSettings();
		setPagesSettings(response);
	}

	function _fetchPages(path) {
		RequestService
			.getLimberPages(path)
			.then(pages => {
				console.log(pages);
			});
		
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
				<Drawer activePath={router.asPath} limberData={limberSettings} />

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
							<RenderLimberSettings settings={limberSettings} />
						</>
					)
				}

				{/* Content-Groups tabs */}
				{
					limberSettings.groups && _renderContentGroups(limberSettings.groups)
				}
			</Layout>
		</>
	);
}

AdminPage.propTypes = {
	router: PT.object.isRequired,
	limberSettings: PT.object.isRequired,
};

export default withRouter(AdminPage);
