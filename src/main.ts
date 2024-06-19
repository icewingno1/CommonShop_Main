import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from '@/router/index'

// 重置样式
import '@/styles/reset.scss'

// 为html添加一个font-size
import 'lib-flexible'

const app = createApp(App)

// 创建一个pinia实例
app.use(createPinia().use(piniaPluginPersistedstate))

app.use(router)

app.mount('#app')

// vant相关
import 'vant/lib/index.css'
import {
  Button,
  Form,
  Field,
  CellGroup,
  Checkbox,
  Toast,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  List,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Popup,
  CheckboxGroup,
  SubmitBar,
  Stepper,
  AddressList,
  AddressEdit,
  Empty,
  Dialog
} from 'vant'
app
  .use(Button)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(Checkbox)
  .use(Toast)
  .use(Swipe)
  .use(SwipeItem)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(ActionBar)
  .use(ActionBarIcon)
  .use(ActionBarButton)
  .use(Popup)
  .use(CheckboxGroup)
  .use(SubmitBar)
  .use(Stepper)
  .use(AddressList)
  .use(AddressEdit)
  .use(Empty)
  .use(Dialog)

// 更改vant主题色
import '@/styles/theme.scss'
