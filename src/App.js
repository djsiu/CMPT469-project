import "./styles/App.css";
import "./styles/General.css";
import horizontalTimer from "./media/IMG_0827.PNG";
import horizontalTimerTop from "./media/timer-image.PNG";
import ReactPlayer from "react-player";
import { React, useState, useRef, useEffect } from "react";
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
  const [skippingForward, setSkippingForward] = useState(false);
  const [skippingBackward, setSkippingBackward] = useState(false);
  const [timeSkipForward, setTimeSkipForward] = useState(0);
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
  var timeToStart
  function handleInput(event) {
    console.log(event.key);
    console.log('the value is outside' + document.getElementById("popup-background").style.display);
     if (document.getElementById("popup-background").style.display === "none") {
      console.log('the value is inside' + document.getElementById("popup-background").style.display);
    //   setSkippingBackward(false);
    //   setSkippingForward(false);
      if (event.key === "z") {
        console.log("Play");
        setplay(true);
      } else if (event.key === "x") {
        console.log("Pause");
        setplay(false);
      } else if (event.key === "n") {
        handlePlaylist(0);
        restartAnimation();
      } else if (event.key === "m") {
        handlePlaylist(1);
        restartAnimation();
      }
      else if (event.key === "-"){
        console.log('backward');
        timeToStart = Math.round(
                    (playerRef && playerRef.current
                    ? playerRef.current.getCurrentTime()
                    : "00:00") * 100
                ) / 100
        playerRef?.current.seekTo(timeToStart - 1 >= 0 ? timeToStart - 1 : 0  , 'seconds');
    } else if (event.key === "+"){
        console.log('forward');
        timeToStart = Math.round(
            (playerRef && playerRef.current
            ? playerRef.current.getCurrentTime()
            : "00:00") * 100
        ) / 100
        playerRef?.current.seekTo(timeToStart + 1 <= duration ? timeToStart + 1 : duration , 'seconds');
	}
	// else if (event.key === "m"){
	// 	if (i + 1 >= listSize)
	// 		i = 0
	// 	else 
	// 		i += 1
	// 	setVideoLink(videoLinks[i]);
	// } else if (event.key === "n"){
	// 	if (i - 1 < 0)
	// 		i = listSize - 1
	// 	else 
	// 		i -= 1
	// 	setVideoLink(videoLinks[i]);
	// } 
	else if ( Number(event.key) < 10 ) {
     if(document.getElementById("popup-background").style.display = "none"){
       setTimeSkipForward(Number(event.key));
       document.getAnimations().forEach((animation) => {
        animation.cancel();
        document.getElementById('animated-timer').style.animationDelay= '-'+ event.key +'s';
        if(play){
          animation.play();
        } else {
          animation.play();
          animation.pause();
        }
       })
     }
    var skipToTime = Number(event.key) != 0 ? (duration * Number(event.key))/9 : 0
        playerRef.current.seekTo(skipToTime, 'seconds');
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
		updateScenePhotos();
    if (playerRef.current.getCurrentTime() === 0) {
      restartAnimation();
    }
    if (playerRef.current.getCurrentTime() > 0) {
      document.getAnimations().forEach((animation) => {
        console.log(timeSkipForward);
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
        document.getElementById('animated-timer').style.animationDelay= '0s';
        animation.play();
      } else {
        console.log("false");
        animation.cancel();
        document.getElementById('animated-timer').style.animationDelay= '0s';
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
      document.getElementById("block3").style.display = "none";
      document.getElementById("block4").style.display = "none";
    } else if (event.key === "x") {
      document.getElementById("block1").style.display = "none";
      document.getElementById("block2").style.display = "none";
      document.getElementById("block3").style.display = "block";
      document.getElementById("block4").style.display = "none";
    } else if ((event.key === "m") | (event.key === "n")) {
      document.getElementById("block1").style.display = "none";
      document.getElementById("block2").style.display = "none";
      document.getElementById("block3").style.display = "none";
      document.getElementById("block4").style.display = "block";
    } else if (Number(event.key) < 10) {
      event.key = 'none';
      document.getElementById("popup-background").style.display = "none";
    }
  }

	function updateScenePhotos(){
		let elements = document.getElementsByClassName("test-current-youtube-video");
			Array.from(elements).forEach((element) => {
				console.log("/video" + ((playlistCount + 1).toString()) + "/" + ((playlistCount + 1).toString()) + "vid"  + Math.trunc(currentTime) + ".png");
        console.log('this is the current time' + Math.trunc(currentTime));
        if (isNaN(Math.trunc(currentTime))) {
				  element.src= ("/video" + ((playlistCount + 1).toString()) + "/" + ((playlistCount + 1).toString()) + "vid0.png").toString();
        } else {
          element.src= ("/video" + ((playlistCount + 1).toString()) + "/" + ((playlistCount + 1).toString()) + "vid"  + Math.trunc(currentTime) + ".png").toString();
        }
			})
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
						<div className="white-box-top"/>
						<div className="white-box-bottom"/>
            <p>
              <span className="instruction-title">
                THE FOLLOWING GESTURES CAN BE USED TO CONTROL VISIONS AND FIND
                CLUES
              </span>
            </p>

            <div className="gesture-instruction-box">
							<div className="white-box-inner-top"/>
							<div className="white-box-inner-bottom"/>
              <div
                className="play-gesture-instruction"
                id="block1"
                onKeyDown={progressThroughPopup}
                tabIndex={0}
              >
                <p>
                  <span className="gesture-title">DOWNWARDS DIVE TO PLAY</span>
                </p>
								<div className="instruction-gif-tint"/>
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
								<div className="instruction-gif-tint"/>
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
								<div className="instruction-gif-tint"/>
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
								<div className="instruction-gif-tint"/>
                <img className="instruction-gif" src={rotateGif} alt=" " />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="current-video">
        <ReactPlayer
          className="current-youtube-video"
          url= {videoList[playlistCount]}
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
          <img className="top-seconds-timer" id="animated-timer" src={horizontalTimerTop} alt=" " />
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
        <div className="current-small-video-tint">
          <img
            className="test-current-youtube-video"
						src={'/video1/1vid0.png'}
            alt=" "
          />
        </div>
        <div className="current-small-video-tint">
          <img
            className="test-current-youtube-video"
            src={'/video1/1vid0.png'}
            alt=" "
          />
        </div>
        <div className="current-small-video-tint">
          <img
            className="test-current-youtube-video"
            src={'/video1/1vid0.png'}
            alt=" "
          />
        </div>
        <div className="current-small-video-tint">
          <img
            className="test-current-youtube-video"
            src={'/video1/1vid0.png'}
            alt=" "
          />
        </div>
        <div className="current-small-video-tint">
          <img
            className="test-current-youtube-video"
            src={'/video1/1vid0.png'}
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

