//root component
//supply content to index.js
//component
//functional component
//import { Login } from './Auth/Login/Login.component'
//import { Register } from './Auth/Register/Register.component';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom';
import { AppRouting } from './AppRouting';

/*const mount = () => {
    ReactDOM.render(<Register />, document.getElementById('test'))
}
const unMount = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('test'))
}  */


const App = (args) => {
    console.log('incoming data >>', args);
    //functional component must have return block
    return (
        <div>

            <p>Test</p>
        
            {/* <Header isLoggedIn={false}></Header>
            <Login/>
          <Register /> 
              <div id="test"></div>
            <button onClick={mount}>mount</button>
            <button onClick={unMount}>unmount</button>   */}

            <AppRouting></AppRouting>
            <ToastContainer />

        </div>
    )
}
export default App;