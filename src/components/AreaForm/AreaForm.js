import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';

function AreaForm({ createArea }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('')

  return (
    <View style={styles.container}>
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
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    bottom: 0,
    width: '100%'
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    right: 0,
    flexBasis: '90%'
  },
  input: {
    height: 24,
    paddingEnd: 8,
    width: '100%',
    textAlign: 'right',
    fontSize: 14,
    lineHeight: 1.5,
    color: 'black',
    fontStyle: 'italic',
    borderBottomColor: '#D83E1D',
    borderBottomWidth: 1,
    minWidth: 272,
    marginRight: 32
  }
});
