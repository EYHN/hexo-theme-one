export interface DrawerIten {
  title?: string
  type?: string
  name?: string
  href?: string
  slug?: string
  initiallyOpen?: boolean
  icon?: string
  nested?: DrawerIten[]
}

export interface theme {
  uiux?: {
    slogan?: string | Array<string>,
    defaultPrimaryColor?: string | Array<string>
    defaultAccentColor?: string | Array<string>
  },
  head?: {
    favicon?: string | Array<string>
  },
  img?: {
    avatar?: string | Array<string>,
    left_pic?: string | Array<string>,
    right_pic?: string | Array<string>,
    post_thumbnail?: string | Array<string>,
    drawerHeaderBg?: string | Array<string>
  },
  comment?: {
    duoshuo?: {
      shortName?: string
    }
  },
  Drawer?: DrawerIten[]
}