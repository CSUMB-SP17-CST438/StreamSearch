import * as React from 'react';
import { Socket } from './Socket';


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
                <h1> Hello from React!</h1>
                <div>
                    Data: {this.state.data}
                </div>
            </div>
        );
        //let my_animals = ['bumble bee', 'goat', 'llama'];
        //return <MyFavoriteAnimalList animal={my_animals} />;
    }
}
