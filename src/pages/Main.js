import React, {memo, useState} from 'react';
import styled from 'styled-components';
import ChatRoom from '../components/ChatRoom';
import io from 'socket.io-client';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45rem;
`;

const LeftWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  background: gray;
  
  color: white; // font color
  font-size: 20px;
  font-weight: bold;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 100%;
  background: darkgray;
  
  color: black;
  font-weight: bold;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  
  color: black;
  font-size: 50px;
  font-weight: bold;
`;

const Grid = styled.div`
  width: 300px;
  padding: 10px;
`;

const Scroll = styled.nav`
  overflow: scroll;
  height: 300px;
  border : 1px solid black;
  border-radius: 6px;
  background: azure;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const RoomButton = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  color: black;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  
  height: 1rem;
  font-size: 20px;
  background: azure;
  text-align: center;

  &:hover {
    font-weight: bold;
  }
  &:active {
    font-weight: bold;
    color: red;
  }
`;

const AbsPosition = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
`;

const Main = () => {
    const [isChatRoom1Active, setRoom1State] = useState(false)

    function switchRoom1State() {
        if (isChatRoom1Active === false)
            setRoom1State(true);
        else
            setRoom1State(false);
    }

    return (
        <Wrapper>
            <LeftWrapper>
                <AbsPosition top="20%">
                    <Profile>ID: XXXXXX</Profile>
                </AbsPosition>
                <AbsPosition top="50%">
                    <Scroll>
                        <Grid><RoomButton
                            onClick = {switchRoom1State}
                        >{isChatRoom1Active ? <div>1번 대화방</div> : <div>+ 방 만들기</div>}</RoomButton></Grid>
                    </Scroll>
                </AbsPosition>
            </LeftWrapper>
            <RightWrapper>
                {isChatRoom1Active && <ChatRoom />}
            </RightWrapper>
        </Wrapper>
    );
}

export default Main