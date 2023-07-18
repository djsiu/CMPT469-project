import "./styles/App.css";
import "./styles/General.css";
import placeholderimage from "./media/placeholder-picture.png";
import horizontalTimer from "./media/IMG_0827.PNG";
import horizontalTimerTop from "./media/timer-image.PNG";
import ReactPlayer from "react-player";
import { React, useState, useRef, useEffect } from "react";
import captureVideoFrame from "capture-video-frame";
import myVid from "./movie.mp4";
import playGif from "./media/playGesture.webp";
import pauseGif from "./media/PauseGesture.png";
import swipeGif from "./media/SwipeGesture.webp";
import rotateGif from "./media/FwdBwdGesture.webp";

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
    "https://vimeo.com/845792470?share=copy",
    "https://vimeo.com/845792489?share=copy",
    "https://vimeo.com/845792480?share=copy",
    "https://vimeo.com/845792455?share=copy",
  ];

  const currentTime =
    Math.round(
      (playerRef && playerRef.current
        ? playerRef.current.getCurrentTime()
        : "00:00") * 100
    ) / 100; // rounding to 2 decimals

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";

  const timeRemainingSeconds = Math.trunc(duration - currentTime) //(Math.round(duration - currentTime)*100)/100 //* 100) /// 100
    .toString()
    .padStart(2, "0");

  const timeRemainingDecimal = Math.trunc(
    ((duration - currentTime) * 100) % 100
  )
    .toString()
    .padStart(2, "0");

  const _onReady = (event) => {
    videoElement = event;
  };

  function handleInput(event) {
    console.log(event.key);
    if (document.getElementById("popup-background").style.display === "none") {
      if (event.key === "z") {
        console.log("Play");
        setplay(true);
      } else if (event.key === "x") {
        console.log("Pause");
        setplay(false);
        document.getAnimations().forEach((animation) => {
          animation.pause();
        });
      } else if (event.key === "n") {
        handlePlaylist(0);
        restartAnimation();
      } else if (event.key === "m") {
        handlePlaylist(1);
        restartAnimation();
      }
    }

    // handle incrementing playlist
    function handlePlaylist(x) {
      switch (x) {
        case 0: // backwards
          if (playlistCount <= 0) {
            setPlaylistCount(videoList.length - 1);
          } else {
            setPlaylistCount(playlistCount - 1);
          }
          break;
        case 1: // forwards
          if (playlistCount >= videoList.length - 1) {
            setPlaylistCount(0);
          } else {
            setPlaylistCount(playlistCount + 1);
          }
          break;
        default:
        // do nothing
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
    //Time Remaining refresh
    //timer plays when video hsnt started (so instead of calling play when the video is 'play', just play when time remaining greater than 0?
    //wont work because videos are not whole numebrs
    if (playerRef.current.getCurrentTime() === 0) {
      restartAnimation();
    }
    if (playerRef.current.getCurrentTime() > 0) {
      document.getAnimations().forEach((animation) => {
        if (play === true) {
          animation.play();
        } else {
          animation.pause();
        }
      });
    }
  });

  function restartAnimation() {
    console.log("Restart Animation");
    document.getAnimations().forEach((animation) => {
      if (play === true) {
        console.log("true");
        animation.cancel();
        animation.play();
      } else {
        console.log("false");
        animation.cancel();
        animation.play();
        animation.pause();
      }
    });
  }

  function progressThroughPopup(event) {
    console.log(event.key);
    if (event.key === "z") {
      // outter box of popup needs to be clicked on
      document.getElementById("block1").style.display = "none";
      document.getElementById("block2").style.display = "block";
    } else if (event.key === "x") {
      document.getElementById("block2").style.display = "none";
      document.getElementById("block3").style.display = "block";
    } else if ((event.key === "m") | (event.key === "n")) {
      document.getElementById("block3").style.display = "none";
      document.getElementById("block4").style.display = "block";
    } else if ((event.key === "-") | (event.key === "+")) {
      document.getElementById("popup-background").style.display = "none";
    }
  }

  return (
    <div
      className="video-player-background"
      onKeyDown={handleInput}
      tabIndex={0}
    >
      <div className="popup-background" id="popup-background">
        <div
          className="popup"
          id="popup-box"
          onKeyDown={progressThroughPopup}
          tabIndex={0}
        >
          <div className="contentBox">
            <p>
              <span className="instruction-title">
                THE FOLLOWING GESTURES CAN BE USED TO CONTROL VISIONS AND FIND
                CLUES
              </span>
            </p>

            <div className="gesture-instruction-box">
              <div
                className="play-gesture-instruction"
                id="block1"
                onKeyDown={progressThroughPopup}
                tabIndex={0}
              >
                <p>
                  <span className="gesture-title">DOWNWARDS DIVE TO PLAY</span>
                </p>
                <img className="instruction-gif" src={playGif} alt=" " />
              </div>
              <div
                className="pause-gesture-instruction"
                id="block2"
                onKeyDown={progressThroughPopup}
                tabIndex={0}
              >
                <p>
                  <span className="gesture-title">3-FINGER-POINT TO PAUSE</span>
                </p>
                <img className="instruction-gif" src={pauseGif} alt=" " />
              </div>
              <div
                className="swipe-gesture-instruction"
                id="block3"
                onKeyDown={progressThroughPopup}
                tabIndex={0}
              >
                <p>
                  <span className="gesture-title">
                    SWIPE TO GO TO NEXT/PREVIOUS VISION
                  </span>
                </p>
                <img className="instruction-gif" src={swipeGif} alt=" " />
              </div>
              <div
                className="rotate-gesture-instruction"
                id="block4"
                onKeyDown={progressThroughPopup}
                tabIndex={0}
              >
                <p>
                  <span className="gesture-title">
                    ROTATE TO SKIP FORWARD/BACKWARD
                  </span>
                </p>
                <img className="instruction-gif" src={rotateGif} alt=" " />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="current-video">
        <ReactPlayer
          className="current-youtube-video"
          url={videoList[playlistCount]}
          id="testing-this"
          ref={playerRef}
          playing={play}
          loop={true}
          height="650px"
          width="100%"
          controls={false}
          progressInterval={100} // adjust this to change how often the timestamp updates
          onProgress={handleProgress}
          onReady={_onReady}
          config={{ file: { attributes: { crossorigin: "anonymous" } } }}
        />

        <div className="current-video-tint" />
        <p className="upper-left-text">100.00 100.00 42.15</p>
        <p className="upper-left-text-2">47.00 100.00 74.00</p>
        <p className="upper-middle-text">
          1108
          {/* This will need to change to change when a different video plays*/}
          <span className="custom-middle-text"> {playlistCount + 1}000 </span>
        </p>
        {/* This will need to change to be dyanmic and do a countdown of how much time left in video*/}
        <p className="timer-text">
          00:00:
          {timeRemainingSeconds}.
          <span className="seconds-text">{timeRemainingDecimal}</span>
        </p>
        <div className="white-line">
          <img className="top-seconds-timer" src={horizontalTimerTop} alt=" " />
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
        {/*}
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
				
				console.log(document.getElementById("my-vid-2"))
				console.log(playerRef.current.getInternalPlayer())
				const frame = captureVideoFrame(("my-vid-2"),"png")
				console.log('captured frame', frame)
				const img = document.getElementById('my-screenshot')
				img.setAttribute('src', frame.dataUri)
			}}>Click</button>
				*/}
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
