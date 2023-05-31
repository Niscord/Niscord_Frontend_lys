import React from "react";
import { styled } from "styled-components";

export const MemberListWindow = ({
  members
}) => {
  let memberList = []

  const generateList = () => {
    members.forEach(member => {
      const element = <div key={member?.id} style={{
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        padding: 10,
      }}>
        {member?.username}
      </div>

      memberList.push(element);
    })

    return memberList;
  }

  return (
    <ListWindow>
      <h3 style={{
        textAlign: 'center',
        width: '90%',
        padding: 10,
        borderBottom: '1px solid black',
        paddingBottom: 20,
        marginBottom: 0,
      }}>Members</h3>
      {generateList()}
    </ListWindow>
  )
}

const ListWindow = styled.div`
  text-align: left;
  width: 230px;
  height: 550px;
  border: 2px solid black;
  border-radius: 6px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;