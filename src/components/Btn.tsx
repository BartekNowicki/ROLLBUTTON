import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

type ButtonProps = {
  buttonText: string;
};

const Btn = ({ buttonText }: ButtonProps) => {
  const [myRef, setMyRef] = useState<HTMLDivElement | null>(null);
  const btnRef = useRef(null);
  const [myTimeline, setmyTimeline] = useState<GSAPTimeline | null>(null);

  let interval = useRef<number | null>(null);

  const cleanupAfterAnimation = () => {
    if (!myRef) return;

    setTimeout(() => {
      if (interval && interval.current) {
        window.clearInterval(interval.current);
      }
      myRef.innerText = "thank you :-)";
    }, 0);
    setTimeout(() => {
      myRef.innerText = "ba-bye!";
    }, 5000);
  };

  const getColor = useCallback(() => {
    const colorOptions = [
      "red",
      "green",
      "blue",
      "yellow",
      "magenta",
      "white",
      "black",
      "gray"
    ];
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  }, []);

  const changeBorderColor = useCallback(() => {
    if (!myRef) return;
    myRef.style.border = `1px solid ${getColor()}`;
  }, [myRef, getColor]);

  const animate = () => {
    if (myTimeline) {
      myTimeline
        .to(myRef, {
          backgroundColor: "red",
          duration: 2,
          height: 100,
          width: 100,
          borderRadius: 50,
          ease: "bounce.out",
          y: 100
        })
        .to(myRef, {
          duration: 2,
          rotation: 360,
          onComplete: cleanupAfterAnimation
        })
        .to(myRef, { duration: 7, rotation: -720, x: -314, ease: "bounce.out" })
        .to(myRef, { duration: 0.75, opacity: 0 });
    }
  };

  useEffect(() => {
    setMyRef(btnRef.current);
    const tl: GSAPTimeline = gsap.timeline();
    setmyTimeline(tl);
  }, []);

  useEffect(() => {
    interval.current = window.setInterval(changeBorderColor, 1000);
    if (typeof interval === "number") return window.clearInterval(interval);
  });

  return (
    <button ref={btnRef} onClick={() => animate()}>
      {buttonText}
    </button>
  );
};

export default Btn;
