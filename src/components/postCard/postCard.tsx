import * as React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SocialShare from 'material-ui/svg-icons/social/share';
import CardHeaderAcatar from '../cardHeaderAvatar/cardHeaderAvatar'
var style = require('./postCard.less')

interface PostCardProps {

}

export default class PostCard extends React.Component<PostCardProps, undefined>{
  render() {
    return (
      <Card className={style.PostCard}>
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <div
            className={style.CardImage}
            style={{ backgroundImage: "url(https://delusion.coding.me/img/daily_pic.min.jpg)" }}
          >
          </div>
        </CardMedia>
        <CardText>
          这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！
          这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！这个主题真吊！
        </CardText>
        <div className={style.CardBottom}>
          <CardHeaderAcatar
            title="滑稽"
            avatar="http://q1.qlogo.cn/headimg_dl?bs=1106996185&dst_uin=1106996185&spec=100&url_enc=0&referer=bu_interface&term_type=PC"/>
          <div className="flexFull"></div>
          <CardText><a href="#">分类</a> | <a href="#">分类</a></CardText>
          <IconMenu
            iconButtonElement={<IconButton><SocialShare /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Send feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Send feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>
        </div>
      </Card>
    )
  }
}