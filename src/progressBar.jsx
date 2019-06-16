/**
 * ProgressBar
 */
import React from 'react';
import {util} from 'video-base';

export default class ProgressBar extends React.Component{
    static defaultProps = {
        context: null
    };

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            pos: 0 // drag pos, not current pos
        };

        this.rootRef = React.createRef();
        this.dragItemRef = React.createRef();
        this.mouseDown = this._mouseDown.bind(this);

        this.seekFunc = (pos) => {
            this.props.context && this.props.context.video.seek(pos * this.props.context.duration);
        }

        this.seekFuncThrottle= util.baseUtil.throttle((pos) => {
            console.log('seekFunc:'+ pos);

            this.seekFunc(pos);
        }, 200);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps){
        // console.log('controlBar:componentWillReceiveProps:' + (nextProps.inRoot));
        
    }

    // shouldComponentUpdate(nextProps, nextState){
       
    // }

    _mouseDown(mouseDownEvent) {
        var self = this;

        function mousemoveHandler(mousemoveEvent) {
            console.log('move Dragging:'+self.isDragging);
            self.hasMoved = true;

            self._setProgressPos(self._getPosByCursor(mousemoveEvent), true);
        }

        function mouseupHandler(mouseupEvent) {
            console.log('stop Dragging');

            self.isDragging = false;
            self.hasMoved = false;
            self.setState({active:false});
            self._setProgressPos(self._getPosByCursor(mouseupEvent));

            util.domUtil.clearEvent(document, 'mousemove', mousemoveHandler)
            util.domUtil.clearEvent(document, 'mouseup', mouseupHandler);
        }

        this.isDragging = true;
        this.hasMoved = false;

        console.log('start Dragging:'+this.isDragging);

        this.setState({active:true});
        this._setProgressPos(this._getPosByCursor(mouseDownEvent), true);

        util.domUtil.addEvent(document, 'mousemove', mousemoveHandler)
        util.domUtil.addEvent(document, 'mouseup', mouseupHandler);
    }

    _getPosByCursor(event) {
        let rootNode = this.rootRef.current;

        if(!rootNode){
            return 0;
        }

        let pageScroll = util.domUtil.getPageScroll(),
            rootNodeOffset = rootNode.getBoundingClientRect(),
            cursorX = util.domUtil.getMousePos(event).x,
            rootNodeX = rootNodeOffset.left + pageScroll.x,
            rootNodeWidth = rootNode.offsetWidth;

        // console.log(`cursorX:${cursorX}, rootNodeX:${rootNodeX}`);

        if (cursorX <= rootNodeX) {
            return 0;
        } else if (cursorX >= rootNodeX + rootNodeWidth) {
            return 1;
        } else {
            return (cursorX - rootNodeX) / rootNodeWidth;
        }
    }

    _setProgressPos(pos, notSeek) {
        this.setState({pos});

        if(notSeek){
            return;
        }

        // do seek, use throttle hoc
        if(!this.hasMoved){
            this.seekFunc(pos);
        }else{
            this.seekFuncThrottle(pos);
        }
        
    }

    render() {
        let bufferdPercent = {width:0}, proressPercent = {width:0}, dragItemPos = {left:0};

        if(this.props.context){
            bufferdPercent = {'width': (this.props.context.buffered || 0) * 100 + '%'}
        }

        let rootWidth = this.rootRef.current ? this.rootRef.current.offsetWidth : 0;
        let dragItemWidth = this.dragItemRef.current ? this.dragItemRef.current.offsetWidth : 0;
        console.log('isDragging:'+this.isDragging);
        if(this.isDragging){
            console.log('render isDragging:'+this.isDragging + ', this.state.pos:'+ this.state.pos);
            proressPercent = {'width': this.state.pos * 100 + '%'};
            dragItemPos = {'left': rootWidth * this.state.pos - dragItemWidth/2 + 'px'};
        }else{
            if(this.props.context){
                if(this.props.context.duration && !isNaN(this.props.context.duration)){
                    proressPercent = {'width': this.props.context.currentTime/this.props.context.duration * 100 + '%'}
                    dragItemPos = {'left': rootWidth * this.props.context.currentTime/this.props.context.duration - dragItemWidth/2 + 'px'}
                }
            }
        }

        return <div className={`react-videoplayer-progress ${this.state.active ? 'react-videoplayer-progress-active':''}`} 
                    ref={this.rootRef} 
                    onMouseDown={this.mouseDown}>
                <div className="react-videoplayer-progress_backgroundbar"></div>
                <div className="react-videoplayer-progress_bufferbar" style={bufferdPercent}></div>
                <div className="react-videoplayer-progress_progressbar" style={proressPercent}></div>
                <div className="react-videoplayer-progress_dragitem" style={dragItemPos} ref={this.dragItemRef}></div>
            </div>
    }
}


