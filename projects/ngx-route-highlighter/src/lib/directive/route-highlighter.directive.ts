
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { isArray, isUndefined, isString } from 'util';
import { NgxRouteHighlighterConfig, LinksEntity } from '../config/route-highlighter.model';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';


@Directive({
  selector: '[ngxRouteHighlighter]',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class RouteHighlighterDirective implements OnChanges, OnDestroy {
  defaultConfig: LinksEntity = {
    className: 'active',
    links: null,
    strict: false
  };

  @Input() ngxRouteHighlighter: NgxRouteHighlighterConfig = new NgxRouteHighlighterConfig(this.defaultConfig);
  @Input() activeClass = 'active';

  ngOnDestroy(): void {
    this.ngxRouteHighlighter = new NgxRouteHighlighterConfig(this.defaultConfig);
  }
  constructor(private el: ElementRef, private location: Location, private r2: Renderer2, private router: Router) {
    console.clear();
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.r2.removeClass(this.el.nativeElement, this.activeClass);
      } else if (event instanceof NavigationEnd) {
        this.setClass();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isUndefined(changes.ngxRouteHighlighter.currentValue)) {
      this.ngxRouteHighlighter = changes.ngxRouteHighlighter.currentValue;
    }
    if (this.ngxRouteHighlighter.config) {
      this.activeClass = this.ngxRouteHighlighter.config.className ? this.ngxRouteHighlighter.config.className : 'active';
    } else {
      this.activeClass = 'active';
    }
  }


  setClass() {
    if (this.linkMatcher(this.ngxRouteHighlighter.config.links, this.ngxRouteHighlighter.config.strict)) {
      this.r2.addClass(this.el.nativeElement, this.activeClass);
    }
  }

  linkMatcher(links, strict?) {
    const foundMatch = [];
    if (!strict) {
      strict = false;
    } else {
      console.warn('strict is dapricated it will not have any effect as of now and it will be removed after version 0.1.0');
    }
    if (isString(links)) {
      links = [links];
    }
    if (links) {
      links.forEach((link, index) => {
        const $r: RegExp = this.regExpGen(link);
        foundMatch.push($r.test(this.location.path()));
      });
    }
    console.log(foundMatch);
    return foundMatch.indexOf(true) !== -1;
  }
  regExpGen(link) {
    const ragexBaseString = link.replace(new RegExp(/(\/\*)/, 'gmi'), '\/[a-z0-9]+');
    return new RegExp(String.raw`(${ragexBaseString})`, 'gmi');
  }
}



