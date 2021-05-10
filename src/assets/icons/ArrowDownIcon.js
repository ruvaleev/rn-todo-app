import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowDownIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={44}
      height={44}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path d="M6 9l6 6 6-6H6" />
    </Svg>
  )
}

export default ArrowDownIcon
