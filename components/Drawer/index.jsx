import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import PT from "prop-types";

function Drawer({ activePath }) {
	return (
		<ul className="l-drawer">
			<li className="l-drawer__item">
				<a className={`l-drawer__btn btn--dashboard ${activePath === "/admin" ? "isActive" : "notActive"}`} href="/admin">
					<FontAwesomeIcon className="btn--icon dashboard--icon" icon={faCog} />
					<span className="btn--text dashboard--text">Dashboard</span>
				</a>
			</li>
			<li className="l-drawer__item">
				<a className="l-drawer__btn" href="/settings">
					<FontAwesomeIcon className="btn--icon" icon={faCog} />
					<span className="btn--text">Settings</span>
				</a>
			</li>
		</ul>
	);
}

Drawer.propTypes = {
	activePath: PT.string.isRequired,
};

export default Drawer;
