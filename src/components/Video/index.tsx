import { useEffect, forwardRef } from "react";
import { isIOS } from "react-device-detect";
import styled, { StyledComponent } from "styled-components";
import { useForwardedRef } from "../../hooks";

export const StyledVideo = styled.video`
`

export const Player = styled.video`
    width: 100%;
    border-radius: 24px;
    box-shadow: 0px 24px 48px rgba(10, 10, 10, 0.25);
`

const FallbackImage = styled.img`
    width: 100%;
`

export const Video = forwardRef<HTMLVideoElement, { src: string, loop?: boolean, isMuted?: boolean, styledVideoComponent?: StyledComponent<"video", any, any, never>, fallbackImage?: string, fallbackImageComponent?: StyledComponent<"img", any, any, never> }>(({ src, isMuted, styledVideoComponent, loop, fallbackImage, fallbackImageComponent }, ref) => {
    const refVideo = useForwardedRef<HTMLVideoElement>(ref);
    const VideoComponent = styledVideoComponent ?? StyledVideo;
    const FallbackImageComponent = fallbackImageComponent ?? FallbackImage;

    useEffect(() => {
        if (refVideo) {
            if (!refVideo.current) {
                return;
            }

            if (isMuted) {
                //open bug since 2017 that you cannot set muted in video element https://github.com/facebook/react/issues/10389
                refVideo.current.defaultMuted = true;
                refVideo.current.muted = true;
            }

            refVideo.current.disablePictureInPicture = true;
            refVideo.current.src = src;
            refVideo.current.play();
        }
    }, [src, isMuted, refVideo]);

    return (
        <>
            {
                src?.includes(".webm") && isIOS ?
                    <FallbackImageComponent src={fallbackImage} />
                    :
                    <VideoComponent
                        ref={refVideo}
                        src={src}
                        autoPlay
                        preload="auto"
                        loop={loop}
                        controls={false}
                        playsInline //FIX iOS black screen
                    />

            }
        </>
    );
})