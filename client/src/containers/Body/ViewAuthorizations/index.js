import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { FaKey } from "react-icons/fa";
import { Table } from "components/Body";
import { QueryHandler } from "components/Navigation";
import { deleteToken, fetchTokens } from "actions/Members";
import Filters from "./Filters";
import columns from "./Columns";

const title = "Authorizations";

export const ViewAuthorizations = ({
	deleteToken,
	fetchTokens,
	tokens,
	...rest
}) => (
	<Fragment>
		<Helmet title={title} />
		<Card
			title={
				<Fragment>
					<FaKey
						style={{
							verticalAlign: "middle",
							marginRight: 10,
							fontSize: 20,
						}}
					/>
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<QueryHandler {...rest}>
				{props => (
					<Fragment>
						<Filters {...props} {...rest} />
						<Table
							{...props}
							{...rest}
							columns={columns}
							data={tokens}
							deleteAction={deleteToken}
							fetchData={fetchTokens}
							editLocation="members/authorizations"
						/>
					</Fragment>
				)}
			</QueryHandler>
		</Card>
	</Fragment>
);

ViewAuthorizations.propTypes = {
	deleteToken: PropTypes.func,
	fetchTokens: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	push: PropTypes.func,
	tokens: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.any,
			authorizedEmail: PropTypes.string,
			email: PropTypes.string,
			role: PropTypes.string,
			token: PropTypes.string,
		}),
	),
	totalDocs: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	tokens: state.members.tokens,
	isLoading: state.members.isLoading,
	totalDocs: state.members.totalDocs,
});

const mapDispatchToProps = {
	deleteToken,
	fetchTokens,
	push,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAuthorizations);
