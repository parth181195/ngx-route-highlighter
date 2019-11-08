import { Component } from '@angular/core';
import { NgxRouteHighlighterConfig } from 'ngx-route-highlighter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  ngxRouteHoghlighter = new NgxRouteHighlighterConfig();
}
