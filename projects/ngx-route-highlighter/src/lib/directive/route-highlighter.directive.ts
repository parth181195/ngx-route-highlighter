
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
    // console.log(this.linkMatcher(this.ngxRouteHighlighter.config.links, this.ngxRouteHighlighter.config.strict))
    if (this.linkMatcher(this.ngxRouteHighlighter.config.links, this.ngxRouteHighlighter.config.strict)) {
      this.r2.addClass(this.el.nativeElement, this.activeClass);
    }
  }

  linkMatcher(links, strict?) {
    let foundMatch = false;
    let temp = {};

    if (!strict) {
      strict = false;
    }
    if (isString(links)) {
      links = [links];
    }
    if (links) {
      links.forEach(link => {
        console.log(`${this.location.path()} is in ${links} => ${this.location.path().includes(link) === link}`)
        if (strict) {
          if (this.location.path() === link) {
            foundMatch = true;
            temp[link] = foundMatch;
          }
        } else {
          if (this.location.path().includes(link)) {
            foundMatch = true;
          }
          // (\/test-2)?(\/trst)?
        }
        temp[link] = foundMatch;
      });
    }
    console.log(temp)
    return foundMatch;
  }
}



