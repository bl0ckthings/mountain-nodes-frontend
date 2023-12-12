import { useEthers } from "@usedapp/core";
import styled from "styled-components";
import { NodeCard } from "../components/Cards";
import { Section } from "../components/Containers";
import { NavbarDApp } from "../components/Navbar/Navbar";
import { useDailyReward, useGetNodePrice } from "../hooks";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    /* margin-top: 48px; */
    padding: 8px;
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
    const { chainId } = useEthers();
    const icePrice = useGetNodePrice(chainId!, 0);
    const leafPrice = useGetNodePrice(chainId!, 1);
    const lavaPrice = useGetNodePrice(chainId!, 2);

    const iceReward = useDailyReward(chainId!, 0);
    const leafReward = useDailyReward(chainId!, 1);
    const lavaReward = useDailyReward(chainId!, 2);

    return (
        <Section style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/img/backgrounds/background.png"})`, backgroundPosition: 'center', backgroundSize: 'cover', alignItems: "center", padding: "16px" }}>
            <NavbarDApp />
            <GridContainer>

                <NodeCard fallbackImage={process.env.PUBLIC_URL + "media/Glace.png"} cost={112} balance={10} MTNprice={200.00} nodeName='Ice Node' color='#4c95fc' videoUrl={process.env.PUBLIC_URL + "/media/ice.webm"} price={icePrice || 10} reward={iceReward * icePrice || 0} nodeType={0} />
                <NodeCard fallbackImage={process.env.PUBLIC_URL + "media/Lave.png"} cost={180} balance={2} MTNprice={150.00} nodeName='Lava Node' color='#e68937' videoUrl={process.env.PUBLIC_URL + "/media/lava.webm"} price={lavaPrice || 20} reward={lavaReward * lavaPrice || 0} nodeType={2} />
                <NodeCard fallbackImage={process.env.PUBLIC_URL + "media/Green.png"} cost={87} balance={9} MTNprice={100.00} nodeName='Earth Node' color='#3dd468' videoUrl={process.env.PUBLIC_URL + "/media/green.webm"} price={leafPrice || 15} reward={leafReward * leafPrice || 0} nodeType={1} />
            </GridContainer>
        </Section>
    )
}

export default Nodes;