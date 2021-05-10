import AreasReducerGenerator from './AreasReducerGenerator';
import AuthenticationsReducerGenerator from './AuthenticationsReducerGenerator';
import MenusReducerGenerator from './MenusReducerGenerator';

function Store(props = {}) {
  return (
    {
      areasReducer: props.areasReducer || AreasReducerGenerator({}),
      authenticationsReducer: props.authenticationsReducer || AuthenticationsReducerGenerator({}),
      menusReducer: props.menusReducer || MenusReducerGenerator({}),
    }
  );
}

export default Store;
