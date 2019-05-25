/**
 * player
 */
import React from 'react';
import VideoBase from 'video-base';

export default class Player extends React.Component{
    static defaultProps = {
        videoData: null,
        config: null
    };

    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return <div className="react-videoplayer">
            <div className="react-videoplayer_video" ref="videowrap"></div>
        </div>;
    }
}