import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Content } from './Content';
<<<<<<< HEAD

ReactDOM.render(<Content />, document.getElementById('content'));
=======
import {socket } from './Socket';

ReactDOM.render(<Content />, document.getElementById('content'));

Socket.on('connect', function(){
    console.log('Connecting to the server!');
})
>>>>>>> 585ca866c2d1657469e01e289747a5fb19610073
