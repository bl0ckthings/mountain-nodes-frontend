import styled from "styled-components";

export const InputField = styled.input<{ isValid?: boolean }>`
    margin: 12px 0px;
    font-size: 125%;
    border: ${props => !props.isValid ? "1px solid rgba(255, 77, 101, 0.7)" : "1px solid rgba(255, 255, 255, 0.7)"};
    border-radius: 8px;
    background: rgba(30, 30, 30, 0.5);
    outline: none;
    color: white;
    padding: 12px 24px;
    font-weight: 100;
    transition: all 0.3s ease-in-out;

    &:focus {
        box-shadow: ${props => !props.isValid ? "0px 0px 16px rgba(255, 77, 101, 0.7)" : "0px 0px 16px rgba(255, 255, 255, 0.4)"};
    }
`