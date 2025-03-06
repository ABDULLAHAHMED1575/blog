import React, { useEffect, useState } from 'react'

import CommentForm from './CommentForm'
import { getCommentsData } from '@/data/comments'
import { Comment } from '@/components/comments/Comment';


export const CommentsContainer = ({className, logginedUserId}) => {

    const [comments, setComments] = useState([]);
    const [affectedComments, setAffectedComments] = useState(null)
    const mainComents = comments.filter((comment) => comment.parent === null);
    useEffect(()=>{
      (async() => {
        const commentsdata = await getCommentsData();
        setComments(commentsdata);
      })()
    },[])
    const addCommentHandler = (value,parent = null, replyOnUser = null) => {
      const newComment = {
        _id: Math.random().toString(),
        user: {
          _id: "a",
          name: "Mohammad Rezaii",
        },
        desc: value,
        post: "1",
        parent: parent,
        replyOnUser: replyOnUser,
        createdAt: new Date().toISOString(),
      };
      setComments((currState) => {
        return [newComment, ...currState];
      })
      
      setAffectedComments(null);
    }

    const updateCommentHandler = (value,commentId) => {
      const updateComments = comments.map((comment)=>{
        if(comment._id === commentId){
          return{...comment, desc:value};
        }
        return comment
      });
      setComments(updateComments);
      setAffectedComments(null);
    }

    const deleteCommentHandler = (commentId) => {
      const deletedComments = comments.filter((comment)=>{
        return comment._id !== commentId 
      });
      setComments(deletedComments);
    }

    const getRepliesHandler = (commentId) => {
      return comments.filter(
        (comment) => comment.parent === commentId)
        .sort((a,b)=>{
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    };
  return (
    <div className={`${className}`}>
        <CommentForm btnLabel={"Send"} formSubmitHandler={(value) => addCommentHandler(value)}/>
          <div className='space-y-4 mt-8'>
              {mainComents.map((comment)=>(
                <Comment 
                key={comment._id}
                comments={comment} 
                logginedUserId={logginedUserId} 
                affectedComments = {affectedComments}
                setAffectedComments={setAffectedComments}
                addCommentHandler={addCommentHandler}
                updateComment={updateCommentHandler}
                deleteComment={deleteCommentHandler}
                replies={getRepliesHandler(comment._id)}
                />
              ))}
          </div>
    </div>
  )
}
