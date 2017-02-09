import * as React from 'react';
import CardHeader from 'material-ui/Card/CardHeader';
var style = require('./cardHeaderAvatar.less')

interface CardHeaderAvatarProps {
  style?:React.CSSProperties,
  className?: string,
  title?:React.ReactNode,
  avatar?:React.ReactNode,
  subtitle?:React.ReactNode
}

export default class CardHeaderAvatar extends React.Component<CardHeaderAvatarProps, undefined>{
  render() {
    return (
      <div className={style.CardHeaderAvatar + " " + (this.props.className?this.props.className:'')}
        style={this.props.style}>
        <CardHeader
          title={this.props.title}
          avatar={this.props.avatar}
          subtitle={this.props.subtitle}
        />
      </div>
    )
  }
}