import styled from "styled-components";

export const Section = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: initial;
    padding: 32px;
    width: 100%;
    min-height: 100vh;
    margin: 0;
`;


export const ParallaxSection = styled(Section)`
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
`
