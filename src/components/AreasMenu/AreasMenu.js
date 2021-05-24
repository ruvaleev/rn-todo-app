import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import DropdownMenu from './DropdownMenu';

function AreasMenu({areas, chooseArea, dropdownIsRolled, removeArea, toggleDropdownIsRolled}) {
  var selectedIndex = areas.findIndex((area) => area.choosen)
  var areaTitles = areas.map((area) => area && area.title)
  return (
    <View style={{ alignItems: 'center', flexBasis: dropdownIsRolled ? '10%' : '80%', zIndex: 10, height: '100%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '90%', height: '100%' }}>
        <View style={{ width: '100%', height: '100%' }}>

          {areas.length > 0 &&
            <DropdownMenu
              elements={areaTitles}
              choosenIndex={selectedIndex}
              dropdownIsRolled={dropdownIsRolled}
              onChooseCallback={(title) => chooseArea(areas.find((area) => area.title === title).id)}
              onRemoveCallback={(title) => removeArea(areas.find((area) => area.title === title).id)}
              toggleDropdownIsRolled={toggleDropdownIsRolled}
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
  dropdownIsRolled: PropTypes.bool.isRequired,
  removeArea: PropTypes.func.isRequired,
  toggleDropdownIsRolled: PropTypes.func.isRequired
};
