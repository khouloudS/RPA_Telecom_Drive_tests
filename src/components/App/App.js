import React from "react";
import PropTypes from "prop-types";

import "react-bulma-components/dist/react-bulma-components.min.css";
import {
  Section,
  Container,
  Columns,
  Button,
  Form,
  Notification
} from "react-bulma-components";

import videoRoomPropType from "../../propTypes/videoRoom";
import VideoRoom from "../VideoRoom/VideoRoom";
import FieldInput from "../Fields/FieldInput";

import AppContainer from "./AppContainer";
import App_chat from "./App_chat";
import jwt_decode from "jwt-decode";



const App = ({
  videoRoom,
  userName,
  roomName ,
  isJoining,
  isVideoSupported,
  isScreenSharingSupported,
  isScreenSharingEnabled,
  canJoin,
  onJoin,
  onLeave,
  onShare,
  onUserNameChange,
  onRoomNameChange,
  errorMessage,
  onErrorMessageHide
}) => {
  var str=window.location.href;
  var res ;
  res= str.search("/App/")+5;
  var room_value_id = str.substr(res, str.length-1);
  console.log(room_value_id)
  console.log(str)
  let content = null;
  const token = localStorage.usertoken
  const decoded = jwt_decode(token)
  if (!isVideoSupported) {
    content = <div>Video is not supported</div>;
  } else {
    content = videoRoom ? (
      <>
        {<VideoRoom videoRoom={videoRoom} />}

        <Form.Field kind="group" align="centered">
          <Form.Control>
            <Button onClick={() => onLeave()}>Leave</Button>
          </Form.Control>

          <Form.Control>
            <Button
              onClick={() => onShare()}
              disabled={!isScreenSharingSupported}
            >
              {isScreenSharingEnabled ? "Stop sharing" : "Start sharing"}
            </Button>
          </Form.Control>
        </Form.Field>
        <App_chat/>
      </>
    ) : (
      <Columns>
        <Columns.Column size="half" offset="one-quarter">
          <FieldInput
            value={userName= decoded.first_name}
            name="userName"
            label="User"
            placeholder="The identifier of the user"
            onChange={onUserNameChange}
          />

          <FieldInput
            value={roomName = room_value_id}
            name="roomName"
            label="Room"
            placeholder="The name of the room that you want to join"
            onChange={onRoomNameChange}
          />

          <Form.Field kind="group" align="centered">
            <Form.Control>
              <Button
                onClick={() => onJoin()}
                loading={isJoining}
                disabled={!canJoin}
                color="primary"
              >
                Join
              </Button>
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>
    );
  }

  return (
    <Section>
      <Container>
        <h1>Hello !! Please enter your name to join the call</h1>
        {errorMessage && (
          <Notification color="danger">
            Error: {errorMessage}
            <Button onClick={onErrorMessageHide} remove />
          </Notification>
        )}
        {content}

      </Container>

    </Section>
  );
};

App.propTypes = {
  videoRoom: videoRoomPropType,
  userName: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  isJoining: PropTypes.bool.isRequired,
  isVideoSupported: PropTypes.bool.isRequired,
  isScreenSharingSupported: PropTypes.bool.isRequired,
  isScreenSharingEnabled: PropTypes.bool.isRequired,
  canJoin: PropTypes.bool.isRequired,
  onJoin: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onUserNameChange: PropTypes.func.isRequired,
  onRoomNameChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  onErrorMessageHide: PropTypes.func.isRequired
};

App.defaultProps = {
  videoRoom: null,
  errorMessage: null
};

const render = containerProps => <App {...containerProps} />;
export default props => <AppContainer render={render} {...props} />;
