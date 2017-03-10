import * as React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { hashHistory } from 'react-router';
const style = require("./categoriesTab.less")

interface CategoriesTabProps extends React.HTMLProps<HTMLDivElement> {
  CategoriesNameList: string[]
  value: string
}

interface CategoriesTabState {

}

export default class CategoriesTab extends React.Component<CategoriesTabProps, CategoriesTabState>{
  renderTabs() {
    let {CategoriesNameList = []} = this.props
    return CategoriesNameList.map((value) => {
      return <Tab label={value} key={value} value={value} className={style.tab} onActive={()=>{
          hashHistory.push("/category/" + value);
        }}></Tab>
    })
  }

  componentDidMount(){
    new window.webkitScrollbar({autohide:true});
  }

  render() {
    let {CategoriesNameList=[],value = "",...divProps} = this.props
    let tabWidth = 100;
    let tabNums = CategoriesNameList.length;
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