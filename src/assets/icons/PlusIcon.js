import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlusIcon(props) {
  return (
    <Svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      testID='PlusIcon'
      {...props}
    >
      <Path
        d="M22 38.5c9.113 0 16.5-7.387 16.5-16.5S31.113 5.5 22 5.5 5.5 12.887 5.5 22 12.887 38.5 22 38.5zM12 22h20M22 12v20"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
    </Svg>
  )
}

export default PlusIcon
