import "./styles/App.css";
import "./styles/General.css";
import placeholderimage from "./media/placeholder-picture.png";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
			<div className="video-player-background">
				<div className="current-video">
					{/* add details for text here*/}
					<iframe className="current-youtube-video"
						src="https://www.youtube.com/embed/videoseries?list=PLUt2ZbkV3lGG_ys0_GxDOQmgLHi6-VZyY"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					></iframe>
					<div className="white-line"></div>
					<div className="white-line"></div>
					{/* add details for timer here */}
				</div>
				<div className="scenes-grid">
					{/* change these areas to be stills from the scene. not sure hwo to go about this*/}
					<img className="test-current-youtube-video" src={placeholderimage}></img>
					<img className="test-current-youtube-video" src={placeholderimage}></img>
					<img className="test-current-youtube-video" src={placeholderimage}></img>
					<img className="test-current-youtube-video" src={placeholderimage}></img>
					<img className="test-current-youtube-video" src={placeholderimage}></img>
				</div>
				<div className="bottom-content">
					<div className="white-line"> </div>
					<p className="bottom-text"> NCIC [XREF.a]</p>
					{/* add details for text here*/}
				</div>
				</div>
	);
}

export default App;
