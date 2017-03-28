export interface DrawerItemI {
  title?: string
  type?: string
  name?: string
  href?: string
  slug?: string
  initiallyOpen?: boolean
  icon?: string | {type:string,date:any,style:any}
  nested?: DrawerItemI[]
}

export interface MenuItemI {
  title?: string
  type?: string
  name?: string
  href?: string
  slug?: string
  icon?: string
  nested?: MenuItemI[]
}

export interface barMenu {
  items: MenuItemI[]
  icon?: string
}

export interface theme {
  uiux?: {
    slogan?: string | Array<string>,
    defaultPrimaryColor?: string | Array<string>
    defaultAccentColor?: string | Array<string>
  }
  head?: {
    favicon?: string | Array<string>
  }
  img?: {
    avatar?: string | Array<string>,
    left_pic?: string | Array<string>,
    right_pic?: string | Array<string>,
    post_thumbnail?: string | Array<string>,
    drawerHeaderBg?: string | Array<string>
  }
  comment?: {
    disqus?: {
      shortName?: string,
      
    }
  }
  Drawer?: DrawerItemI[]
  homeToolBar?:barMenu[]
  colorPicker?:boolean
  footer?: string[][]
}