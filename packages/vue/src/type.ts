export interface Vue {
  readonly $el: Element;
  readonly $parent: Vue;
  readonly $root: Vue;
}

export interface VNodeDirective {
  name: string;
  value?: any;
  oldValue?: any;
  expression?: string;
  arg?: string;
  oldArg?: string;
  modifiers?: { [key: string]: boolean };
}

export interface DirectiveBinding extends Readonly<VNodeDirective> {
  readonly modifiers: { [key: string]: boolean };
}

export interface VueConfiguration {
  silent: boolean;
  optionMergeStrategies: any;
  devtools: boolean;
  productionTip: boolean;
  performance: boolean;
  errorHandler(err: Error, vm: Vue, info: string): void;
  warnHandler(msg: string, vm: Vue, trace: string): void;
  ignoredElements: (string | RegExp)[];
  keyCodes: { [key: string]: number | number[] };
  async: boolean;
}

export type DirectiveFunction = (
  el: HTMLElement,
  binding: DirectiveBinding,
  vnode: any,
  oldVnode: any,
) => void;

export interface DirectiveOptions {
  bind?: DirectiveFunction;
  inserted?: DirectiveFunction;
  update?: DirectiveFunction;
  componentUpdated?: DirectiveFunction;
  unbind?: DirectiveFunction;
}

export interface VueConstructor<V extends Vue = Vue> {
  directive(
    id: string,
    definition?: DirectiveOptions | DirectiveFunction,
  ): DirectiveOptions;
  // eslint-disable-next-line @typescript-eslint/ban-types
  filter(id: string, definition?: Function): Function;

  observable<T>(obj: T): T;

  config: VueConfiguration;
  version: string;
}

export type PluginFunction<T> = (vue: VueConstructor, options?: T) => void;

export interface PluginObject<T> {
  install: PluginFunction<T>;
  [key: string]: any;
}
