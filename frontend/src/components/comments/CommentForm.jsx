import React, { useState } from 'react'

const CommentForm = ({btnLabel, formSubmitHandler, formCancelhandler = null, initialText = ""}) => {
    const [value,setValue] = useState(initialText);

    const submitHandler = (e) => {
        e.preventDefault();
        formSubmitHandler(value);
        setValue('');
    };
  return (
    <form onSubmit={submitHandler}>
        <div className='flex flex-col items-end border border-primary rounded-lg p-4'>
            <textarea rows="5" 
            className='w-full focus:outline-none bg-transparent' 
            placeholder='Leave your comment here'
            value={value}
            onChange={(e) => setValue(e.target.value)}>

            </textarea>
            <div className='flex flex-col-reverse gap-y-2 min-[420px]:flex-row items-center gap-x-2 pt-2'>
              {formCancelhandler && (
                <button onClick={formCancelhandler} className='px-6 py-2.5 mt-2 fix rounded-lg border border-red-500 text-red-500'>
                  Cancle
                </button>
              )}
              <button 
              type='submit' 
              className='px-6 py-2.5 fix rounded-lg bg-primary text-white font-semibold mt-2'
              >{btnLabel}
            </button>
            </div>
            
        </div>
    </form>
  )
}

export default CommentForm