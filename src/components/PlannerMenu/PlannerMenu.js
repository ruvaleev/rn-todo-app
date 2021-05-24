import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import HomeLink from '../shared/HomeLink';
import ImageButtonLink from '../shared/ImageButtonLink';
import LanguagePanel from '../shared/LanguagePanel';
import ModalForm from '../ModalForm';
import PlusIcon from '../../assets/icons/PlusIcon';

function PlannerMenu({ dropdownIsRolled, navigation, toggleFormIsShown }){
  return (
    <>
      <View style={styles.controlPanel}>
        <ImageButtonLink callback={toggleFormIsShown}>
          <PlusIcon stroke={dropdownIsRolled ? 'black' : '#D83E1D'}/>
        </ImageButtonLink>
        {
          dropdownIsRolled &&
            <View style={styles.controlPanelRightSide}>
              <HomeLink navigation={navigation}/>
              <LanguagePanel/>
            </View>
        }
      </View>
      <ModalForm/>
    </>
  );
}

export default PlannerMenu;

const styles = StyleSheet.create({
  controlPanel: {
    backgroundColor: '#fff',
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    right: 0,
    paddingHorizontal: '5%',
  },
  controlPanelRightSide: {
    flexDirection: 'row'
  }
});

PlannerMenu.propTypes = {
  dropdownIsRolled: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  toggleFormIsShown: PropTypes.func.isRequired
};
