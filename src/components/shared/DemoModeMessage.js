import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';

function DemoModeMessage({ isDemo }) {
  const { t } = useTranslation();

  return isDemo
    && (
    <Text style={styles.message}>{t('demo mode message')}</Text>
    // <div className="fixed bottom-0 text-red-100 font-black text-2xl w-full flex justify-center text-center">
    //   {t('demo mode message')}
    // </div>
    );
}

const mapStateToProps = (state) => ({
  isDemo: state.authenticationsReducer.isDemo,
});

export default connect(mapStateToProps)(DemoModeMessage);

// DemoModeMessage.propTypes = {
//   isDemo: PropTypes.bool.isRequired,
// };

// fixed bottom-0 text-red-100 font-black text-2xl w-full flex justify-center text-center

const styles = StyleSheet.create({
  message: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
    bottom: '0px',
    color: 'rgba(254, 226, 226, 1)',
    fontWeight: '900',
    width: '100%',
  },
});
