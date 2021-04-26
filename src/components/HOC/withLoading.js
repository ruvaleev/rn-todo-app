import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import loading from '../../assets/icons/loading.svg';
import { Animated, Easing, StyleSheet, View } from 'react-native';

function LoadingScreen({ isLoading }) {
  useEffect(() => {
    startImageRotateFunction()
  }, [false]);

  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View testID='LoadingIcon' style={styles.loadingContainer}>
      {isLoading && <Animated.Image style={[styles.image, {transform: [{rotate: rotateData}]}]} source={loading}/>}
    </View>
  );
}

/* eslint-disable react/jsx-props-no-spreading */
const withLoading = (EnhancedComponent) => {
  function renderWithLoading({ isLoading, ...props }) {
    return (
      <>
        {isLoading && <LoadingScreen isLoading={isLoading} />}
        <View style={styles.container}>
          <EnhancedComponent {...props} />
        </View>
      </>
    );
  }

  renderWithLoading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

  return renderWithLoading;
};

export default withLoading;

withLoading.propTypes = {
  Component: PropTypes.element,
};

LoadingScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};


const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  image: {
    width: '2rem',
    height: '2rem',
    zIndex: 1
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1
  }
});
