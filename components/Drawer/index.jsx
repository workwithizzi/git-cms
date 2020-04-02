import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faCog, faFileAlt, faFile, faRandom } from "@fortawesome/free-solid-svg-icons";
import PT from "prop-types";

function Drawer({ activePath, limberData }) {

	useEffect(() => {
		_checkLimberSettings(limberData);
	}, []);

	const [isLimberSettings, setIsLimberSettings] = useState(false);

	function _checkLimberSettings(data) {
		data && setIsLimberSettings(true);
	}

	function _renderLimberContentGroups(groups) {
		return (
			groups.map(group => {

				let icon;
				if (group.name === "pages") {
					icon = faFileAlt;
				} else if (group.name === "posts") {
					icon = faFile;
				} else {
					icon = faRandom;
				}

				return (
					<li className="l-drawer__item" key={Math.random(100)}>
						<a className={`l-drawer__btn btn--content-group ${activePath === `/admin?page=${group.name}` ? "isActive" : "notActive"}`} href={`/admin?page=${group.name}`}>
							<FontAwesomeIcon className="btn--icon content-group--icon" icon={icon} />
							<span className="btn--text content-group--text">{group.label}</span>
						</a>
					</li>
				);
			})
		);
	}

	return (
		<ul className="l-drawer">
			<li className="l-drawer__item">
				<a className={`l-drawer__btn btn--dashboard ${activePath === "/admin" ? "isActive" : "notActive"}`} href="/admin">
					<FontAwesomeIcon className="btn--icon dashboard--icon" icon={faTachometerAlt} />
					<span className="btn--text dashboard--text">Dashboard</span>
				</a>
			</li>
			{
				isLimberSettings && (
					<li className="l-drawer__item">
						<a className={`l-drawer__btn btn--settings ${activePath === "/admin?page=settings" ? "isActive" : "notActive"}`} href="/admin?page=settings">
							<FontAwesomeIcon className="btn--icon settings--icon" icon={faCog} />
							<span className="btn--text settings--text">Settings</span>
						</a>
					</li>
				)
			}
			{
				isLimberSettings && limberData.groups.length >= 1 && (
					_renderLimberContentGroups(limberData.groups)
				)
			}
		</ul>
	);
}

Drawer.propTypes = {
	activePath: PT.string.isRequired,
	limberData: PT.object.isRequired,
};

export default Drawer;
