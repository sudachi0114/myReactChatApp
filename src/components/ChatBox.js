import React from 'react';

export default class ChatBox extends React.Component {
    render() {
        return (
            <div className="ChatBox">
                <div className="">
                    <input name="user_name" className="" placeholder="user name" />
                </div>

                <textarea name="text" className="" />
                <button className="" >送信</button>
            </div>
        );
    }
}