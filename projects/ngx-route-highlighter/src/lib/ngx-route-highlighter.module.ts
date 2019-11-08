import { NgModule } from '@angular/core';
import { RouteHighlighterDirective } from './directive/route-highlighter.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RouteHighlighterDirective],
  imports: [],
  exports: [RouteHighlighterDirective],
})
export class NgxRouteHighlighterModule {
  static forRoot(router: RouterModule) {
    return {
      ngModule: NgxRouteHighlighterModule,
      imports: [
        router,
      ]
    };
  }

}
