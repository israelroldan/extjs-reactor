import React, { Component } from 'react'
import { Panel, Video } from '@extjs/reactor/modern';

export default function VideoExample() {
    return (
        <Panel shadow={true} layout="fit">
            <Video 
                loop={true} 
                url={['resources/video/BigBuck.m4v', 'resources/video/BigBuck.webm']}
                posterUrl="resources/images/cover.jpg"
            />
        </Panel>
    );
}