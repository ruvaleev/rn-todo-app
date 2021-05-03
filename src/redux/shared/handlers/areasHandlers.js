import uuid from 'uuid-random';
import qs from 'qs';
import { defaultAreas } from '../../../tests/shared/AreasReducerGenerator';

const areasHandlers = function(mock) {
  mock.onGet('/areas').reply(200, {
    areas: defaultAreas,
  });
  mock.onPost('/areas').reply(function(config) {
    const { title } = qs.parse(config.data).area;
    
    return [
      200, {
        area: {
          id: uuid(),
          title,
          created_at: new Date(),
          todos: [],
        }
      }
    ]
  });
  mock.onDelete(/\/areas\/((\w|-)+$)/).reply(200);
  mock.onPost('/todos').reply(function(config) {
    const { todo } = qs.parse(config.data);
    
    return [
      200, {
        todo: {
          id: uuid(),
          title: todo.title,
          completed: false,
          created_at: new Date(),
        },
      }
    ]
  });
  mock.onPatch(/\/todos\/((\w|-)+$)/).reply(200);
  mock.onDelete(/\/todos\/((\w|-)+$)/).reply(200);
}

export default areasHandlers;
