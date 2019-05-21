import React, { useState } from "react"
import * as post from "../../api/post"
import { AppContext, Context } from "../../../app";

const doPostPost = (title: string, author: string, context: Context) => {
    try {
        const response = post.postPost({
            // id: 2,
            title,
            author,
        })

        response.then(response => {
            window.console.log(response)
        })

        context.setLastUpdated(new Date)
    } catch (error) {
        throw error
    }
}

interface Props {}

export default function Component(props: Props) {
    const [title, setTitle] = useState<string>((new Date()).toUTCString());
    const [author, setAuthor] = useState<string>("Test man");

    return (
        <AppContext.Consumer>
            {context => (
                <>
                    <h2>Post component</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="author"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />

                    <button onClick={e => doPostPost(title, author, context)}>Post</button>
                </>
            )}
        </AppContext.Consumer>
    )
}