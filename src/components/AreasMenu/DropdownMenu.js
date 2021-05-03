
import React, { useState } from 'react';
import {
  Dimensions, Image, View, Text, TouchableOpacity, ScrollView, Animated, Easing, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

import arrowDown from '../../assets/icons/arrow-down.svg';
import remove from '../../assets/icons/remove.svg';

function DropdownMenu({ elements, choosenIndex, onChooseCallback, onRemoveCallback }) {
  const [isRolled, toggleIsRolled] = useState(true)
  const [rotationAnimation] = useState(new Animated.Value(0))

  const choosenElement = elements[choosenIndex]

  function openPanel() {
    Animated.timing(rotationAnimation, {
      toValue: 0.5,
      duration: 300,
      easing: Easing.linear
    }).start();
  }

  function closePanel() {
    Animated.timing(rotationAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear
    }).start();
  }

  function toggleRoll() {
    isRolled ? openPanel() : closePanel()
    toggleIsRolled(!isRolled)
  }

  var height = !isRolled && Math.min(Dimensions.get('window').height * 0.8, (elements.length * 40) + 48);

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <View style={{ flexDirection: 'row', backgroundColor: 'white', overflow: 'scroll', height: height }}>
        <SelectHeader
          title={choosenElement}
          callback={() => toggleRoll()}
          onRemoveCallback={onRemoveCallback}
          rotationAnimation={rotationAnimation}
          isActive={!isRolled}/>
        {
          isRolled ||
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

function SelectHeader({ title, callback, onRemoveCallback, rotationAnimation, isActive}) {
  return(
    <View style={styles.headerButton}>
      <View style={{flexDirection: 'row'}}>
        <RemoveIcon
          onRemoveCallback={onRemoveCallback}
          providedStyle={styles.removeIcon}
          title={title}
        />
        <TouchableOpacity
          onPress={callback}
          activeOpacity={1}
          style={styles.header}
        >
          <Text style={[isActive ? styles.activeTint : styles.regularTint, {}]}>{title}</Text>
          <DropdownIcon  rotationAnimation={rotationAnimation} isActive={isActive}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const RemoveIcon = ({ onRemoveCallback, providedStyle, title }) => (
  <TouchableOpacity onPress={() => onRemoveCallback(title)} style={[styles.button, providedStyle]} testID='RemoveIcon'>
    <Image source={remove} style={styles.icon}/>
  </TouchableOpacity>
);

function DropdownIcon({ rotationAnimation, isActive }) {
  const transform = [
    {
      rotateZ: rotationAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    }
  ]
  return(
    <Animated.Image
      source={arrowDown}
      style={[
        styles.headerIcon,
        { transform: transform },
        isActive ? styles.activeIcon : styles.regularIcon
      ]}
    />
  )
}

function ElementsList({ elements, choosenIndex, onChooseCallback, toggleRoll }) {
  return(
    <View style={styles.elementsListContainer}>
      <ScrollView style={styles.elementsListScrollView}>
        {elements.map((title, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            style={styles.elementsListButton}
            onPress={() => {
              onChooseCallback(title)
              toggleRoll()
            }}
          >
            <Element title={title} isActive={index === choosenIndex}/>
            <View style={styles.elementsListBreakLine} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

function Element({title, isActive}) {
  return (
    <View style={styles.elementContainer}>
      <Text style={[styles.element, isActive ? styles.activeTint : styles.regularTint]}>{title}</Text>
    </View>
  )
}

export default DropdownMenu;

DropdownMenu.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.string,
  ),
  choosenIndex: PropTypes.number,
  onChooseCallback: PropTypes.func,
  onRemoveCallback: PropTypes.func
};

SelectHeader.propTypes = {
  title: PropTypes.string,
  callback: PropTypes.func,
  isActive: PropTypes.bool,
  rotationAnimation: PropTypes.object,
  onRemoveCallback: PropTypes.func
};

RemoveIcon.propTypes = {
  onRemoveCallback: PropTypes.func,
  providedStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  title: PropTypes.string
}

DropdownIcon.propTypes = {
  isActive: PropTypes.bool,
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
    color: '#D83E1D'
  },
  element: {
    fontSize: 14,
    color: 'black',
    height: 40,
    alignItems: 'center',
    display: 'flex'
  },
  elementContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  elementsListBreakLine: {
    backgroundColor: '#F6F6F6',
    height: 1,
    marginLeft: 15
  },
  elementsListButton: {
    flex: 1,
    height: 44
  },
  elementsListContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 48,
    bottom: 0
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
  headerIcon: {
    width: 16,
    height: 16,
    marginLeft: 16,
    marginRight: -32
  },
  regularIcon: {
    tintColor: 'black'
  },
  regularTint: {
    color: 'black'
  },
  removeIcon: {
    marginLeft: -32,
    marginRight: 16
  },
  icon: {
    minWidth: '1rem',
    width: '1rem',
    height: '1rem'
  }
});
