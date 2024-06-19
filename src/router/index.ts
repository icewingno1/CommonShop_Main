import { createRouter, createWebHashHistory } from 'vue-router'

const Home = import('@/views/Home.vue')
const Category = import('@/views/Category.vue')
const Cart = import('@/views/Cart.vue')
const User = import('@/views/User.vue')
const Login = import('@/views/Login.vue')
const Register = import('@/views/Register.vue')
const Search = import('@/views/Search.vue')
const ProductList = import('@/views/ProductList.vue')
const ProductDetail = import('@/views/ProductDetail.vue')
const AddressSelect = import('@/views/Address/AddressSelect.vue')
const AddressEdit = import('@/views/Address/AddressEdit.vue')
const Address = import('@/views/Address/Address.vue')
const Order = import('@/views/Order.vue')
const Pay = import('@/views/Pay.vue')
const OrderList = import('@/views/OrderList.vue')
const OrderDetail = import('@/views/OrderDetail.vue')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/productlist',
      component: ProductList
    },
    {
      path: '/goods/:id',
      component: ProductDetail
    },
    {
      path: '/address',
      component: Address,
      redirect: '/address/select',
      children: [
        {
          path: 'select',
          component: AddressSelect
        },
        {
          path: 'edit',
          component: AddressEdit
        }
      ]
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      path: '/orderlist',
      component: OrderList
    },
    {
      path: '/orderdetail',
      component: OrderDetail
    }
  ]
})

export default router
