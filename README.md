# NgxRouteHighlighter

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.3.

very basic package to add classes to a package when you are on a perticular link

## Install
  ```shell
  $ npm install ngx-route-highlight --save
  ```
## Usage
  1. add directive name to desired components   
      ```
      <li [ngxRouteHighlighter]=''></li>
      ```
  2. craete config in ts file
      ```
      ngxRouteHighlighterConfig  = new NgxRouteHighlighterConfig();
      ```
  3. add links as array
      ```
      <li [ngxRouteHighlighter]='ngxRouteHighlighterConfig.getNormalConfig(["/link-1","/link-2","/link-3"])'></li>
      ```

you can use `*` charector to accept any wild card characters in links
ie.
if you want to match link  
```
category/78965421/product/878564
```
you can pass
```
category/*/product/*
```

it will match link in example.

---

## Build

Run `ng build ngx-route-highlighter` to build the project. The build artifacts will be stored in the `dist/` directory.
