import styled from "styled-components";
import { Section } from "../components/Containers"


const SuperFrame = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: start;
    margin: auto;
    width:  100%;
    max-width: 1400px;
    height: 100%;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    height: auto;
    .title{
        color:#FFFD92;
    }
`

const CardContainer = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    column-gap: 50px;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-top: 200px;
    padding: 40px;
    border-radius: 30px;
    border: solid 2px #FFFD92;
    background-color:#3D0A00;
    width: 40%;
    height: 380px;
`
const Logo = styled.img`
    width: 52px;
    height: 52px;
`

const Title = styled.span`
    display: inline-flex;
    align-items: end;
    column-gap: 15px;
`

const Subtext = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    h5{
        font-size: 19px;
        font-weight: 300;
    }

`

const ServiceSection = () => {
    return (
        <Section style={{ background: 'rgb(148,71,0)' }}>
            <SuperFrame>
                <Content>
                    <h1 className="title">Our Services</h1>
                    <CardContainer>
                        <Card>
                            <Title>
                                <Logo src={process.env.PUBLIC_URL + "/img/sustainable.png"} />
                                <h4 className="cardTitle"> Sustainable</h4>
                            </Title>
                            <Subtext>
                                <h5>
                                    Our first concern is the sustainability of the project.
                                    We try to find the ways to be sustainable,
                                    by differents investments and new product.
                                </h5>
                            </Subtext>
                        </Card>

                        <Card>
                            <Title>
                                <Logo src={process.env.PUBLIC_URL + "/img/transparent.png"} />
                                <h4 className="cardTitle">Transparent</h4>
                            </Title>
                            <Subtext>
                                <h5>All of our contracts are publicly available and can be inspected by the community.</h5>
                                <h5>The treasury is locked with a multisig and all the teams tokens are locked for 6 months.</h5>
                            </Subtext>
                        </Card>

                        <Card>
                            <Title>
                                <Logo src={process.env.PUBLIC_URL + "/img/community.png"} />
                                <h4 className="cardTitle">Community-First</h4>
                            </Title>
                            <Subtext>
                                <h5>
                                    Mountain Nodes aims to become the first protocol governed
                                    by it’s community at 100% and fully decentralized.
                                </h5>
                                <h5>
                                    That’s why every decisions are voted by the community and
                                    any ideas can be proposed in order to constantly improve the project.
                                </h5>
                            </Subtext>

                        </Card>
                    </CardContainer>

                </Content>
            </SuperFrame>
        </Section>
    )
}

export default ServiceSection;