import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowDownIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19 5H5a2 2 0 00-1.84 2.75L10.26 20a1.999 1.999 0 003.5 0l7.1-12.25A2 2 0 0019.11 5"
        stroke="#D83E1D"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ArrowDownIcon
