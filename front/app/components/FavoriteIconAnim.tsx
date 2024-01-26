"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef } from "react";
import heartAnimation from "../../public/likebutton.json";

export const FavoriteIconAnim: React.FC<{
  on: boolean;
}> = ({ on }) => {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    if (!playerRef.current) {
      return;
    }
    if (on) {
      playerRef.current.play();
    } else {
      playerRef.current.stop();
    }
  }, [on]);

  return (
    <Player
      ref={playerRef}
      speed={1.8}
      keepLastFrame
      src={heartAnimation}
      style={{ width: '50px', height: '50px' }} // ここでサイズを指定
    />
  );
}