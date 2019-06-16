/**
 * error
 */
import React from 'react';
import {constant} from 'video-base';

export default class VError extends React.Component{
    static defaultProps = {
        context: null
    };

    constructor(props){
        super(props);

        this.state = {
            
        };

    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(newProps){
        // console.log('verror:componentWillReceiveProps:' + (newProps));
    }

    show() {
        return this.props.context && this.props.context.error;
    }

    errorText() {
        if(this.props.context && this.props.context.error){
            let errorCode = this.props.context.error;
            let txt = constant.ERROR_TXT[errorCode + ''] + '[code:'+ errorCode +']';
            return txt;
        }

        return '';
    }

    render() {
        if(this.show()){
            return <div className="react-videoplayer-error">
                <div className="react-videoplayer-error_emid">
                    <div className="react-videoplayer-error_emid_eic"></div>
                    <span className="react-videoplayer-error_emid_txt">{this.errorText()}</span>
                </div>
            </div>
        }else{
            return null;
        }
    }
}