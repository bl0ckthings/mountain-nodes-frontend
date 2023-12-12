import styled from "styled-components";
import { ParallaxSection } from "../components/Containers"
import { Video } from "../components/Video";
import { BackgroundVideo } from "./HeroSection";

const RoadmapPoint = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 10.5vh;
    padding: 48px 32px;
    border-radius: 24px;
    background-color: rgba(10, 40, 10, 0.5);
    box-shadow:
        0px 5.2px 1.4px -32px rgba(0, 0, 0, 0.067),
        0px 10.4px 3.2px -32px rgba(0, 0, 0, 0.092),
        0px 15.5px 5.6px -32px rgba(0, 0, 0, 0.107),
        0px 20.9px 8.9px -32px rgba(0, 0, 0, 0.12),
        0px 27.2px 13.7px -32px rgba(0, 0, 0, 0.136),
        0px 35.8px 21.4px -32px rgba(0, 0, 0, 0.16),
        0px 51.3px 35.5px -32px rgba(0, 0, 0, 0.204),
        0px 96px 71px -32px rgba(0, 0, 0, 0.33)
    ;

    backdrop-filter: blur(24px);
    border: 2px solid rgba(200, 250, 200, 0.8);
    transition: all 0.35s cubic-bezier(0.77, 0, 0.175, 1);

    & li {
        font-size: 100%;
    }
`;

const RoadmapContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    align-self: end;

    & ${RoadmapPoint}:not(:last-child) {
        &:after {
            content: "";
            position: absolute;
            bottom: 0px;
            transform: translateY(115%);
            height: 8vh;
            width: 3px;
            background: rgba(255, 255, 255, 0.3);
        }
    }

    @media (max-width: 800px) {
        width: 100%;
        align-self: center;
    }
`;

const RoadmapVideo = styled(BackgroundVideo)`
    @media (max-width: 800px) {
        
    }
`

const RoadmapSection = () => {
    return (
        <ParallaxSection id="roadmap">

            <RoadmapContainer>
                <h1 className="title" style={{ marginTop: 32, color: 'rgb(255, 237, 151)' }}>ROADMAP</h1>
                <RoadmapPoint>
                    <h3>July 2022 - Launch</h3>
                    <ul>
                        <li>Launch of our website and social medias</li>
                        <li>Begin pre-sale to raise an initial liquidity</li>
                        <li>Deploy smart contracts and open the Dashboard</li>
                    </ul>
                </RoadmapPoint>
                <RoadmapPoint>
                    <h3>August 2022 - Launch</h3>
                    <ul>
                        <li>Listing on Coingecko and CoinMarketCap</li>
                        <li>Begin a social media marketing campaign</li>
                        <li>Community growth focus, hold DAO-like votes for community wants</li>
                        <li>Community growth focus, hold DAO-like votes for community wants</li>
                    </ul>
                </RoadmapPoint>
                <RoadmapPoint>
                    <h3>September 2022 - Growth & Future</h3>
                    <ul>
                        <li>Huge marketing push & Community build/events</li>
                        <li>Lottery system for $MNT holders (Add token utility)</li>
                        <li>Conversion of all existing Mountain Nodes to NFTs</li>
                    </ul>
                </RoadmapPoint>
                <RoadmapPoint>
                    <h3>October 2022 - Growth & Future</h3>
                    <ul>
                        <li>Create a R2E that will allow you to play with your NFTs</li>
                        <li>
                            Explore becoming a hybrid DaaS/NaaS project <br />
                            by launching validator nodes for the community. <strong>(Important step for our tokenomic)</strong></li>
                    </ul>
                </RoadmapPoint>
            </RoadmapContainer>
        </ParallaxSection>
    )
}

export default RoadmapSection;