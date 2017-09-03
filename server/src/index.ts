import { Mega2560Uno } from './Mega2560Uno';
import {Led, Sensor, Hygrometer} from 'johnny-five';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export class BoardController {
  private _board: Mega2560Uno;

  constructor() {
    this._board = new Mega2560Uno();
    this._board.on('ready', this.boardReady.bind(this));
    this._board.on('connect', this.connected.bind(this));
    this._board.on('error', this.error.bind(this));
  }

  boardReady(event: any) {
    console.log('board is ready', event);
    // const led = new Led(4);
    // led.blink(1800);
    // led.stop(4200);
    // const moisture = new Sensor({
    //   pin: 4
    // });
    var hygrometer = new Hygrometer({
      controller: "DHT11_I2C_NANO_BACKPACK"
    });
    const dataSubscriber = Observable.fromEvent(hygrometer, 'change');
    dataSubscriber
      .subscribe(function(wtf: any) {
        console.log("Hygrometer");
        console.log("  relative humidity : ", this);
        console.log("--------------------------------------");
        debugger;
      });
    
    
  }

  connected(event: any) {
    console.log('connected', event);
  }

  error(e: Error) {
    console.error(e);
  }

  get board(){
    return this._board;
  }
}

const board = new BoardController();
console.log(board.board);