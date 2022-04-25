import styled from "styled-components";
import { ParallaxSection } from "../components/Containers"


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-basis: auto;
    height: 100%;
    width: 100%;
`

const TitleContainer = styled.div`
    /* margin-bottom: 1%; */
    width: fit-content;

    line-height: 90%;
    text-align: left;
    color: rgb(255, 253, 146);    
`

const ServicesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    height: 50vh;
    margin: 3%;
    margin-top: 5%;
`

const ServiceBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    margin: auto 1%;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(61, 10, 0, 0.7);
    border: 2px solid rgb(255, 253, 146);
    border-radius: 20px;
    backdrop-filter: blur(32px);
    
`

const ServiceTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: auto;
    width: 80%;
    
    & img {
        /* height: 50%;       */
        margin: 0 12px;
    }
    
    & h3 {        
        margin: 0 4%;
    }
`

const ServiceDescriptionText = styled.div`
    display: flex;
    flex-direction: column;

    & p {
        margin: 3.5% 8%;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        line-height: 100%;
        text-align: left;
    }
`

const Icon = styled.img`
    width: 60px;
    height: 60px;

    @media (max-width: 720px) {

    }
`

const ServiceSection = () => {
    return (
        <ParallaxSection style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/img/backgrounds/ServicesSection_Background.png"})` }}>
            <Container>

                <TitleContainer>
                    <h1 className="title">OUR SERVICES</h1>
                </TitleContainer>


                <ServicesContainer>

                    <ServiceBoxContainer>

                        <ServiceTitle>
                            <Icon src={process.env.PUBLIC_URL + "/img/sustainable.png"} alt="sustainable"/>
                            <h3 className="title">SUSTAINABLE</h3>
                        </ServiceTitle>

                        <ServiceDescriptionText>
                            <p>Our first concern is the sustainability of the project. We try to find the ways to be sustainable, by differents investments and new product.</p>
                        </ServiceDescriptionText>



                    </ServiceBoxContainer>

                    <ServiceBoxContainer>
                        <ServiceTitle>
                            <Icon src={process.env.PUBLIC_URL + "/img/transparent.png"} alt="transparent"/>
                            <h3 className="title">TRANSPARENT</h3>
                        </ServiceTitle>

                        <ServiceDescriptionText>
                            <p>
                                All of our contracts are publicly available and can be inspected by the community.
                            </p>
                            <p>
                                The treasury is locked with a multisig and all the teams tokens are locked for 6 months.
                            </p>
                        </ServiceDescriptionText>
                    </ServiceBoxContainer>

                    <ServiceBoxContainer>
                        <ServiceTitle>
                            <Icon src={process.env.PUBLIC_URL + "/img/community.png"} alt="community"/>
                            <h3 className="title">COMMUNITY-FIRST</h3>
                        </ServiceTitle>

                        <ServiceDescriptionText>
                            <p>
                                Mountain Nodes aims to become the first protocol governed by it’s community at 100% and fully decentralized.
                            </p>
                            <p>
                            That’s why every decisions are voted by the community and any ideas can be proposed in order to constantly improve the project.
                            </p>
                        </ServiceDescriptionText>
                    </ServiceBoxContainer>

                </ServicesContainer>

            </Container>
        </ParallaxSection>
    )
}

export default ServiceSection;