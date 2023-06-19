import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					<div class="embed-responsive embed-responsive-16by9">
						<iframe
							width="560"
							height="315"
							src="https://www.youtube.com/embed/videoseries?list=PLUt2ZbkV3lGG_ys0_GxDOQmgLHi6-VZyY"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						></iframe>
					</div>
				</a>
			</header>
		</div>
	);
}

export default App;
