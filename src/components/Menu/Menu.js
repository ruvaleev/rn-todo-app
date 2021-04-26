import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyleSheet, ScrollView, TextInput, View } from 'react-native';

import DropdownMenu from '../shared/DropdownMenu';

function AreaForm({ onSubmit }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('')

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={t('create area placeholder')}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={() => {
          onSubmit(title)
          setTitle('')
        }}
        testID="Add area"
      />
    </View>
  );
}

function AreasMenu({areas, chooseArea}) {
  var selectedIndex = areas.findIndex((area) => area.choosen)
  var areaTitles = areas.map((area) => area && area.title)
  var height = areaTitles.length * 40 + 40;
  return (
    areas.length > 0 &&
    <View style={[styles.areasMenuContainer, { height: height }]}>
      <DropdownMenu
        elements={areaTitles}
        choosenIndex={selectedIndex}
        onChooseCallback={(title) => {
          chooseArea(areas.find((area) => area.title === title).id)
        }}
      />
    </View>
  )
}

function Menu({ areas, createArea, chooseArea }) {
  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.menu}>
      <AreasMenu areas={areas} chooseArea={chooseArea}/>
      <AreaForm onSubmit={(data) => createArea({ title: data })} />
    </ScrollView>
  );
}

export default Menu;

AreaForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

AreasMenu.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.PropTypes.object,
  ),
  chooseArea: PropTypes.func.isRequired,
};

Menu.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.PropTypes.object,
  ),
  chooseArea: PropTypes.func.isRequired,
  createArea: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  areas: [],
};

const styles = StyleSheet.create({
  areasMenuContainer: {
    width: '100%', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    paddingHorizontal: '5%', 
    zIndex: 20,
    overflow: 'scroll',
    maxHeight: '80vh'
  },
  areaLink: {
    paddingHorizontal: '2rem',
    marginTop: '1.5rem',
    minWidth: '100%',
    textAlign: 'center',
    lineHeight: 1,
    fontWeight: '300'
  },
  borderLine: {
    position: 'absolute',
    left: '5vw',
    top: '3.5rem',
    width: '90vw',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  choosenAreaLink: {
    paddingHorizontal: '2rem',
    marginTop: '1.5rem',
    minWidth: '100%',
    lineHeight: 1,
    fontWeight: '400'
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
    bottom: '4rem',
    position: 'absolute',
    right: '0',
    width: '90%',
    margin: '0 5%'
  },
  input: {
    height: '1.5rem',
    paddingEnd: '0.5rem',
    width: '100%',
    textAlign: 'right',
    fontSize: 14,
    lineHeight: 1.5,
    color: 'black',
    fontStyle: 'italic',
    borderBottomColor: '#D83E1D',
    borderBottomWidth: 1,
    minWidth: '17rem',
    marginRight: '2rem'
  },
  menu: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    width: '100%',
    zIndex: 1000
  }
});
