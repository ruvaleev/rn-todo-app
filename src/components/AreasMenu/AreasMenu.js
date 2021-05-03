import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import DropdownMenu from './DropdownMenu';

function AreasMenu({areas, chooseArea, removeArea}) {
  var selectedIndex = areas.findIndex((area) => area.choosen)
  var areaTitles = areas.map((area) => area && area.title)
  return (
    <View style={{ alignItems: 'center', flexBasis: '10%', zIndex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '90%' }}>
        <View style={{ width: '100%' }}>

          {areas.length > 0 &&
            <DropdownMenu
              elements={areaTitles}
              choosenIndex={selectedIndex}
              onChooseCallback={(title) => chooseArea(areas.find((area) => area.title === title).id)}
              onRemoveCallback={(title) => removeArea(areas.find((area) => area.title === title).id)}
            />
          }
        </View>
      </View>
    </View>
  )
}

export default AreasMenu;

AreasMenu.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  chooseArea: PropTypes.func.isRequired,
  removeArea: PropTypes.func.isRequired
};
