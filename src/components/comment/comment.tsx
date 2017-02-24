import * as React from 'react';
import * as $ from 'jquery';
import Duoshuo from './duoshuo/duoshuo'
import { connect } from 'react-redux';
import AppState from '../../stateI';
// const ReactDisqusThread = require('react-disqus-thread');

interface commentProps {
  className?: string
  postID: string
  postTitle: string
  url?: string
  shortname?:string
  author?:string
}

export class Comment extends React.Component<commentProps, undefined>{
  handleNewComment(comment:any) {
    console.log(comment.text);
  }

  render() {
    let {url = window.location.href,shortname = "huaji-blog",className = "",author=""} = this.props
    return (
      <div className={className}>
        <Duoshuo thread={this.props.postID} url={url} shortName={"huaji-blog"} author={author}/>
        {/*<ReactDisqusThread
          shortname="huaji"
          identifier={this.props.postID}
          title={this.props.postTitle}
          url={url}
          category_id="Tech"
          onNewComment={this.handleNewComment} />*/}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState)=>{
  let {author=""} = state.site;
  let {comment = {}} = state.theme;
  let {duoshuo = {}} = comment;
  return {
    author:author,
    shortname:duoshuo.shortName
  }
}

const CommentX = connect<AppState, commentProps, commentProps>(mapStateToProps)(Comment as any)

export default CommentX;