import * as React from 'react';

import { Button } from './Button';
import { Socket } from './Socket';

export class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'numbers': []
        };
    }

    componentDidMount() {
        Socket.on('all numbers', (data) => {
            this.setState({
                'numbers': data['numbers']
            });
        })
    }

    render() {
        let numbers = this.state.numbers.map(
            (n, index) => <li key={index}>{n}</li>
        );
        return (
            <div>
                <h1>Random numbers so far!</h1>
                <ul>{numbers}</ul>
                <Button />
            </div>
        );
    }
}
