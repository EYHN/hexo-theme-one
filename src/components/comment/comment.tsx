import * as React from 'react';
import Duoshuo from './duoshuo/duoshuo'
import { connect } from 'react-redux';
import AppState from '../../stateI';
const ReactDisqusThread = require('../../lib/react-disqus-thread/DisqusThread.jsx');

interface commentProps {
  className?: string
  postID: string
  postTitle: string
  url?: string
  duoshuo?: any
  disqus?: any
  author?: string,
  postCategory: string
}

export class Comment extends React.Component<commentProps, undefined>{
  handleNewComment(comment: any) {
    console.log(comment.text);
  }

  render() {
    let {url = window.location.href, duoshuo = {}, disqus = {}, className = "", author = "", postCategory, postTitle, postID} = this.props
    return (
      <div className={className}>
        {
          typeof duoshuo.shortName !== "undefined" ? <Duoshuo thread={this.props.postID} url={url} shortName={duoshuo.shortname} author={author} /> : undefined
        }
        {
          typeof disqus.shortName !== "undefined" ?
            <ReactDisqusThread
              shortname={disqus.shortName}
              identifier={postID}
              title={postTitle}
              url={encodeURI(url)}
              category_id={postCategory}
              onNewComment={this.handleNewComment} />
            : undefined
        }
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let {author = ""} = state.site;
  let {comment = {}} = state.theme;
  let {duoshuo = {},disqus = {}} = comment;
  return {
    author: author,
    duoshuo: duoshuo,
    disqus: disqus
  }
}

const CommentX = connect<AppState, commentProps, commentProps>(mapStateToProps)(Comment as any)

export default CommentX;