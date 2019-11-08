

export class NgxRouteHighlighterConfig {

  constructor(public config?: LinksEntity) {
  }

  getNormalConfig(url, className?) {
    this.config = {
      className: className ? className : 'active',
      links: url,
      strict: false
    };
    return new NgxRouteHighlighterConfig(this.config);
  }

  getStrictConfig(url, className?) {
    this.config = {
      className: className ? className : 'active',
      links: url,
      strict: true
    };
    return new NgxRouteHighlighterConfig(this.config);
  }
}

export interface LinksEntity {
  links: string[] | null;
  className: string;
  strict?: boolean;
}
