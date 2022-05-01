import styled, { keyframes } from "styled-components";

const letterAnimation = (index: number, length: number) => keyframes`
    0% {
        opacity: 0;
        transform: scaleX(0);
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    100% {
        opacity: 1;
        transform: scaleX(1);
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`;

const Letter = styled.span<{ index: number, length: number, delay: number }>`
    transform: scaleX(0);
    transform-origin: left;
    animation: ${p => letterAnimation(p.index, p.length)} 0.4s ${p => (p.index / 15 + p.delay)}s cubic-bezier(0.77, 0, 0.175, 1) forwards;
`

export const AnimatedText: React.FC<{ level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p', children: string, className?: string, delay: number }> = (props) => {
    const TextHeading = props.level;

    return (
        <TextHeading className={props.className}>
            {
                Array.from(props.children).map((letter, index, array) => <Letter delay={props.delay} style={{display: letter === " " ? "unset" : "inline-block"}} length={array.length} index={index}>{letter}</Letter>)
            }
        </TextHeading>
    );
}