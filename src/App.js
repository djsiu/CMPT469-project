
import "./styles/App.css";
import "./styles/General.css";
import placeholderimage from "./media/placeholder-picture.png";
import horizontalTimer from "./media/IMG_0827.PNG";
import horizontalTimerTop from "./media/timer-image.PNG";
import ReactPlayer from "react-player";
import { React, useState, useRef, useEffect} from "react";
import captureVideoFrame from 'capture-video-frame';
import myVid from './movie.mp4';

let videoElement = null;
function App() {
	const [state, setState] = useState({
		duration: 0,
	});
	const [play, setplay] = useState(false)
	const playerRef = useRef(0);

	const currentTime =
		Math.round(
			(playerRef && playerRef.current
				? playerRef.current.getCurrentTime()
				: "00:00") * 100
		) / 100; // rounding to 2 decimals

	const duration =
		playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";

	const timeRemainingSeconds = (
		(Math.trunc(duration - currentTime)) //(Math.round(duration - currentTime)*100)/100 //* 100) /// 100
	).toString().padStart(2, '0');

	const timeRemainingDecimal = (
		Math.trunc(((duration - currentTime) * 100)%100) 
	).toString().padStart(2, '0');

	const _onReady = (event) => {
		videoElement = event;
	};

	function handleInput(event) {
		console.log(event.key);
		if(document.getElementById('popup-background').style.display === 'none'){
		if (event.key === "z") {
			console.log("Play");
			setplay(true)
			document.getAnimations().forEach((animation) =>{
				animation.play();
			})
			//videoElement?.target?.playVideo();
		} else if (event.key === "x") {
			//videoElement?.target?.pauseVideo();
			console.log("Pause");
			setplay(false)
			document.getAnimations().forEach((animation) =>{
				animation.pause();
			})
		}
	}
	}

	const handleDuration = (duration) => {
		setState({ ...state, duration });
	};

	// make sure the timer keeps changing with time
	const handleProgress = (changeState) => {
		setState({ ...state, ...changeState });
	};

	useEffect(() => {
		if(playerRef.current.getCurrentTime() === 0)
		{
			console.log('Restart Animation');
			document.getAnimations().forEach((animation) => {
				animation.cancel();
				animation.play();
			})
		}
	});

	function testingFunc(event) {
		console.log(event.key);
		console.log('got here');
		if (event.key === "z") {
			console.log('here');
			//popup needs to be clicked on 
			document.getElementById('block1').style.display = 'block';
			console.log('here2');
		} else if(event.key === 'x') {
			console.log('almost done');
			document.getElementById('popup-background').style.display = 'none';
		}
	}

	console.log(document.getElementById("my-video"));
	return (
		<div
			className="video-player-background"
			onKeyDown={handleInput}
			tabIndex={0}
		>
			<div className="popup-background" id="popup-background">
			<div className="popup" id="popup-box" onKeyDown={testingFunc} tabIndex={0}>
				<div className="contentBox">
					<div className="play-gesture-instruction">
						HELLO
					</div>
					<div className="pause-gesture-instruction" id='block1' onKeyDown={testingFunc} tabIndex={0}>
						HOW ARE YOU!
					</div>
				</div>
			</div>
			</div>
			<div className="current-video">
				<ReactPlayer
					className="current-youtube-video"
					url="https://vimeo.com/843612061?share=copy"
					id="testing-this"
					ref={playerRef}
					playing={play}
					loop={true}
					height='650px'
					width='100%'
					controls={false}
					progressInterval={100} // adjust this to change how often the timestamp updates
					onProgress={handleProgress}
					onReady={_onReady}
					config={{file: {attributes: { crossorigin: 'anonymous'}}}}
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
					00:00:
					{timeRemainingSeconds}
					.
					<span className="seconds-text">{timeRemainingDecimal}</span>
				</p>
				<div className="white-line">
					<img
						className="top-seconds-timer"
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
				<video id="my-video" width="320" height="200" controls>
  				<source src={myVid} type="video/mp4" />
				</video>
				<iframe className='video'
				id="my-vid-2"
        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
        src={`https://www.youtube.com/embed/gL6iSCSHjco?controls=0`}>
			</iframe>
				<img width="320px" height="200px" id='my-screenshot'></img>
				<button onClick={() => {
					/*const frame = captureVideoFrame("testing-this", "png")
				const img = document.getElementById('my-screenshot')
				console.log('captured frame', frame)
				//img.setAttribute('src', frame.dataUri)
				*/
				console.log(document.getElementById("my-vid-2"))
				console.log(playerRef.current.getInternalPlayer())
				const frame = captureVideoFrame(("my-vid-2"),"png")
				console.log('captured frame', frame)
				const img = document.getElementById('my-screenshot')
				img.setAttribute('src', frame.dataUri)
			}}>Click</button>
			<button onClick={() => {
				//This seems to work, might have to do function instead of onClick that times out? might be hard
				document.getElementById('popup-box').style.display = "none";
			}}>Click ME!!!</button>

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
