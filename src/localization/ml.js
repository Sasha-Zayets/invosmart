import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
import sidebar from './sidebar'
import userTopMenu from './userTopMenu'
import topInfoBlock from './topInfoBlock'

Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'en',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('en').create({
      sidebar: sidebar.en.nameOption,
      userTopMenu: userTopMenu.en.list,
      topBlockUser: topInfoBlock.en.content
    }),
 
    new MLanguage('ru').create({
        sidebar: sidebar.ru.nameOption,
        userTopMenu: userTopMenu.ru.list,
        topBlockUser: topInfoBlock.en.content
    })
  ]
})