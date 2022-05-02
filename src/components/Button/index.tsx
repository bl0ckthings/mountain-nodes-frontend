import styled, { css } from "styled-components";

const Button = styled.button<{ secondary?: boolean }>`
    display: flex;
    width: fit-content;
    align-items: center;
    border: 0;
    padding: 16px 48px;
    border-radius: 10px 0 0 10px;
    color: #272727;
    column-gap: 12px;
    font-size: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: rgba(255, 255, 255, 0.7);

    & img {
        transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.9);

        & img.hovering {
            transform: translateX(15%);
        }
    }
    
    ${props => props.secondary && css`
        border: 1px solid rgba(255, 255, 255, 0.7);
        border-radius: 0 10px 10px 0;
        background-color: rgba(255, 255, 255, 0.1);
        color: white;

        h4 {
            font-weight:200;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.3);
        }
        
        &:active {
            background-color: rgba(255, 255, 255, 0.2);
        }
    `}

    @media (max-width: 800px){
        h4 {
            font-size: 1rem;
        }

        img {
            width: 32px;
            height: 32px;
        }
    }
`

export default Button;