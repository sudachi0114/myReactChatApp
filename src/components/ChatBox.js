import React from 'react';

export default class ChatBox extends React.Component {
    render() {
        return (
            <div className="ChatBox">
                <div className="">
                    <input name="user_name" className="" onChange={this.props.onTextChange} placeholder="user name" />
                </div>

                <textarea name="text" className="" onChange={this.props.onTextChange} />
                <button className="" onClick={this.props.onButtonClick} >送信</button>
            </div>
        );
    }
}