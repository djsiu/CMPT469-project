import YouTube from "react-youtube";
import "./styles/App.css";
import "./styles/General.css";
import placeholderimage from "./media/placeholder-picture.png";
import horizontalTimer from "./media/IMG_0827.PNG";
import horizontalTimerTop from "./media/IMG_0829.PNG";
import horizontalTimerTopSeconds from "./media/IMG_0830.PNG";
import ReactPlayer from "react-player";
import { React, useState, useRef } from "react";

let videoElement = null;
function App() {
	const [state, setState] = useState({
		duration: 0,
	});
	const [play, setplay] = useState(false);
	const playerRef = useRef(0);

	//used for playlist functionality
	const [playlistCount, setPlaylistCount] = useState(0);

	const videoList = [
		"https://vimeo.com/843612061?share=copy",
		"https://vimeo.com/845778300?share=copy",
		"https://vimeo.com/836902788",
		"https://vimeo.com/835443914",
	];

	const currentTime =
		Math.round(
			(playerRef && playerRef.current
				? playerRef.current.getCurrentTime()
				: "00:00") * 100
		) / 100; // rounding to 2 decimals

	const duration =
		playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";

	const timeRemaining = (
		Math.round((duration - currentTime) * 100) / 100
	).toFixed(2);

	const opts = {
		height: "650px",
		width: "100%",
		playerVars: {},
	};

	const _onReady = (event) => {
		videoElement = event;
	};

	function handleInput(event) {
		console.log(event.key);
		if (event.key === "z") {
			console.log("Play");
			setplay(true);
			//videoElement?.target?.playVideo();
		} else if (event.key === "x") {
			//videoElement?.target?.pauseVideo();
			console.log("Pause");
			setplay(false);
		} else if (event.key === "n") {
			handlePlaylist(0);
		} else if (event.key === "m") {
			handlePlaylist(1);
		}
	}

	// handle incrementing playlist
	function handlePlaylist(x) {
		console.log("count before switch: ", playlistCount);
		switch (x) {
			case 0: // backwards
				if (playlistCount <= 0) {
					setPlaylistCount(videoList.length - 1);
					console.log("Current count: ", playlistCount);
				} else {
					setPlaylistCount(playlistCount - 1);
				}
				break;
			case 1: // forwards
				if (playlistCount >= videoList.length - 1) {
					setPlaylistCount(0);
					console.log("Current count: ", playlistCount);
				} else {
					setPlaylistCount(playlistCount + 1);
				}
				break;
			default:
			// do nothing
		}
	}

	const handleDuration = (duration) => {
		setState({ ...state, duration });
	};

	// make sure the timer keeps changing with time
	const handleProgress = (changeState) => {
		setState({ ...state, ...changeState });
	};

	return (
		<div
			className="video-player-background"
			onKeyDown={handleInput}
			tabIndex={0}
		>
			<div className="current-video">
				<ReactPlayer
					className="current-youtube-video"
					url={videoList[playlistCount]}
					ref={playerRef}
					playing={play}
					loop={true}
					height="650px"
					width="100%"
					controls={false}
					progressInterval={100} // adjust this to change how often the timestamp updates
					onProgress={handleProgress}
					onReady={_onReady}
				/>

				<div className="current-video-tint" />
				<p className="upper-left-text">100.00 100.00 42.15</p>
				<p className="upper-left-text-2">47.00 100.00 74.00</p>
				<p className="upper-middle-text">
					1108
					{/* This will need to change to change when a different video plays*/}
					<span className="custom-middle-text"> 0673.19</span>
				</p>
				{/* This will need to change to be dyanmic and do a countdown of how much time left in video*/}
				<p className="timer-text">
					{timeRemaining}
					<span className="seconds-text">.00</span>
				</p>
				<div className="white-line">
					<img
						className="top-seconds-timer"
						src={horizontalTimerTopSeconds}
						alt=" "
					/>
					<img
						className="top-horizontal-timer"
						src={horizontalTimerTop}
						alt=" "
					/>
				</div>
				<div className="white-line">
					<img
						className="bottom-horizontal-timer"
						src={horizontalTimer}
						alt=" "
					/>
				</div>
			</div>
			<div className="scenes-grid">
				{/* change these areas to be stills from the scene.*/}
				<div className="test-current-youtube-video-tint">
					<img
						className="test-current-youtube-video"
						src={placeholderimage}
						alt=" "
					/>
				</div>
				<div className="test-current-youtube-video-tint">
					<img
						className="test-current-youtube-video"
						src={placeholderimage}
						alt=" "
					/>
				</div>
				<div className="test-current-youtube-video-tint">
					<img
						className="test-current-youtube-video"
						src={placeholderimage}
						alt=" "
					/>
				</div>
				<div className="test-current-youtube-video-tint">
					<img
						className="test-current-youtube-video"
						src={placeholderimage}
						alt=" "
					/>
				</div>
				<div className="test-current-youtube-video-tint">
					<img
						className="test-current-youtube-video"
						src={placeholderimage}
						alt=" "
					/>
				</div>
			</div>
			<div className="bottom-content">
				<div className="white-line" />
				<p className="bottom-text"> NCIC [XREF.a]</p>
				<div className="bottom-rectangle" />
				<div className="bottom-triangle" />
			</div>
		</div>
	);
}

export default App;
