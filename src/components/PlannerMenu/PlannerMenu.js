import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View } from 'react-native';

import HomeLink from '../shared/HomeLink';
import ImageButtonLink from '../shared/ImageButtonLink';
import LanguagePanel from '../shared/LanguagePanel';
import ModalForm from '../ModalForm';
import PlusIcon from '../../assets/icons/PlusIcon';

function PlannerMenu({ areasPresent, dropdownIsRolled, navigation, toggleFormIsShown }){
  return (
    <>
      <View style={styles.controlPanel}>
        <ImageButtonLink callback={toggleFormIsShown}>
          <PlusIcon stroke={areasPresent && dropdownIsRolled ? 'black' : '#D83E1D'}/>
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
    paddingBottom: Platform.OS === 'ios' ? 31 : 16,
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
  areasPresent: PropTypes.bool.isRequired,
  dropdownIsRolled: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  toggleFormIsShown: PropTypes.func.isRequired
};
