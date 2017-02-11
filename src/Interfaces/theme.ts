export interface theme {
  color?:{
    primaryColor:string,
    accentColor:string
  }
  uiux?:{
    slogan?: string | Array<string>
  },
  head?:{
    favicon?:string | Array<string>
  },
  img?:{
    avatar?: string | Array<string>,
    left_pic?: string | Array<string>,
    right_pic?:string | Array<string>,
    post_thumbnail?:string | Array<string>
  }
}