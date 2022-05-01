import styled from "styled-components";
import { ParallaxSection } from "../components/Containers"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;

    @media (max-width: 800px) {
        height: auto;
    }
`

const Services = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    padding: 0px 10vw;
    margin-top: 10vh;
    height: 45vh;

    @media (max-width: 800px) {
        flex-direction: column;
        height: 100vh;
        width: 100%;
        padding: 0px 5vw;
    }
`

const Service = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 100%;
    padding: 48px;
    margin: 48px;
    background: rgba(61, 10, 0, 0.7);
    border: 3px solid rgb(255, 253, 146);
    border-radius: 48px;
    backdrop-filter: blur(16px);

    & p {
        font-size: 90%;
    }

    @media (max-width: 800px) {
        width: 100%;
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

    @media (max-width: 720px) {

    }
`

const ServiceSection = () => {
    return (
        <ParallaxSection id="services" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/img/backgrounds/ServicesSection_Background.png"})`, padding: "128px 64px" }}>
            <Container>
                <h1 style={{ color: "#fffd92", fontSize: "5vmax" }} className="title">NEXT-GEN SERVICES</h1>
                <h4>Our innovative solutions to unlock the true potential of our protocol</h4>
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