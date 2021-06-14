
import { Provider } from 'react-redux'
 import Users from './Users'
import store from '../redux/users/store'

function App() {

  return (
     <Provider store={store}>
       <Users/>
    </Provider>
  );
}

export default App;
