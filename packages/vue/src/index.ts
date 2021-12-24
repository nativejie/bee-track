import { addEvent } from './dom-event';
import { exposure } from './exposure';
import { PluginObject, VueConstructor } from './type';

export {};

type Options = {
  point: string;
};

const event = ['click', 'focus', 'blur'];

const TrackVue: PluginObject<Options> = {
  install: (Vue: VueConstructor, options: Options) => {
    console.log(options);
    Vue.directive('bee-track', {
      bind(el, binding) {
        const { arg, value } = binding;
        if (event.includes(arg)) {
          addEvent(el, arg, value);
        }
        if (arg === 'exposure') {
          exposure.add(el, value);
        }
      },
    });
  },
};

export { TrackVue };
