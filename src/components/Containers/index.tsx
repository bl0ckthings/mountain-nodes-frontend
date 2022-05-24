import styled from "styled-components";

export const Section = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: initial;
    padding: 32px;
    width: 100%;
    min-height: 100vh;
    height: auto;
    margin: 0;
    overflow-x: hidden;
`;

export const ParallaxSection = styled(Section)`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
`
