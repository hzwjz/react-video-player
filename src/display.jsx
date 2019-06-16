/**
 * display
 */
import React from 'react';
import {constant, util} from 'video-base';

export default class Display extends React.Component{
    static defaultProps = {
        context: null
    };

    constructor(props){
        super(props);

        this.state = {
            
        };

        this.clickDisplayHandler = this.clickDisplay.bind(this);
        this.blClickDisplayHandler = this.blClickDisplay.bind(this);
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(newProps){
        // console.log('display:componentWillReceiveProps:' + (newProps));
    }

    showLoading() {
        return this.props.context ? this.props.context.state == constant.MEDIA_STATE.BUFFERING : false;
    }

    showReplay() {
        return this.props.context ? this.props.context.state == constant.MEDIA_STATE.COMPLETE : false;
    }

    showWrap() {
        return this.showLoading() || this.showReplay();
    }

    clickDisplay() {
        if(!this.props.context){
            return;
        }

        this._isDblClick = false;

        setTimeout(() => {
            if (this._isDblClick) return;

            switch(this.props.context.state){
                case constant.MEDIA_STATE.IDLE:
                    break;
                case constant.MEDIA_STATE.COMPLETE:
                case constant.MEDIA_STATE.PAUSE:            
                    this.props.context.video && this.props.context.video.play();
                    break;
                case constant.MEDIA_STATE.PLAYING:            
                    this.props.context.video && this.props.context.video.pause();
            }

        }, 200);
    }

    blClickDisplay() {
        if(!this.context){
            return;
        }

        this._isDblClick = true;

        this.props.context.video && this.props.context.video.fullscreen();
    }

    render() {
        return <div className="react-videoplayer-display" onClick={this.clickDisplayHandler} onDoubleClick={this.blClickDisplayHandler}>
            <div className="react-videoplayer-display_bbg"></div>
            { this.showWrap() && (
                    <a className="react-videoplayer-display_statewrap">
                    <div className="react-videoplayer-display_sbg"></div>
                    {this.showLoading() && (<div className="react-videoplayer-display_buffering react-videoplayer-display_acloading-enter-active"></div>)}
                    {this.showReplay() && (<div className="react-videoplayer-display_replay">
                        <div className="react-videoplayer-display_replay_ic"></div>
                        <p className="react-videoplayer-display_replay_txt">重播</p>
                    </div>)}
                </a>
                )
            }
        </div>
    }
}