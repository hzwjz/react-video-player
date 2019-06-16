/**
 * ProgressBar
 */
import React from 'react';
// import {util, constant} from 'video-base';

export default class ProgressBar extends React.Component{
    static defaultProps = {
        context: null
    };

    constructor(props) {
        super(props);

        this.state = {

        };

        this.rootRef = React.createRef();
        this.dragItemRef = React.createRef();
    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps){
        // console.log('controlBar:componentWillReceiveProps:' + (newProps.inRoot));
    }

    render() {
        let bufferdPercent = {width:0}, proressPercent = {width:0}, dragItemPos = {left:0};

        if(this.props.context){
            bufferdPercent = {'width': (this.props.context.buffered || 0) * 100 + '%'}

            if(this.props.context.duration && !isNaN(this.props.context.duration)){
                proressPercent = {'width': this.props.context.currentTime/this.props.context.duration * 100 + '%'}

                let rootWidth = this.rootRef.current ? this.rootRef.current.offsetWidth : 0;
                let dragItemWidth = this.dragItemRef.current ? this.dragItemRef.current.offsetWidth : 0;

                // console.log('rootWidth:' + rootWidth + ', dragItemWidth:'+ dragItemWidth);
                dragItemPos = {'left': rootWidth * this.props.context.currentTime/this.props.context.duration - dragItemWidth/2 + 'px'}
            }
        }

        return <div className="react-videoplayer_progress" ref={this.rootRef}>
                <div className="react-videoplayer_progress_backgroundbar"></div>
                <div className="react-videoplayer_progress_bufferbar" style={bufferdPercent}></div>
                <div className="react-videoplayer_progress_progressbar" style={proressPercent}></div>
                <div className="react-videoplayer_progress_dragitem" style={dragItemPos} ref={this.dragItemRef}></div>
            </div>
    }
}


