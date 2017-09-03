import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

export class Component {
  element: HTMLDivElement;
  constructor() {
    this.element = document.createElement('div');
    this.element.innerHTML = 'Hello webpack';
  }
  test() {
    return new Observable((ob: Observer<any>) => {
      ob.next(1600);
      ob.complete();
    });
  }
};

const comp = new Component();
document.body.appendChild(comp.element);

comp.test()
  .subscribe(
    (res: any) => setTimeout(() => comp.element.innerHTML = res.toString(), res),
    (e) => console.error(e),
    () => console.log('done')
  );
