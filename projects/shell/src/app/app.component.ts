import {
  Component,
  ViewChild,
  ViewContainerRef,
  Inject,
  Injector,
  ComponentFactoryResolver,
} from '@angular/core';
// import { AuthLibService } from 'auth-lib';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'shell';
  enableExperimental = true;

  constructor(http: HttpClient) {
    // this.service.login('Max', null);
  }
}
