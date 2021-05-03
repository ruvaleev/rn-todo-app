import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';

function AreaForm({ createArea }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('')

  return (
    <View style={{justifyContent: 'flex-end', flexDirection: 'row', zIndex: 20}}>
      <View style={[styles.form]}>
        <TextInput
          style={styles.input}
          placeholder={t('create area placeholder')}
          value={title}
          onChangeText={(text) => setTitle(text)}
          onSubmitEditing={() => {
            createArea({ title: title })
            setTitle('')
          }}
          testID="Add area"
        />
      </View>
    </View>
  );
}

export default AreaForm;

AreaForm.propTypes = {
  createArea: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    alignItems: 'center',
    right: '0',
    flexBasis: '90%'
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
  }
});
