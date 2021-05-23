import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

function SquareCheckIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-square-check"
      width={44}
      height={44}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="black"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Rect x={4} y={4} width={16} height={16} rx={2} />
      <Path d="M9 12l2 2 4-4" />
    </Svg>
  )
}

export default SquareCheckIcon
