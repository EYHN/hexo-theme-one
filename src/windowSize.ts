import AppState from './stateI';
import { setWindowSize } from './actions/windowSize';
import * as _ from 'underscore'
import { Store } from 'redux';
import sreenSize from './lib/sreenSize'

export interface windowSizeI {
    smaller:{
        than: {
            phone: boolean,
            pad: boolean,
            desktop: boolean
        }
    },
    bigger:{
        than:{
            phone: boolean,
            pad: boolean,
            desktop: boolean
        }
    }
}

export function registerListener(state:Store<AppState>){
    let onresize = ()=>{
        state.dispatch(setWindowSize({
            smaller:{
                than: {
                    phone:sreenSize.smaller.than.phone(),
                    pad:sreenSize.smaller.than.pad(),
                    desktop:sreenSize.smaller.than.pad()
                }
            },
            bigger:{
                than:{
                    phone:sreenSize.bigger.than.phone(),
                    pad:sreenSize.bigger.than.pad(),
                    desktop:sreenSize.bigger.than.pad()
                }
            }
        }))
    }
    onresize();
    $(window).resize(_.throttle(onresize,50));
}