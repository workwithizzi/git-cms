import React, { Fragment } from "react";
import PT from "prop-types";

import "../styles/admin.scss";

import RenderLimberSettings from "../components/RenderLimberSettings";

function SettingsPage(props) {
	const { limberSettings } = props;

	return (
		<Fragment>
			<RenderLimberSettings settings={limberSettings} />
		</Fragment>
	);
}

SettingsPage.propTypes = {
	limberSettings: PT.object.isRequired,
};

export default SettingsPage;
