import styled, { css, keyframes } from "styled-components";
import { AnimatedText } from "../components/AnimatedText";
import Button from "../components/Button";
import { ParallaxSection } from "../components/Containers"
import { Navbar } from "../components/Navbar/Navbar";

const SuperFrame = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: start;
    margin: auto;
    width:  100%;
    max-width: 1500px;
    height: 100%;

    @media (max-width: 800px) {
        flex-direction: column;
    }
`
const Content = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    height: auto;
    
    @media (max-width:425px) {
        .title {
            font-size:3.594rem ;
        }
        
        .subtitle {
            font-size:1.25rem;
        }
    }
`

const SocialNetwork = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: auto;
    height: auto;

    @media (max-width: 800px) {
        flex-direction: row;
        margin-top: 64px;
    }
`

const Powered = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 50px;
    column-gap: 15px;

    h4 {
        font-weight: 400;
        font-size: 1.75rem;
    }

    @media (max-width: 800px){
        h4 {
            font-size: 1rem;
        }

        img {
            width:30px;
            height:30px
        }
    }
`

const Logo = styled.img`
    width: 52px;
    height: 52px;
`

const IconSocials = styled.img`
    width:30px;
    height:30px;
`

const ButtonContainer = styled.div`
    display: flex;
    padding: 24px;
    margin: 48px 0px;
    border-radius: 10px;
    position: relative;

    @media (max-width: 800px){
        margin: 48px 0px;
        width: 100%;
    }

    & * {
        z-index: 1;
    }

    &:before, &:after {
        content: "";
        position: absolute;
        z-index: 0;
    }

    &:before {
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border-radius: 8px;
        background-image: linear-gradient(150deg, rgba(255, 255, 255, 0.7), transparent);
    }

    &:after {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: 8px;
        background-image: url(${process.env.PUBLIC_URL + "img/backgrounds/HeroSection_Background.png"});
        background-position: center center;
        background-size: cover;
        background-attachment: fixed;
    }
`

const Social = styled.div`
    display: flex;
    place-content: center;
    border: solid 2px #fff;
    border-radius: 999px;
    padding: 10px;
    background-color: rgba(255,255,255,0.3);
    transition: .1s ease-in-out;
    cursor: pointer;

    @keyframes shake {
        0%{transform:rotateZ(0)}
        33%{transform:rotateZ(10deg)}
        66%{transform:rotateZ(-10deg)}
        100%{transform:rotateZ(0deg)}
    }

    &:hover {
        animation: shake 0.7s ;
        background-color: rgba(255,255,255,0.5);
    }

    @media (max-width:425px) {
        padding:5px;

        img {
            width: 20px;
            height: 20px;
        }
    }
`

const overlayAnimation = keyframes`
    0% {
        transform: skewX(20deg) scaleX(4) translateX(-10%);
    }

    100% {
        transform: skewX(20deg) scaleX(4) translateX(100%);
    }
`

const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    transform: skewX(20deg) scaleX(4) translateX(-10%);
    transform-origin: left;
    animation: ${overlayAnimation} 0.8s 0.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
    pointer-events: none;
    user-select: none;
    z-index: 1000;
    overflow: hidden;
`

const HeroSection = () => {
    return (
        <ParallaxSection id="home" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/img/backgrounds/HeroSection_Background.png"})` }}>
            <Overlay/>
            <SuperFrame>
                <Content>
                    <AnimatedText delay={0.7} level="h1" className="title">MOUNTAIN NODES</AnimatedText>
                    <h3 className="subtitle">The peaks of the strongest <br /> and highest yields.</h3>
                    <Powered> <h4>Powered by</h4> <Logo src={process.env.PUBLIC_URL + "/img/avax.png"} /></Powered>
                    <ButtonContainer>
                        <Button><h4>Launch dAPP</h4> <Logo src={process.env.PUBLIC_URL + "/img/rightarrow.png"} /> </Button>
                        <Button secondary><h4>Whitepaper</h4> <Logo src={process.env.PUBLIC_URL + "/img/downarrow.png"} /></Button>
                    </ButtonContainer>
                </Content>
                <SocialNetwork>
                    <Social><IconSocials src={process.env.PUBLIC_URL + "/img/discord.png"} /></Social>
                    <Social><IconSocials src={process.env.PUBLIC_URL + "/img/instagram.png"} /></Social>
                    <Social><IconSocials src={process.env.PUBLIC_URL + "/img/Twitter.png"} /></Social>
                </SocialNetwork>
            </SuperFrame>
        </ParallaxSection>
    )
}

export default HeroSection;