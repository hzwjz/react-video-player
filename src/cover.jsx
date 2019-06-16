/**
 * cover
 */
import React from 'react';
import {constant, util} from 'video-base';

export default class Cover extends React.Component{
    static defaultProps = {
        context: null
    };

    constructor(props){
        super(props);

        this.state = {
            imgStyle: null,
            imgUrl: ''
        };

        this.curVideoDataId = null;

        this.clickCoverHandler = this.clickCover.bind(this);
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(newProps){
        // console.log('cover:componentWillReceiveProps:' + (newProps));
        this.checkLoadCover(newProps.context);
    }

    checkLoadCover(context) {
        if(context){
            if(context.config){
                if(context.config.autoStart || context.config.isPreload){
                    return;
                }
            }

            if(!context.videoData){
                return;
            }

            // 检查videoData是否变化
            if(!!this.curVideoDataId && this.curVideoDataId == context.videoData.id){
                return;
            }

            this.curVideoDataId = context.videoData.id;

            // 已经加载过的不用再加载
            if(context.videoData && context.videoData.posterUrl){
                util.domUtil.loadImg(context.videoData.posterUrl, null, this.cbloadCover.bind(this));
            }
        }
    }

    canShow() {
        if(this.props.context){
            if(this.props.context.config){
                if(this.props.context.config.autoStart || this.props.context.config.isPreload){
                    return false;
                }    
            }
           
            if(this.props.context.state != constant.MEDIA_STATE.IDLE){
                return false
            }

            return true;
        }else{
            return false;
        }
    }

    clickCover() {
        if(!this.props.context.video){
            return;
        }

        this.props.context.video.load();
    }

    cbloadCover(img){
        let imgw, imgh;
        let bodyw, bodyh;
        let rscale, imgscale;

        // 最好是实时更新播放器尺寸，不然播放器尺寸变化时封面图片不会变化
        bodyw = this.refs.root.offsetWidth;
        bodyh = this.refs.root.offsetHeight;

        rscale = bodyw / bodyh;
        imgscale = img.width / img.height;

        if (rscale >= imgscale) {
            imgh = bodyh;
            imgw = imgh * imgscale;
        }else{
            imgw = bodyw;
            imgh = imgw / imgscale;
        }

        this.setState({
            imgStyle : {
                width:`${imgw}px`,
                height:`${imgh}px`,
                'marginLeft':`${-imgw/2}px`,
                'marginTop':`${-imgh/2}px`
            },
            imgUrl : img.src
        });
    }

    render() {
        if(this.canShow()){
            return <div className="react-videoplayer-cover" onClick={this.clickCoverHandler} ref="root">
                <img className="react-videoplayer-cover_cimg" src={this.state.imgUrl} style={this.state.imgStyle} />
                <a className="react-videoplayer-cover_playbtnwrap">
                    <div className="react-videoplayer-cover_playbtnwrap_cbg"></div>
                    <div className="react-videoplayer-cover_playbtnwrap_playbtn"></div>
                </a>
            </div>
        }else{
            return null;
        }
    }
}