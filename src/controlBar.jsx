/**
 * controlbar
 */
import React from 'react';
import ProgressBar from './progressBar';
import {util, constant} from 'video-base';

export default class ContrlBar extends React.Component{
    static defaultProps = {
        context: null
    };

    constructor(props) {
        super(props);

        this.state = {

        };

        this.clickPlay = this._clickPlay.bind(this);
        this.clickPause = this._clickPause.bind(this);
        this.clickFullscreen = this._clickFullscreen.bind(this);
        this.clickCancelFullscreen = this._clickCancelFullscreen.bind(this);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps){
        // console.log('controlBar:componentWillReceiveProps:' + (newProps.inRoot));
    }

    _clickPlay() {
        this.props.context && this.props.context.video.play();
    }

    _clickPause() {
        this.props.context && this.props.context.video.pause();
    }

    _clickFullscreen() {
        this.props.context && this.props.context.video.fullscreen();
    }

    _clickCancelFullscreen() {
        this.props.context && this.props.context.video.existFullscreen();
    }
    
    render(){
        let isPause = false, 
            isPlaying = false, 
            isFullscreen = false,
            canChangeQuality = false,
            showBar = true,
            currentTime = '', duration = '', lineName = '', qualityName = '';
        if(this.props.context){
            isPause = this.props.context.state ? this.props.context.state == constant.MEDIA_STATE.PAUSE : false;
            isPlaying = this.props.context.state ? this.props.context.state == constant.MEDIA_STATE.PLAYING : false;

            currentTime = this.props.context.currentTime ? util.formatUtil.formatVideoTime(this.props.context.currentTime) : '00:00';
            duration = this.props.context.duration ? util.formatUtil.formatVideoTime(this.props.context.duration) : '00:00';
            lineName = this.props.context.lineName ? this.props.context.lineName : '默认';
            qualityName = this.props.context.qualityName ? this.props.context.qualityName : '标清';

            isFullscreen = this.props.context.fullscreen !== undefined ? this.props.context.fullscreen : false;        
            canChangeQuality = this.props.context.qualityCount ? this.props.context.qualityCount > 1 : false;
        
            showBar = this.props.context.inRoot;
        }

        return <div className={`react-videoplayer-ctrbar ${showBar ? 'z-show' :''}`}>
                {isPause && (<a className="react-videoplayer-ctrbar_bigplaybtn" onClick={this.clickPlay}>
                    <i className="react-videoplayer_icon icon-big_play_btn"></i>
                </a>)}
            
                <div className="react-videoplayer-ctrbar_pbw">
                    <ProgressBar context={this.props.context}></ProgressBar>
                </div>
            
                <div className="react-videoplayer-ctrbar_bar f-cb">
                    <div className="react-videoplayer-ctrbar_bar-left">
                        {isPlaying ? 
                            (<div className="react-videoplayer-ctrbar_bar_btn react-videoplayer-ctrbar_bar_pausebtn" onClick={this.clickPause}>
                                <i className="react-videoplayer_icon icon-pause"></i>
                            </div>) : 
                            (<div className="react-videoplayer-ctrbar_bar_btn react-videoplayer-ctrbar_bar_playbtn" onClick={this.clickPlay}>
                                <i className="react-videoplayer_icon icon-play"></i>
                            </div>)
                        }
            
                        <span className="react-videoplayer-ctrbar_bar_currenttime">{currentTime}</span>
                        <span className="react-videoplayer-ctrbar_bar_seperator">/</span>
                        <span className="react-videoplayer-ctrbar_bar_duration">{duration}</span>
                    </div>
                    <div className="react-videoplayer-ctrbar_bar-right">
                        <div className="react-videoplayer-ctrbar_bar_btn react-videoplayer-ctrbar_bar_volumebtn">
                            <i className="react-videoplayer_icon icon-volume"></i>
                            {/* <div className="m-popover m-popover-volume j-popover-volume"></div> */}
                        </div>
                        
                        {lineName && (<div className="react-videoplayer-ctrbar_bar_btn react-videoplayer-ctrbar_bar_linebtn">
                            <span>{lineName}</span>
                        </div>)}
            
                        <div className={`react-videoplayer-ctrbar_bar_btn react-videoplayer-ctrbar_bar_qualitybtn ${!canChangeQuality ? 'z-dis': ''}`}>
                            <span>{qualityName}</span>
                        </div>
            
                        {isFullscreen ? 
                            (<div className="react-videoplayer-ctrbar_bar_btn react-videoplayer-ctrbar_bar_notfullscreen" onClick={this.clickCancelFullscreen}>
                                <i className="react-videoplayer_icon icon-notfullscreen"></i>
                            </div>) :
                            (<div className="react-videoplayer-ctrbar_bar_btn react-videoplayer-ctrbar_bar_fullscreen" onClick={this.clickFullscreen}>
                                <i className="react-videoplayer_icon icon-fullscreen"></i>
                            </div>)
                        }
                    </div>
                </div>
            </div>;
    }
}