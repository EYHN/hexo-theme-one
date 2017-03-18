import routerHistory from '../../lib/History';
import * as React from 'react';
import { Tabs, Tab as Tabx } from 'material-ui/Tabs';
const style = require("./Tab.less")

interface TabProps extends React.HTMLProps<HTMLDivElement> {
  NameList: string[]
  value: string
  link?:(name:string)=>string
}

interface TabState {

}

export default class Tab extends React.Component<TabProps, TabState>{
  renderTabs() {
    let {NameList = []} = this.props
    return NameList.map((value) => {
      return <Tabx label={value} key={value} value={value} className={style.tab} onActive={()=>{
          if(typeof this.props.link === "function"){
            routerHistory.push(this.props.link(value));
          }
        }}></Tabx>
    })
  }

  componentDidMount(){
    new window.webkitScrollbar({autohide:true});
  }

  render() {
    let {NameList=[],value = "",...divProps} = this.props
    let tabWidth = 100;
    let tabNums = NameList.length;
    return (
        <div className={style.tabScrollBox}>
          <Tabs className={style.tabs} style={{
            width: tabNums * tabWidth + "px"
          }}
          value={value}>
          {
            this.renderTabs()
          }
          </Tabs>
        </div>
    )
  }
}