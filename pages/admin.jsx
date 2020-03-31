import React from "react";
import "../styles/admin.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

function AdminPage() {
	return (
		<>
			<h1 className="title">Welcome to the Admin page of the Git CMS</h1>

			<div>
				<button><FontAwesomeIcon icon={faCog} /> Settings</button>
			</div>
		</>
	);
}

export default AdminPage;
