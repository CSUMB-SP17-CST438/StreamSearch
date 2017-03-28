import * as React from 'react';
<<<<<<< HEAD

import { Button } from './Button';

=======
>>>>>>> 585ca866c2d1657469e01e289747a5fb19610073
import { Socket } from './Socket';


export class Content extends React.Component {
<<<<<<< HEAD
    
    constructor(props) {
        super(props);
        this.state = {
            'numbers': []
        };
        
 }
    componentDidMount() {
        Socket.on('all numbers', (data) => {this.setState({'numbers': data['numbers']});});
    }
    
    render() {
       
        let numbers = this.state.numbers.map((n, index) =>
           <li key={index}>
                <img src={n.picture} />
                {n.name}: {n.number}
            </li>
        );
        
        return (
            
         <div>
            <h1>
                <div
                    className="fb-login-button"
                    data-max-rows="1"
                    data-size="large"
                    data-show-faces="false"
                    data-auto-logout-link="true">
                </div>
                <div className="g-signin2" data-theme="dark">
                </div>
            </h1>
            <h2 color = "White">Chicken Chat!</h2>
            <input type = "text" id = "message_in"></input> 
         <Button />
            <ul id = 'myUL'>{numbers}</ul>
         </div>
         
         );

    }
    
=======
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
>>>>>>> 585ca866c2d1657469e01e289747a5fb19610073
}
