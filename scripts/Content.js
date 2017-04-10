import * as React from 'react';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';

export class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'data': '',
        };
    }
    
    componentDidMount(){
        Socket.on('update', (data) => {
            this.setState(data);
        });
    }
    
    render() {
        return(
            
            <div>
                <div>
                    Data: {this.state.data}
                </div>
            </div>
        );
    }
}
