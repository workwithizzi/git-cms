import React from "react";
import PT from "prop-types";

function RenderLimberSettings({ settings }) {
	return (
		<div className="l-settings">
			<h1 className="o-title">Limber Settings</h1>
			<p>Website domain: <span>{settings.site_url}</span></p>
			<p>Path from project root to content-type config files: <span>{settings.config_path}</span></p>
			<p>Website status: <span>{settings.status}</span></p>
		</div>
	);
}

RenderLimberSettings.propTypes = {
	settings: PT.object.isRequired,
};

export default RenderLimberSettings;
