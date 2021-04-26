
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated, Easing, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import arrowDown from '../../assets/icons/arrow-down.svg';

function Element({title, isActive}) {
  return (
    <View style={styles.elementContainer}>
      <Text style={[styles.element, isActive ? styles.activeTint : styles.regularTint]}>{title}</Text>
    </View>
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

function DropdownIcon({ rotationAnimation, isActive }) {
  const transform = [
    {
      rotateZ: rotationAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
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
function SelectHeader({ title, callback, rotationAnimation, isActive}) {
  return(
    <TouchableOpacity
      onPress={callback}
      activeOpacity={1}
      style={styles.headerButton}
    >
      <View style={styles.header}>
        <Text style={isActive ? styles.activeTint : styles.regularTint}>{title}</Text>
        <DropdownIcon  rotationAnimation={rotationAnimation} isActive={isActive}/>
      </View>
    </TouchableOpacity>
  )
}

function DropdownMenu({ elements, choosenIndex, onChooseCallback }) {
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

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <View style={{ flexDirection: "row", backgroundColor: 'white' }}>
        <SelectHeader
          title={choosenElement}
          callback={() => toggleRoll()}
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

export default DropdownMenu;

DropdownMenu.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.string,
  ),
  choosenIndex: PropTypes.number,
  onChooseCallback: PropTypes.func
};

SelectHeader.propTypes = {
  title: PropTypes.string,
  callback: PropTypes.func,
  rotationAnimation: PropTypes.object,
  isActive: PropTypes.bool
};

DropdownIcon.propTypes = {
  rotationAnimation: PropTypes.object,
  isActive: PropTypes.bool
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    flexDirection: "row"
  },
  elementsListBreakLine: {
    backgroundColor: "#F6F6F6",
    height: 1,
    marginLeft: 15
  },
  elementsListButton: {
    flex: 1,
    height: 44
  },
  elementsListContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 40,
    bottom: 0
  },
  elementsListScrollView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headerButton: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  headerIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  regularIcon: {
    tintColor: 'black'
  },
  regularTint: {
    color: 'black'
  }
});
