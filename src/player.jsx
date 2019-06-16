/**
 * player
 */
import React from 'react';
import VideoBase from 'video-base';
import './style/index.scss';

import Cover from './cover';
import Display from './display';
import VError from './error';
import ControlBar from './controlBar';

export default class Player extends React.Component{
    static defaultProps = {
        videoData: null,
        config: null
    };

    constructor(props){
        super(props);

        this.state = {
            // other states
            video: null,
            inRoot: true
        }

        this.rootRef = React.createRef();
        this.videoRef = React.createRef();

        this.mouseMove = this._mouseMove.bind(this);
        this.mouseLeave = this._mouseLeave.bind(this);
    }

    componentWillReceiveProps(newProps){
        // props更新后需要一些处理，todo
        // console.log('player:componentWillReceiveProps:' + (newProps));

        this.createVideoBaseIns(newProps.videoData, newProps.config);
    }

    componentDidMount() {
        this.createVideoBaseIns(this.props.videoData, this.props.config);
    }

    createVideoBaseIns(videoData, config) {
        if(this._videoBaseIns){
            this._videoBaseIns.destroy();
            this._videoBaseIns = null;
        }

        if(!videoData){
            throw new Error('no videoData!');
        }

        this._videoBaseIns = new VideoBase({
            parent: this.videoRef.current,
            root: this.rootRef.current,
            config: config,
            videoData: videoData
        });

        this.setState({
            ...this._videoBaseIns.getReactiveState(),
            video: this._videoBaseIns
        });

        this._videoBaseIns.on('event', (e) => {
            this.setState({
                ...this._videoBaseIns.getReactiveState()
            });
        });
    }

    _mouseMove() {
        if(!this.state.inRoot){
            this.setState({inRoot:true});
        }
        
    }

    _mouseLeave() {
        if(this.state.inRoot){
            this.setState({inRoot:false});
        }
    }

    render() {
        return <div className="react-videoplayer" ref={this.rootRef} onMouseMove={this.mouseMove} onMouseLeave={this.mouseLeave}>
            <div className="react-videoplayer_video" ref={this.videoRef}></div>
            <Cover context={this.state}></Cover>
            <Display context={this.state}></Display>
            <VError context={this.state}></VError>
            <ControlBar context={this.state}></ControlBar>
        </div>;
    }
}