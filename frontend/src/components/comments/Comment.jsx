import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaEdit } from 'react-icons/fa';
import { LuMessageSquareReply } from "react-icons/lu";
import { MdDelete } from 'react-icons/md';
import CommentForm from './CommentForm';

export const Comment = ({comments, logginedUserId, affectedComments, setAffectedComments,updateComment, addCommentHandler, parentId = null, deleteComment, replies = []}) => {
    const isUserLoggined = Boolean(logginedUserId);
    const comentBelongsToUser = logginedUserId === comments.user._id;
    const isReplying = affectedComments && 
    affectedComments.type === "replying" && 
    affectedComments._id === comments._id
    const isEditing = affectedComments && 
    affectedComments.type === "editing" && 
    affectedComments._id === comments._id
    const repliedCommentId = parentId ? parentId : comments._id;
    const replyOnUserId = comments.user._id;
    
    
  return (
    <div className='flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg'>
        <CgProfile className='h-9 w-9'/>
        <div className='flex-1 flex flex-col '>
            <h5 className='font-bold text-dark-hard text-xs lg:text-sm'>    
                {comments.user.name}
            </h5>
            <span className='text-xs text-dark-light'>
            {new Date(comments.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour:"2-digit"
                })}
            </span>
            {!isEditing && (
                <p className='font-opensans mt-[10px] text-dark-light'>
                    {comments.desc}
                </p>
            )}
            
            {isEditing && (
                <CommentForm 
                btnLabel="Update" 
                formSubmitHandler={(value) => updateComment(value,comments._id)}
                formCancelhandler={()=> setAffectedComments(null)}
                initialText = {comments.desc}
                />

            )}
            <div className=' flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3'>
                {isUserLoggined && (
                    <button className='flex items-center space-x-2 ' onClick={() => setAffectedComments({type:'replying', _id: comments._id})}>
                        <LuMessageSquareReply className='w-4 h-auto'/>
                        <span>Reply</span>
                    </button>
                )}
                {comentBelongsToUser && (<>
                    <button className='flex items-center space-x-2' onClick={() => setAffectedComments({type:'editing', _id: comments._id})}>
                        <FaEdit  className='w-4 h-auto'/>
                        <span>Edit</span>
                    </button>
                    <button className='flex items-center space-x-2 ' onClick={()=>deleteComment(comments._id)}>
                        <MdDelete className='w-4 h-auto'/>
                        <span>Delete</span>
                    </button>
                </>)}
                
            </div>
            {isReplying && (
                <CommentForm btnLabel="Reply" 
                formSubmitHandler={(value)=>addCommentHandler(value,repliedCommentId,replyOnUserId)}
                formCancelhandler={()=> setAffectedComments(null)}
                />
                
            )}
            {replies.length > 0 && (
                <div>
                    {replies.map((reply)=>(
                        <Comment 
                            key={reply._id}
                            addCommentHandler={addCommentHandler}
                            affectedComments={affectedComments}
                            setAffectedComments={setAffectedComments}
                            comments={reply}
                            deleteComment={deleteComment}
                            logginedUserId={logginedUserId}
                            getReplies={[]}
                            updateComment={updateComment}
                            parentId={comments._id}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}
