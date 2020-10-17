import Vue from 'vue'

import { 
    extend,
    configure,
    ValidationProvider,
    ValidationObserver
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/es.json'

Object.keys(rules).forEach(rule => {
    extend(rule, {
        ...rules[rule], // copies rule configuration
        message: messages[rule] // assign message
    });
});

configure({
    classes: {
      //valid: 'is-valid',
      invalid: 'is-invalid',
      dirty: ['is-dirty', 'is-dirty'],
    }
})

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
