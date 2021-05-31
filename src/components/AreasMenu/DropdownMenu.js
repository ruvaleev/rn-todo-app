
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Animated, Easing, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

import ArrowDownIcon from '../../assets/icons/ArrowDownIcon.js';
import RemoveButton from '../shared/RemoveButton';

function DropdownMenu({ elements, choosenIndex, dropdownIsRolled, toggleDropdownIsRolled, onChooseCallback, onRemoveCallback }) {
  const [rotationAnimation] = useState(new Animated.Value(0))

  const choosenElement = elements[choosenIndex]

  function openPanel() {
    Animated.timing(rotationAnimation, {
      toValue: 0.5,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  function closePanel() {
    Animated.timing(rotationAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  function toggleRoll() {
    dropdownIsRolled ? openPanel() : closePanel()
    toggleDropdownIsRolled()
  }

  var height = dropdownIsRolled ? 60 : '100%'
  return (
    <View style={{ flexDirection: 'column', flex: 1, height: height }}>
      <View style={[styles.dropdownContainer, { height: height }]}>
        <SelectHeader
          title={choosenElement}
          callback={() => toggleRoll()}
          onRemoveCallback={onRemoveCallback}
          rotationAnimation={rotationAnimation}/>
        {
          dropdownIsRolled ||
          <ElementsList 
            elements={elements} 
            choosenIndex={choosenIndex} 
            onChooseCallback={onChooseCallback} 
            toggleRoll={toggleRoll}/>
        }
      </View>
    </View>
  )
}

function SelectHeader({ title, callback, onRemoveCallback, rotationAnimation}) {
  return(
    <View style={styles.headerButton}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: 60}}>
        <RemoveButton
          callback={onRemoveCallback}
          providedStyle={{ flexBasis: '10%' }}
          title={title}
          iconStyle={{stroke: '#D83E1D'}}
        />
        <TouchableOpacity
          onPress={callback}
          activeOpacity={1}
          style={[styles.header, { flexBasis: '80%', height: '100%', alignItems: 'center' }]}
          testID='DropdownHeaderTitle'
        >
          <Text style={styles.activeTint}>{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={callback}
          activeOpacity={1}
          style={[styles.header, { flexBasis: '10%', height: '100%', alignItems: 'center', justifyContent: 'flex-end' }]}
          testID='DropdownHeaderIcon'
        >
          <DropdownIcon  rotationAnimation={rotationAnimation}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function DropdownIcon({ rotationAnimation }) {
  const transform = [
    {
      rotateZ: rotationAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    }
  ]
  return(
    <Animated.View style={{ transform: transform }}>
      <ArrowDownIcon width={24} height={24} stroke={'#D83E1D'}/>
    </Animated.View>
  )
}

function ElementsList({ elements, choosenIndex, onChooseCallback, toggleRoll }) {
  var height = (elements.length * 40);
  return(
    <View style={[styles.elementsListContainer, { height: height }]}>
      <ScrollView style={styles.elementsListScrollView}>
        {elements.map((title, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            style={{flex: 1, height: 44}}
            onPress={() => {
              onChooseCallback(title)
              toggleRoll()
            }}
          >
            <Element title={title} isActive={index === choosenIndex}/>
            <View style={{ backgroundColor: '#F6F6F6', height: 1, marginLeft: 15 }} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

function Element({title, isActive}) {
  return (
    <View style={styles.elementContainer}>
      <Text style={isActive ? styles.activeTint : styles.regularTint}>{title}</Text>
    </View>
  )
}

export default DropdownMenu;

DropdownMenu.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.string,
  ),
  choosenIndex: PropTypes.number,
  dropdownIsRolled: PropTypes.bool,
  toggleDropdownIsRolled: PropTypes.func,
  onChooseCallback: PropTypes.func,
  onRemoveCallback: PropTypes.func
};

SelectHeader.propTypes = {
  title: PropTypes.string,
  callback: PropTypes.func,
  rotationAnimation: PropTypes.object,
  onRemoveCallback: PropTypes.func
};

DropdownIcon.propTypes = {
  rotationAnimation: PropTypes.object,
  onRemoveCallback: PropTypes.func
};

ElementsList.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.string,
  ),
  choosenIndex: PropTypes.number,
  onChooseCallback: PropTypes.func,
  toggleRoll: PropTypes.func
};

Element.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool
};


const styles = StyleSheet.create({
  activeIcon: {
    tintColor: '#D83E1D'
  },
  activeTint: {
    color: '#D83E1D',
    fontSize: 24,
    fontWeight: 'bold'
  },
  dropdownContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    overflow: 'scroll',
    width: '100%'
  },
  elementContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  elementsListContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 60,
    bottom: 0,
    zIndex: 100
  },
  elementsListScrollView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  headerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  regularTint: {
    color: '#D83E1D',
    fontSize: 24
  }
});
