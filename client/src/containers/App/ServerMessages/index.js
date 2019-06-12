import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	FaBell,
	FaExclamationCircle,
	FaExclamationTriangle,
} from "react-icons/fa";
import { Transition } from "react-transition-group";
import { hideServerMessage, resetServerMessage } from "actions/messages";
import MessageContainer from "./MessageContainer";
import WindowContainer from "./WindowContainer";
import AlertContainer from "./AlertContainer";
import TextContainer from "./TextContainer";
import ButtonContainer from "./ButtonContainer";
import CloseButton from "./CloseButton";

class Message extends Component {
	componentDidUpdate = prevProps => {
		if (prevProps.message !== this.props.message && this.props.message !== "") {
			if (this.timeout) clearTimeout(this.timeout);
			this.setTimer();
		}
	};

	componentWillUnmount = () => this.clearTimer();

	shouldComponentUpdate = nextProps =>
		nextProps.message !== this.props.message ||
		nextProps.show !== this.props.show ||
		nextProps.serverMessage !== this.props.serverMessage;

	alertType = () => {
		const { type } = this.props;
		switch (type) {
			case "alert":
				return <FaBell />;
			case "warning":
				return <FaExclamationTriangle />;
			default:
				return <FaExclamationCircle />;
		}
	};

	clearTimer = () => {
		clearTimeout(this.timeout);
		this.props.hideServerMessage();
	};

	timer = () => this.clearTimer();

	setTimer = () => (this.timeout = setTimeout(this.timer, 3000));

	render = () => (
		<Transition
			mountOnEnter
			unmountOnExit
			in={this.props.show}
			timeout={350}
			onExited={this.props.resetServerMessage}
		>
			{state => (
				<WindowContainer state={state}>
					<MessageContainer type={this.props.type}>
						<AlertContainer>{this.alertType()}</AlertContainer>
						<TextContainer>{this.props.message}</TextContainer>
						<ButtonContainer>
							<CloseButton handleClick={this.clearTimer} />
						</ButtonContainer>
					</MessageContainer>
				</WindowContainer>
			)}
		</Transition>
	);
}

Message.propTypes = {
	hideServerMessage: PropTypes.func.isRequired,
	message: PropTypes.string,
	resetServerMessage: PropTypes.func.isRequired,
	show: PropTypes.bool,
	type: PropTypes.string,
};

export default connect(
	({ server }) => ({
		message: server.message,
		show: server.show,
		type: server.type,
	}),
	{ hideServerMessage, resetServerMessage },
)(Message);
