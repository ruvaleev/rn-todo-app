import React from 'react';
import { View } from 'react-native';

import Area from '../Area';
import AreaForm from '../AreaForm';
import AreasMenu from '../AreasMenu';

function AreasCard() {
  return(
    <View style={{ display: 'flex', height: '100%'}}>
      <AreasMenu/>
      <Area/>
      <AreaForm/>
    </View>
  )
}

export default AreasCard;
