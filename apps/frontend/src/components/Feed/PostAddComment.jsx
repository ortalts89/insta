import Button from '@mui/material/Button';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import CircularProgress from '@mui/material/CircularProgress';
import { useFetch } from '../../store/fetch';
import { shouldRefreshPostsListState } from '../../store/posts';
import { socket } from '../../socket';



export default function postAddComment({postId, postAuthor, comments, setPostComments}) {
    const [commentValue, setCommentValue] = useState('');
    const setShouldRefreshPostsList = useSetRecoilState(shouldRefreshPostsListState);
    const [isLoading, setIsLoading] = useState(null);
    const fetch = useFetch();

    const onCommentChange = useCallback((event) => {
        setCommentValue(event.target.value);
    }, [])

    const onSubmit = useCallback(async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const comment = await fetch(`/posts/${postId}/comments`,{text: commentValue}, 'POST');
        if(comment) {
            const newArr = [...comments]
            newArr.push(comment)
            setPostComments(newArr);
            setCommentValue('');
            setIsLoading(false);
            setShouldRefreshPostsList(true);
            socket.emit('send notification', {content: 'comment', to: postAuthor, postId: postId})
        }
    }, [postId, commentValue])

    const handleKeyPress = useCallback((event) => {
        if(event.key === "Enter" && event.shiftKey){
            console.log("ctrl + enter")
            setCommentValue(commentValue + "\n");
        }
        else if(event.key === "Enter" && !event.shiftKey){
            event.preventDefault();
            onSubmit(event);
        } 
    },[commentValue])

    return(
            <div className="add-comment-container">
                <form onSubmit={onSubmit}>
                    <textarea value={commentValue} onChange={onCommentChange} onKeyPress={handleKeyPress} type="text" placeholder="Add a comment..." rows="10" cols="12"/>
                    {isLoading ? <CircularProgress size={20} sx={{margin: '10px 20px'}}/> : <Button disabled={commentValue === '' ? true : false} variant="text" size="small" type="submit">Post</Button>}
                </form>
            </div>
    )
}