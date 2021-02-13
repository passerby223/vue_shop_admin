import Vue from 'vue'
// 按需导入element-ui相关组件
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 把element-ui中的Message消息组件，挂载到Vue的原型对象上
Vue.prototype.$message = Message
