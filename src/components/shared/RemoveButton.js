import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import RemoveIcon from '../../assets/icons/RemoveIcon.js';

const RemoveButton = ({ callback, providedStyle, title, iconStyle }) => (
  <TouchableOpacity onPress={() => callback(title)} style={providedStyle} testID='RemoveIcon'>
    <RemoveIcon  width={20} height={20} {...iconStyle}/>
  </TouchableOpacity>
);

export default RemoveButton;

RemoveButton.propTypes = {
  callback: PropTypes.func,
  iconStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  providedStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  title: PropTypes.string
}
