import styled from "styled-components";
import { ParallaxSection } from "../components/Containers"
import { Video } from "../components/Video";
import { BackgroundVideo } from "./HeroSection";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 64px;
`

const Services = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 52px;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    margin-top: 10vh;
    height: auto;
    width: 100%;
    max-width: 1480px;
    align-self: center;

    @media (max-width: 1400px) {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(3, 1fr);
        min-height: 100vh;
        width: 40%;
    }

    @media (max-width: 800px) {
        width: 100%;
    }
`

const Service = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 100%;
    padding: 48px;
    background: rgba(61, 10, 0, 0.7);
    border: 3px solid rgb(255, 253, 146);
    border-radius: 48px;
    backdrop-filter: blur(16px);
    width: 100%;
    gap: 32px;

    & p {
        font-size: 100%;
    }
    
    @media (max-width: 800px) {
        width: 100%;
        padding: 16px;

        & p {
            font-size: 110%;
        }
    }
`

const ServiceHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
`

const Icon = styled.img`
    width: 60px;
    height: 60px;
`

const Subtitle = styled.h4`
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.35);
`

const ServiceSection = () => {
    return (
        <ParallaxSection id="services">
            <Video styledVideoComponent={BackgroundVideo} src={process.env.PUBLIC_URL + "videos/Lava.mp4"} isMuted loop />
            <Container>
                <h1 style={{ color: "#fffd92", fontSize: "5vmax", overflow: 'unset', textOverflow: 'unset', whiteSpace: 'unset' }} className="title">NEXT-GEN SERVICES</h1>
                <Subtitle>Our innovative solutions to unlock the true potential of our protocol</Subtitle>
                <Services>
                    <Service>
                        <ServiceHeader>
                            <Icon src={process.env.PUBLIC_URL + "img/sustainable.png"} />
                            <h3 className="title">SUSTAINABLE</h3>
                        </ServiceHeader>
                        <p>Our first concern is the sustainability of the project. We try to find the ways to be sustainable, by differents investments and new product.</p>
                    </Service>

                    <Service>
                        <ServiceHeader>
                            <Icon src={process.env.PUBLIC_URL + "img/transparent.png"} />
                            <h3 className="title">TRANSPARENT</h3>
                        </ServiceHeader>
                        <p>Our first concern is the sustainability of the project. We try to find the ways to be sustainable, by differents investments and new product.</p>
                    </Service>

                    <Service>
                        <ServiceHeader>
                            <Icon src={process.env.PUBLIC_URL + "img/community.png"} />
                            <h3 className="title">COMMUNITY-FIRST</h3>
                        </ServiceHeader>
                        <p>
                            Mountain Nodes aims to become the first protocol governed by it’s community at 100% and fully decentralized.<br />
                            <br />
                            That’s why every decisions are voted by the community and any ideas can be proposed in order to constantly improve the project.
                        </p>
                    </Service>
                </Services>
            </Container>
        </ParallaxSection>
    )
}

export default ServiceSection;