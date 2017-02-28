export default {
    smaller:{
        than: {
            phone: ()=>window.innerWidth < 768,
            pad: ()=>window.innerWidth < 992,
            desktop: ()=>true
        }
    },
    bigger:{
        than:{
            phone: ()=>window.innerWidth > 0,
            pad: ()=>window.innerWidth >= 768,
            desktop: ()=>window.innerWidth >= 992
        }
    }
}