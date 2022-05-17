import styled from "styled-components";
import { NodeCard } from "../components/Cards";
import { Section } from "../components/Containers";
import { NavbarDApp } from "../components/Navbar/Navbar";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    margin-top: 48px;
    perspective: 700px;

    @media (min-width: 800px) {
        & .node:first-child {
            transform: rotateY(-7deg) translateZ(-50px);
        }
        
        & .node:last-child {
            transform: rotateY(7deg) translateZ(-50px);
        }
    
        & .node:hover {
            &:first-child {
                transform: rotateY(-5deg) translateZ(-40px);
            }
    
            &:last-child {
                transform: rotateY(5deg) translateZ(-40px);
            }
    
            transform: translateZ(20px);
        }
    }
    
    @media (max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);    
        grid-template-rows: repeat(3, 1fr) ;
        grid-row-gap: 48px;
    }
`

const Nodes = () => {
    return (
        <Section style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/img/backgrounds/background.png"})`, backgroundPosition: 'center', backgroundSize: 'cover', alignItems: "center",  }}>
            <NavbarDApp />
            <GridContainer>
                <NodeCard fallbackImage={process.env.PUBLIC_URL + "media/Glace.png"} discount={0.2}cost={112} balance={10} MTNprice={200.00} nodeName='Ice Node' color='blue' videoUrl={process.env.PUBLIC_URL + "/media/ice.webm"} price={24} fee={53} reward={9} />
                <NodeCard fallbackImage={process.env.PUBLIC_URL + "media/Lave.png"} discount={1.1} cost={180} balance={17} MTNprice={150.00} nodeName='Lava Node' color='red' videoUrl={process.env.PUBLIC_URL + "/media/lava.webm"} price={25} fee={75} reward={36} />
                <NodeCard fallbackImage={process.env.PUBLIC_URL + "media/Green.png"} discount={0.7} cost={87} balance={9} MTNprice={100.00} nodeName='Green Node' color='green' videoUrl={process.env.PUBLIC_URL + "/media/green.webm"} price={23} fee={34} reward={56} />
            </GridContainer>
        </Section>
    )
}

export default Nodes;