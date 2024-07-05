import { ClassProps, setupClassProps } from "@utils/ClassProps";
import { Component } from "solid-js";

export const LopiLogo: Component<ClassProps> = (props_) => {
  const { classes } = setupClassProps(props_);
  /*
  const oldSvg =
    "M525,570 L525,570 L525,780 L660,780 L660,705 L600,690 L585,540 L525,570 M750,540 L750,540 L675,570 L690,780 L825,780 L810,540 L750,540 M840,540 L840,540 L855,780 L900,780 L900,735 L990,705 L975,585 L840,540 M1005,660 L1005,660 L1020,615 L1110,630 L1110,780 L1050,780 L1050,690 L1005,660 M1050,585 L1050,585 L1110,600 L1110,540 L1050,540 L1050,585";

  const newSvg = oldSvg
    .split(" ")
    .map((point) => {
      const first = point[0];
      const coords = point.slice(1).split(",");
      const x = coords[0];
      const y = coords[1];
      const newX = String(Number(x) - 525);
      const newY = String(Number(y) - 540);
      return `${first}${newX},${newY}`;
    })
    .join(" ");

  console.log(newSvg);
  */

  return (
    <svg
      classList={classes}
      xmlns="http://www.w3.org/2000/svg"
      baseProfile="full"
      version="1.1"
      viewBox="0 0 585 240"
      fill="currentColor"
    >
      <path d="M0,30 L0,30 L0,240 L135,240 L135,165 L75,150 L60,0 L0,30 M225,0 L225,0 L150,30 L165,240 L300,240 L285,0 L225,0 M315,0 L315,0 L330,240 L375,240 L375,195 L465,165 L450,45 L315,0 M480,120 L480,120 L495,75 L585,90 L585,240 L525,240 L525,150 L480,120 M525,45 L525,45 L585,60 L585,0 L525,0 L525,45" />
    </svg>
  );
};
