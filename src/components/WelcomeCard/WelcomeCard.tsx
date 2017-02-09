import * as React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CardHeaderAcatar from '../cardHeaderAvatar/cardHeaderAvatar'
var style = require('./WelcomeCard.less')

interface WelcomeCardProps {
  title?:React.ReactNode,
  subtitle?:React.ReactNode,
  coverImg?:string,
  avatarImg?:React.ReactNode,
  username?:React.ReactNode,
  avatarSubtitle?:React.ReactNode
}

export default class WelcomeCard extends React.Component<WelcomeCardProps, undefined>{
  render() {
    var {
      title = "标题",
      subtitle = "副标题",
      coverImg,
      avatarImg,
      username,
      avatarSubtitle
    }=this.props
    return (
      <Card className={style.WelcomeCard}>
          <CardMedia
            overlay={<CardTitle title={title} subtitle={subtitle} />}
          >
          <div 
            className={style.CardImage}
            style={{backgroundImage:`url(${coverImg})`}}
             >
          </div>
          </CardMedia>
          <div className={style.CardBottom}>
          <CardHeaderAcatar
            title={username}
            subtitle={avatarSubtitle}
            avatar={avatarImg}/>
          </div>
        </Card>
    )
  }
}