// This component is used to split the screen by dragging into two parts.
import React, { createContext, useState, useRef, useEffect, useContext, ReactNode } from "react";
import "./SplitPane.scss";

interface SplitPaneContextProps {
  size: number | null;
  setSize: React.Dispatch<React.SetStateAction<number | null>>;
}

const splitPaneContext = createContext<SplitPaneContextProps | undefined>(undefined);

interface SplitPaneProps {
  children: [React.ReactNode, React.ReactNode];
  direction: "horizontal" | "vertical";
  maxSize?: string;
  minSize?: string;
}

export default function SplitPane({
  children,
  direction,
  maxSize = "90%",
  minSize = "10%",
}: SplitPaneProps) {
  const [size, setSize] = useState<number | null>(0);
  const separatorPosition = useRef<number | null>(null);
  const splitPaneRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!size) {
      setSize(topRef.current!.clientWidth);
      return;
    }
    if (size) {
      topRef.current!.style.flex = "none";
    }
    topRef.current!.style.width = `${size}px`;
  }, [size, setSize]);
  const getMousePosition = (e: MouseEvent) => {
    if (direction === "horizontal") {
      return e.clientY;
    }
    return e.clientX;
  };
  const onMouseDown = (e: React.MouseEvent<Element, MouseEvent>) => {
    separatorPosition.current = getMousePosition(e as unknown as MouseEvent);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!separatorPosition.current) {
      return;
    }
    if (splitPaneRef.current) {
      const splitPaneX = splitPaneRef.current.getBoundingClientRect()?.x;
      const newWidth = getMousePosition(e) - splitPaneX;
      const splitPaneWidth = splitPaneRef.current.clientWidth;
      const max = (parseInt(maxSize) * splitPaneWidth) / 100;
      const min = (parseInt(minSize) * splitPaneWidth) / 100;
      if (newWidth > max || newWidth < min) {
        return;
      }
      setSize(newWidth);
    }
  };
  const onMouseUp = () => {
    separatorPosition.current = null;
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <div className="split-pane" ref={splitPaneRef}>
      <div className="split-pane-left" ref={topRef}>
        {children[0]}
      </div>
      <div className="separator" onMouseDown={onMouseDown}>
        <div className="separator-item"></div>
      </div>
      <div className="split-pane-right">{children[1]}</div>
    </div>
  );
}
