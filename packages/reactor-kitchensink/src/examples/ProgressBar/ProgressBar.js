import React, { Component } from 'react'
import { Panel, Progress } from '@extjs/ext-react';

export default class ProgressBarExample extends Component {

    constructor() {
        super();
        this.state = {
            progress: 0
        } 
    }

    componentDidMount() {
        this.updateLoop = setInterval(() => { 
            let { progress } = this.state;
            progress += 1;
            if (progress > 100) progress = 0;
            this.setState({ progress });
        }, 100)
    }

    componentWillUnmount() {
        clearInterval(this.updateLoop);
    }

    render() {
        const { progress } = this.state;

        return (
            <Panel layout="vbox" bodyPadding="20" shadow width="300">
                <Progress value={progress/100.0} text={`Loading: ${progress}%`}/>
                <div style={{marginTop: '20px'}}>Loading: {progress}%</div>
                <Progress value={progress/100.0}/>
            </Panel>
        )
    }

}