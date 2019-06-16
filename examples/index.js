/**
 * example index
 */
import React from 'react';
import ReactDom from 'react-dom';
import Player from '@/player'

let videoData = {
    posterUrl:'http://imgsize.ph.126.net/?enlarge=true&imgurl=http://img1.ph.126.net/n5VwluA3g_CDfYXsnRwsEQ==/1561904645785237081.jpg_450x250x0x95.jpg',
    lines: [
        {
            type: 'default',
            name: '默认',
            ratios: [
                {
                    quality:1,
                    format:'mp4',
                    // start:10,
                    url:'https://www.w3cschool.cn/statics/demosource/mov_bbb.mp4'
                },
                {
                    quality:2,
                    format:'mp4',
                    // start:10,
                    url: 'http://jdvodluwytr3t.vod.126.net/jdvodluwytr3t/nos/mp4/2018/08/24/1006821004_16e7c42217d6477cb0ad01360930b694_sd.mp4'
                }
            ]
        },
        {
            type: 'second',
            name: '线路2',
            ratios: [
                {
                    quality:1,
                    format:'mp4',
                    // start:10,
                    url: 'http://jdvodluwytr3t.vod.126.net/jdvodluwytr3t/nos/mp4/2018/08/24/1006821004_16e7c42217d6477cb0ad01360930b694_sd.mp4'
                }
            ]
        }
    ]
    
};

let config = {
    autoStart: 0
};

let containerStyle = {
    position: 'relative',
    height: '300px'
}

ReactDom.render(
    <div style={containerStyle}>
        <Player videoData={videoData} config={config}/>
    </div>, 
    document.getElementById('app')
);