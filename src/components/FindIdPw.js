import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 80%;
    background: gray;
    color: black;
    font-size: ${props => props.fontSize};
`;

const SearchWindow = styled.div`
    width: 100%;
    height: 3%;
    font-size: ${props => props.fontSize};
`;

const ResultWindow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30%;
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
`;

const FindIdPw = () => {
    return (
        <Wrapper fontSize="25px">
            <div>ㅤ* ID 찾기</div>
            <SearchWindow fontSize="20px">
                ㅤㅤㅤUsername:ㅤ<input placeholder='Enter Username...' />
                <button>찾기</button>
            </SearchWindow>
            <ResultWindow color="red">foobar123</ResultWindow>
            <div>ㅤ* 비밀번호 찾기</div>
            <SearchWindow fontSize="20px">
                ㅤㅤㅤㅤㅤㅤID:ㅤ<input placeholder='Enter ID...' />
                <button>찾기</button>
            </SearchWindow>
            <ResultWindow color="red">ID doesn't exist. Try Again.</ResultWindow>
        </Wrapper>
    );
}

export default FindIdPw;