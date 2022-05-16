import styled from "styled-components";
import { AppContainer } from "../App";
import { NodeCard } from "../components/Cards";
import { Section } from "../components/Containers";
import { NavbarDApp } from "../components/Navbar/Navbar";

const NodeWrapper = styled(Section)`
    background-image: url(${process.env.PUBLIC_URL + "/img/backgrounds/background.png"});
    background-size: cover;
    
    & h3{
        text-align: center;
    }
    
`

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    
    @media (max-width: 900px) {
        grid-template-columns: repeat(1, 1fr);    
        grid-template-rows: repeat(3, 1fr) ;
        grid-row-gap: 48px;
    }

`

const Nodes = () => {
    return (
        <AppContainer style={{ backgroundColor: 'black', backgroundPosition: 'center' }}>
            <div><NavbarDApp /></div>
            <NodeWrapper>
                <GridContainer>
                    <NodeCard nodeName='Ice Node' videoUrl={process.env.PUBLIC_URL + "/media/ice.webm"} price={24} fee={53} reward={9} />
                    <NodeCard nodeName='Lava Node' videoUrl={process.env.PUBLIC_URL + "/media/lava.webm"} price={25} fee={75} reward={36} />
                    <NodeCard nodeName='Green Node' videoUrl={process.env.PUBLIC_URL + "/media/green.webm"} price={23} fee={34} reward={56} />
                </GridContainer>
            </NodeWrapper>
        </AppContainer>
    )
}

export default Nodes;