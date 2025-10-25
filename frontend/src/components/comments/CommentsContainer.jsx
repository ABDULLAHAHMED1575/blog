import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import CommentForm from './CommentForm'
import { Comment } from '@/components/comments/Comment';
import { createComment, updateComment, deleteComment, getPostComments } from '@/services/index/comments';


export const CommentsContainer = ({className, logginedUserId, postSlug}) => {
    const queryClient = useQueryClient();
    const userState = useSelector(state => state.user);
    const [affectedComments, setAffectedComments] = useState(null);

    const { data: commentsData, isLoading, refetch } = useQuery({
        queryFn: () => getPostComments({ slug: postSlug }),
        queryKey: ["comments", postSlug],
        enabled: !!postSlug,
    });

    const { mutate: mutateCreateComment } = useMutation({
        mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
            return createComment({ token, desc, slug, parent, replyOnUser });
        },
        onSuccess: () => {
            toast.success("Comment added successfully");
            refetch();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const { mutate: mutateUpdateComment } = useMutation({
        mutationFn: ({ token, commentId, desc }) => {
            return updateComment({ token, commentId, desc });
        },
        onSuccess: () => {
            toast.success("Comment updated successfully");
            refetch();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const { mutate: mutateDeleteComment } = useMutation({
        mutationFn: ({ token, commentId }) => {
            return deleteComment({ token, commentId });
        },
        onSuccess: () => {
            toast.success("Comment deleted successfully");
            refetch();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const comments = commentsData || [];
    const mainComents = comments.filter((comment) => comment.parent === null);
    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
        if (!userState.userInfo) {
            toast.error("Please login to comment");
            return;
        }

        mutateCreateComment({
            token: userState.userInfo.token,
            desc: value,
            slug: postSlug,
            parent: parent,
            replyOnUser: replyOnUser,
        });

        setAffectedComments(null);
    }

    const updateCommentHandler = (value, commentId) => {
        if (!userState.userInfo) {
            toast.error("Please login to update comment");
            return;
        }

        mutateUpdateComment({
            token: userState.userInfo.token,
            commentId: commentId,
            desc: value,
        });

        setAffectedComments(null);
    }

    const deleteCommentHandler = (commentId) => {
        if (!userState.userInfo) {
            toast.error("Please login to delete comment");
            return;
        }

        mutateDeleteComment({
            token: userState.userInfo.token,
            commentId: commentId,
        });
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
