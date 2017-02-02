import * as React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CardHeaderAcatar from '../cardHeaderAvatar/cardHeaderAvatar'
var style = require('./WelcomeCard.less')

interface WelcomeCardProps {

}

export default class WelcomeCard extends React.Component<WelcomeCardProps, undefined>{
  render() {
    return (
      <Card className={style.WelcomeCard}>
          <CardMedia
            overlay={<CardTitle title="幻想帖" subtitle="这个主题真吊！" />}
          >
          <div 
            className={style.CardImage}
            style={{backgroundImage:"url(https://delusion.coding.me/img/daily_pic.min.jpg)"}}
             >
          </div>
          </CardMedia>
          <div className={style.CardBottom}>
          <CardHeaderAcatar
            title="滑稽"
            avatar="http://q1.qlogo.cn/headimg_dl?bs=1106996185&dst_uin=1106996185&spec=100&url_enc=0&referer=bu_interface&term_type=PC"/>
          </div>
        </Card>
    )
  }
}