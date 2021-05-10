import React from 'react';
import Svg, { Path } from 'react-native-svg';

function HomeIcon(props) {
  return (
    <>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="prefix__icon prefix__icon-tabler prefix__icon-tabler-home"
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
        <Path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        <Path d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6" />
      </Svg>
    </>
  );
}

export default HomeIcon;
