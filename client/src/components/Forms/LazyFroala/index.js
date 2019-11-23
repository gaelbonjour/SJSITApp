/* istanbul ignore file */
/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import LoadingForm from "components/Forms/LoadingForm";

class LazyFroala extends Component {
	state = {
		Component: null,
	};

	componentDidMount = () => this.importFile();

	componentWillUnmount = () => {
		this.cancelImport = true;
		clearTimeout(this.timer);
	};

	setTimer = () => {
		this.timer = window.setTimeout(() => {
			const node = document.querySelector(".fr-wrapper > div");
			if (node && node.style[0] === "z-index") {
				node.style.display = "none";
			}
		}, 500);
	};

	cancelImport = false;

	importFile = async () => {
		try {
			const { default: file } = await import(
				/* webpackMode: "lazy" */ "react-froala-wysiwyg"
			);

			await import(/* webpackMode: "lazy" */ "./styles.css");

			if (!this.cancelImport) this.setState({ Component: file });
		} catch (err) {
			console.error(err.toString());
		}
	};

	render = () => {
		const { Component } = this.state;

		return Component ? (
			<Component ref={this.setTimer} {...this.props} />
		) : (
			<LoadingForm rows={1} />
		);
	};
}

LazyFroala.propTypes = {
	children: PropTypes.node,
};

export default LazyFroala;
/* eslint-enable no-console */
