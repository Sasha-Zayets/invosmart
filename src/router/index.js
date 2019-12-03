import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

//layout
import Default from '@/layout/default'
import Auth from '@/layout/auth'

// pages
// Auth pages
import Login from '@/views/Login.vue'
import Registration from '@/views/Registration'
import PasswordRecovery from '@/views/AuthRecovery/PasswordRecovery'
import NewPassword from '@/views/AuthRecovery/NewPassword'
import ConfirmEmail from '@/views/AuthRecovery/EmailSend'
import EmailVerify from '@/views/AuthRecovery/EmailVerify'
import EmailConfirm from '@/views/AuthRecovery/EmailConfirm'
import ConfirmationLink from '@/views/AuthRecovery/ConfirmationLink'

// Users pages
import Companies from '@/views/Companies'
import Invoices from '@/components/invoices/Invoices'
import Contacts from '@/components/contacts/Contacts'
import Products from '@/components/products/Products'
import Dashboard from '@/views/Dashboard'
import UserContacts from '@/components/contacts/UserContacts'

Vue.use(Router)

const lang = localStorage.getItem('lang')

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: `/${lang != null ? lang: 'en'}/dashboard`
    },
    {
      path: '*',
      beforeEnter: (to, from, next) => {
        beforeAuthUser(to, from, next)
      }
    },
    {
      path: '/:lang/auth/',
      component: Auth,
      meta: {
        requiresAuth: true,
        requiresCompany: true,
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
          meta: {
            restrictWithAuth: true,
          }
        },
        {
          path: 'registration',
          name: 'registration',
          component: Registration,
          meta: {
              restrictWithAuth: true,
          }
        },
        {
          path: 'password-recovery',
          name: 'password recovery',
          component: PasswordRecovery
        },
        {
          path: 'new-password',
          name: 'new password',
          component: NewPassword
        },
        {
          path: 'confirm-auth',
          name: 'confirm email',
          component: ConfirmEmail
        },
        {
          path: 'email-verify',
          name: 'email verify',
          component: EmailVerify
        },
        {
          path: 'email-confirm',
          component: EmailConfirm
        },
        {
          path: 'confirmation_email',
          component: ConfirmationLink
        }
      ]
    },
    {
      path: '/:lang',
      component: Default,
      beforeEnter: (to, from, next) => {
        beforeAuthUser(to, from, next)
      },
      children: [
        {
          path: 'companies',
          name: 'companies',
          component: Companies
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'invoices',
          name: 'invoices',
          component: Invoices
        },
        {
          path: 'contacts',
          name: 'Контакты',
          component: Contacts
        },
        {
          path: 'products',
          name: 'Продукты',
          component: Products
        },
        {
          path: 'contacts/:id',
          component: UserContacts
        }
      ]
    }
  ]
});


// user verification
function check (to, from, next, lang) {
  const account = localStorage.getItem('account_id'),
        company = localStorage.getItem('company_id')

  if (account && company) {
    next();
  } else if (account) {
    next();
  } else {
    next({path: `/${lang}/auth/login`});
  }
}

// language installation and verification
function beforeAuthUser (to, from, next) {
  const params = to.params.lang
    if (params) {
      if (params.length <= 3) {
        localStorage.setItem('lang', params)
        let lang = localStorage.getItem('lang')
        
        check(to, from, next, lang)
      } else {
        setDefaultLang(to, from, next)
      }
    } else {
      setDefaultLang(to, from, next)
    }
}

// router default job function
function setDefaultLang (to, from, next) {
  localStorage.setItem('lang', 'en')
  
  const lang = localStorage.getItem('lang')
  
  check(to, from, next, lang)
}

function checkAuth () {
  return store.getters.accessToken && store.getters.refreshToken;
}

function checkCompany () {
  return !!store.getters.companyId;
}

/*
 let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  let requiresCompany = to.matched.some(record => record.meta.requiresCompany);
  let restrictWithAuth = to.matched.some(record => record.meta.restrictWithAuth);

  if(requiresAuth && requiresCompany) {
    if(checkAuth()) {

      if(checkCompany()) {
        next()
      }
      else {
        
        next({path: `/${lang}/companies`});
      }

    } else {
      next({path: `/${lang}/auth/login`});
    }
    
  } else if (requiresAuth) {
    
    
    if(checkAuth()) next({path: `/${lang}/auth/login`});
    else next({path: `/${lang}/auth/login`});
    
  } else if(restrictWithAuth) {
    
    if(checkAuth()) next({path: from.name ? from.name : `/${lang}/dashboard`});
    else next({path: `/${lang}/auth/login`});;
    
  } else {
    if (localStorage.getItem('account_id')) {
      next()
    } else {
      next({path: `/${lang}/auth/login`});
    }
  }
*/
export default router;
