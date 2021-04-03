import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

// import { rootPath } from 'helpers/routes';
// import AreasCard from '../AreasCard';
// import Menu from '../Menu';
// import DemoModeMessage from '../shared/DemoModeMessage';
import { Button, Text, View } from 'react-native';

function Planner({ navigation, isAuthenticated }) {
  // const history = useHistory();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     history.push(rootPath());
  //   }
  // }, [!isAuthenticated]);

  return (
    // <>
    //   <Menu />
    //   <AreasCard />
    //   <DemoModeMessage />
    // </>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home page</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default Planner;

// Planner.propTypes = {
//   isAuthenticated: PropTypes.bool.isRequired,
// };
