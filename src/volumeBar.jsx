/**
 * VolumeBar
 */
import React from 'react';
import {util} from 'video-base';

export default class VolumeBar extends React.Component{
    static defaultProps = {
        context: null
    };

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            volume: 0 // drag pos, not current pos
        };

        this.barRef = React.createRef();
        this.dragItemRef = React.createRef();
        this.mouseDown = this._mouseDown.bind(this);
        this.clickVolume = this._clickVolume.bind(this);
        
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps){
        // console.log('controlBar:componentWillReceiveProps:' + (nextProps.inRoot));
        
    }

    // shouldComponentUpdate(nextProps, nextState){
       
    // }

    _clickVolume() {
        if(this.props.context && this.props.context.mute !== undefined){
            this.props.context.video.mute(!this.props.context.mute);
        }
    }

    _mouseDown(mouseDownEvent) {
        var self = this;

        function mousemoveHandler(mousemoveEvent) {
            console.log('volume move Dragging:'+self.isDragging);
            self._setProgressPos(self._getPosByCursor(mousemoveEvent));
        }

        function mouseupHandler(mouseupEvent) {
            console.log('volume stop Dragging');
            // this.isDragging = false;
            self._setProgressPos(self._getPosByCursor(mouseupEvent));

            util.domUtil.clearEvent(document, 'mousemove', mousemoveHandler)
            util.domUtil.clearEvent(document, 'mouseup', mouseupHandler);
        }

        // this.isDragging = true;
        console.log('volume start Dragging:'+this.isDragging);

        this._setProgressPos(this._getPosByCursor(mouseDownEvent));

        util.domUtil.addEvent(document, 'mousemove', mousemoveHandler)
        util.domUtil.addEvent(document, 'mouseup', mouseupHandler);
    }

    _getPosByCursor(event) {
        let rootNode = this.barRef.current;

        if(!rootNode){
            return 0;
        }

        let pageScroll = util.domUtil.getPageScroll(),
            rootNodeOffset = rootNode.getBoundingClientRect(),
            cursorX = util.domUtil.getMousePos(event).x,
            rootNodeX = rootNodeOffset.left + pageScroll.x,
            rootNodeWidth = rootNode.offsetWidth;

        if (cursorX <= rootNodeX) {
            return 0;
        } else if (cursorX >= rootNodeX + rootNodeWidth) {
            return 1;
        } else {
            return (cursorX - rootNodeX) / rootNodeWidth;
        }
    }

    _setProgressPos(volume) {
        this.setState({volume});
        
        this.props.context && this.props.context.video.volume(volume);
    }

    render() {

        let barWidth = this.barRef.current ? this.barRef.current.offsetWidth : 0;
        let dragItemWidth = this.dragItemRef.current ? this.dragItemRef.current.offsetWidth : 0;
        let muted = true;

        let proressPercent = {width:0}, dragItemPos = {left:-dragItemWidth/2 + 'px'};
            
        if(this.props.context){
            console.log('this.props.context.volume:'+this.props.context.volume);
            muted = this.props.context.mute;

            if(!muted){
                if(this.props.context.volume !== undefined && !isNaN(this.props.context.volume)){
                    proressPercent = {'width': this.props.context.volume * 100 + '%'}
                    dragItemPos = {'left': barWidth * this.props.context.volume - dragItemWidth/2 + 'px'}
                }
            }     
        }

        return <div className="react-videoplayer-volumebar">
                <div className={`react-videoplayer-volumebar_icon ${muted ? 'z-close':''}`} onClick={this.clickVolume}>
                    <i className="react-videoplayer_icon icon-volume"></i>
                </div>
                <div className="react-videoplayer-volumebar_bar" ref={this.barRef} onMouseDown={this.mouseDown}>
                    <div className="react-videoplayer-volumebar_bar_backgroundbar"></div>
                    <div className="react-videoplayer-volumebar_bar_progressbar" style={proressPercent}></div>
                    <div className="react-videoplayer-volumebar_bar_dragitem" style={dragItemPos} ref={this.dragItemRef}></div>
                </div>
            </div>
    }
}


