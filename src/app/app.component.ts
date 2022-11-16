import { Component } from '@angular/core';
import { NgcCookieConsentService, NgcInitializingEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-samples';

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription = new Subscription;
  private popupCloseSubscription: Subscription = new Subscription;
  private initializingSubscription: Subscription = new Subscription;
  private statusChangeSubscription: Subscription = new Subscription;
  private revokeChoiceSubscription: Subscription = new Subscription;
  private noCookieLawSubscription: Subscription = new Subscription;

  constructor(
    private ccService: NgcCookieConsentService,
    // private routerExtService: RouterExtService
  ) {
    // console.log(this.routerExtService.getCurrentUrl());
    // console.log(this.routerExtService.currentUrl);
  }

  handleClickSound() {
    let x = <HTMLVideoElement>document.getElementById("myAudio");
    x.play();
  }
  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
    });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
    });

    this.initializingSubscription = this.ccService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}
