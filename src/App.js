import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="container-fluid bg-primary">
			<div className="row">
				<div className={'d-flex flex-column col-12 align-items-center justify-content-center vh-100'}>
					<img src={logo} className="App-logo" alt="logo"/>
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</div>
			</div>
		</div>
	);
}

export default App;
