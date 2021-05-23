import React from 'react';
import { View } from 'react-native';

import Area from '../Area';
import AreasMenu from '../AreasMenu';

function AreasCard() {
  return(
    <View style={{ display: 'flex', height: '100%', paddingTop: 20}}>
      <AreasMenu/>
      <Area/>
    </View>
  )
}

export default AreasCard;
