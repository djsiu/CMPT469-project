import "./styles/App.css";
import "./styles/General.css";
import placeholderimage from "./media/placeholder-picture.png";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
			<div className="video-player-background">
				<div className="current-video">
					<iframe className="current-youtube-video"
						src="https://www.youtube.com/embed/videoseries?list=PLUt2ZbkV3lGG_ys0_GxDOQmgLHi6-VZyY"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					></iframe>
					<p className="upper-left-text">100.00 100.00 42.15</p>
					<p className="upper-left-text-2">47.00 100.00 74.00</p>
					<p className="upper-middle-text">1108
						{/* This will need to change to change when a different video plays*/}
						<span className="custom-middle-text"> 0673.19</span>
					</p>
					{/* This will need to change to be dyanmic and do a countdown of how much time left in video*/}
					<p className="timer-text">00:01:20 <span className="seconds-text">00</span></p>
					<div className="white-line"/>
					<div className="white-line"/>
					{/* add details for timer here */}
				</div>
				<div className="scenes-grid">
					{/* change these areas to be stills from the scene. not sure hwo to go about this*/}
					<img className="test-current-youtube-video" src={placeholderimage}/>
					<img className="test-current-youtube-video" src={placeholderimage}/>
					<img className="test-current-youtube-video" src={placeholderimage}/>
					<img className="test-current-youtube-video" src={placeholderimage}/>
					<img className="test-current-youtube-video" src={placeholderimage}/>
				</div>
				<div className="bottom-content">
					<div className="white-line"/>
					<p className="bottom-text"> NCIC [XREF.a]</p>
					<div className="bottom-rectangle"/>
					<div className="bottom-triangle"/>
				</div>
				</div>
	);
}

export default App;
