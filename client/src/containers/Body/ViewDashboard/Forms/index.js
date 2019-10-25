import React, { Component, Fragment } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Card, Col } from "antd";
import { FaFileSignature } from "react-icons/fa";
import { LoadingPanel } from "components/Body";
import columns from "../Columns";

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

class Forms extends Component {
	state = { isLoading: true };

	componentDidMount = () => {
		// TODO: API call to gather today's event
	};

	render = () => (
		<Col {...columns}>
			<Card
				bodyStyle={{ minHeight: "300px" }}
				title={
					<Fragment>
						<FaFileSignature style={iconStyle} />
						<span css="vertical-align: middle;">Forms</span>
					</Fragment>
				}
			>
				{this.state.isLoading ? <LoadingPanel /> : <div>Forms</div>}
			</Card>
		</Col>
	);
}

export default connect(null)(Forms);