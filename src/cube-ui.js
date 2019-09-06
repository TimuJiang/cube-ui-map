import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  // basic
  Button,
  // form
  // popup
  Toast,
  Picker,
  CascadePicker,
  Drawer
  // scroll
} from 'cube-ui'

Vue.use(Button)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(CascadePicker)
Vue.use(Drawer)
