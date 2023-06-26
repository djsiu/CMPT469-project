import React, {useState, useEffect} from "react";
import YT from 'react-youtube'
import YouTube, { YouTubePlayer }  from 'react-youtube'
import "./styles/App.css";
import "./styles/General.css";
import placeholderimage from "./media/placeholder-picture.png";
import "bootstrap/dist/css/bootstrap.min.css";

let videoElement = null;
function App() {
	
	const opts = {
	  height: "650px",
	  width: "100%",
	  playerVars: {
		autoplay: 1
	  }
	};
  
	const _onReady = (event) => {
	  videoElement = event;
	};

	function handleInput(event){
		if(event.key === 'z')
		{	
			console.log('Play')
			videoElement.target.playVideo();
		}
		else if(event.key === 'x')
		{
			videoElement.target.pauseVideo();
			console.log('Pause')
		}
	}

	return (
			<div className="video-player-background" onKeyDown={handleInput} tabIndex={0}>
				<div className="current-video">
					<YouTube videoId={"aGWQYgZZEEQ"} opts={opts} onReady={_onReady} />
					<div className="current-video-tint"/>
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
					<div className="test-current-youtube-video-tint">
						<img className="test-current-youtube-video" src={placeholderimage}/>
					</div>
					<div className="test-current-youtube-video-tint">
						<img className="test-current-youtube-video" src={placeholderimage}/>
					</div>
					<div className="test-current-youtube-video-tint">
						<img className="test-current-youtube-video" src={placeholderimage}/>
					</div>
					<div className="test-current-youtube-video-tint">
						<img className="test-current-youtube-video" src={placeholderimage}/>
					</div>
					<div className="test-current-youtube-video-tint">
						<img className="test-current-youtube-video" src={placeholderimage}/>
					</div>
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

