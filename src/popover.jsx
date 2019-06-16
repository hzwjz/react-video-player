/**
 * popover
 */
import React from 'react';
// import {util} from 'video-base';

export default class Popover extends React.Component{
    static defaultProps = {
        list: null,
        selected: null, 
        selectkey: 'id',
        selectname: 'name',
        selectCallback: null,
        className: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            showList: false
        };
        
        this.btnMouseEnter = this._btnMouseEnter.bind(this);
        this.btnMouseLeave = this._btnMouseLeave.bind(this);
        this.listMouseEnter = this._listMouseEnter.bind(this);
        this.listMouseLeave = this._listMouseLeave.bind(this);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps){
        // console.log('controlBar:componentWillReceiveProps:' + (nextProps.inRoot));
        
    }

    // shouldComponentUpdate(nextProps, nextState){
       
    // }

    clickItem(item) {
        if(item[this.props.selectkey] === this.props.select){
            return;
        }

        this.props.selectCallback && this.props.selectCallback(item);
    }

    _btnMouseEnter() {
        if(this.delayHideTimer){
            clearTimeout(this.delayHideTimer);
            this.delayHideTimer = null;
        }

        this.setState({showList:true});
    }

    _btnMouseLeave() {
        this.delayHideTimer = setTimeout(() => {
            this.setState({showList:false});
        }, 100);
    }

    _listMouseEnter() {
        this._btnMouseEnter();
    }

    _listMouseLeave() {
        this._btnMouseLeave();
    }

    render() {
        if(!this.props.list || this.props.list.length <= 1){
            return this.props.children;
        }

        let listItems = this.props.list.map((item) => {
            let selected = item[this.props.selectkey] === this.props.selected;
            return  <li key={item[this.props.selectkey]} className={`react-videoplayer-popover_list_li ${selected ? 'z-sel' : ''}`} onClick={this.clickItem.bind(this, item)}>{item[this.props.selectname]}</li>;
        });

        return <div className={`react-videoplayer-popover ${this.props.className}`}>
                <div className={`react-videoplayer-popover_list ${this.state.showList ? 'z-show':''}`} onMouseEnter={this.listMouseEnter} onMouseLeave={this.listMouseLeave}>
                    <ul className="react-videoplayer-popover_list_ul">
                        {listItems}
                    </ul>
                </div>
                <div className="react-videoplayer-popover_btn" onMouseEnter={this.btnMouseEnter} onMouseLeave={this.btnMouseLeave}>
                    {this.props.children}
                </div>
            </div>;
    }
}


