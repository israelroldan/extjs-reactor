import React, { Component } from 'react';
import { Panel, Draw, Toolbar, Button, Spacer, Label } from '@extjs/ext-react';

export default class DrawExample extends Component {
    
    componentDidMount() { 
        this.refs.draw.on({
            element: 'element',
            mousedown: this.onMouseDown,
            mousemove: this.onMouseMove,
            mouseup: this.onMouseUp,
            mouseleave: this.onMouseUp
        });
    }

    clear = () => {
        const { draw } = this.refs;
        draw.getSurface().destroy();
        draw.getSurface('overlay').destroy();
        draw.renderFrame();
    }

    onMouseDown = (e) => {
        let { draw } = this.refs, 
            surface = draw.getSurface(),
            xy, x, y;

        if (!draw.sprite) {
            xy = surface.getEventXY(e);
            x = xy[0];
            y = xy[1];

            draw.list = [x, y, x, y];
            draw.lastEventX = x;
            draw.lastEventY = y;

            draw.sprite = surface.add({
                type: 'path',
                path: ['M', draw.list[0], draw.list[1], 'L', draw.list[0] + 1e-1, draw.list[1] + 1e-1],
                lineWidth: 30 * Math.random() + 10,
                lineCap: 'round',
                lineJoin: 'round',
                strokeStyle: new Ext.util.Color(Math.random() * 127 + 128, Math.random() * 127 + 128, Math.random() * 127 + 128)
            });

            surface.renderFrame();
        }
    }

    onMouseMove = (e) => {
        let { draw } = this.refs,
            surface = draw.getSurface(),
            path, xy, x, y, dx, dy, D;

        if (draw.sprite) {
            xy = surface.getEventXY(e);
            x = xy[0];
            y = xy[1];
            dx = draw.lastEventX - x;
            dy = draw.lastEventY - y;
            D = 10;

            if (dx * dx + dy * dy < D * D) {
                draw.list.length -= 2;
                draw.list.push(x, y);
            } else {
                draw.list.length -= 2;
                draw.list.push(draw.lastEventX = x, draw.lastEventY = y);
                draw.list.push(draw.lastEventX + 1, draw.lastEventY + 1);
            }

            path = smoothList(draw.list);

            draw.sprite.setAttributes({
                path: path
            });

            if (Ext.os.is.Android) {
                Ext.draw.Animator.schedule(() => surface.renderFrame(), draw);
            } else {
                surface.renderFrame();
            }
        }
    }

    onMouseUp = (e) => {
        this.refs.draw.sprite = null;
    }

    onResize = () => {
        const { draw } = this.refs;
        const size = draw.element.getSize();
        draw.getSurface().setRect([0, 0, size.width, size.height]);
        draw.renderFrame();
    }

    render() {
        return (
            <Panel shadow layout="fit">
                <Toolbar docked="top">
                    <div style={{fontSize: Ext.os.is.Phone ? '12px' : '14px'}}>Use your {Ext.supports.Touch ? 'finger' : 'mouse'} to paint on the surface below.</div>
                    <Spacer/>
                    <Button handler={this.clear} text="Clear"/>
                </Toolbar>
                <Draw ref="draw"/>  
            </Panel>
        )
    }
}

function smoothList(points) {
    if (points.length < 3) {
        return ['M', points[0], points[1]];
    }

    var dx = [], dy = [], result = ['M'],
        i, ln = points.length;

    for (i = 0; i < ln; i += 2) {
        dx.push(points[i]);
        dy.push(points[i + 1]);
    }

    dx = Ext.draw.Draw.spline(dx);
    dy = Ext.draw.Draw.spline(dy);
    result.push(dx[0], dy[0], 'C');

    for (i = 1, ln = dx.length; i < ln; i++) {
        result.push(dx[i], dy[i]);
    }

    return result;
}