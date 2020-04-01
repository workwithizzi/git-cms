import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import PT from "prop-types";

function Drawer({ activePath, limberData }) {

	useEffect(() => {
		_checkLimberSettings(limberData);
	}, []);

	const [isLimberSettings, setIsLimberSettings] = useState(false);

	function _checkLimberSettings(data) {
		data && setIsLimberSettings(true);
	}

	return (
		<ul className="l-drawer">
			<li className="l-drawer__item">
				<a className={`l-drawer__btn btn--dashboard ${activePath === "/admin" ? "isActive" : "notActive"}`} href="/admin">
					<FontAwesomeIcon className="btn--icon dashboard--icon" icon={faCog} />
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
		</ul>
	);
}

Drawer.propTypes = {
	activePath: PT.string.isRequired,
	limberData: PT.object.isRequired,
};

export default Drawer;
