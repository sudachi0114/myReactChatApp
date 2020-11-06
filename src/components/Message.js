import React from 'react';

export default class Message extends React.Component {
    render() {
        return (
            <div className="Message">
                <div className="">
                    <p>@user_name</p>
                    <p>text</p>
                </div>
            </div>
        )
    }
}

/* memo:
<p className="">@{this.props.message.user_name}</p>
<p className="">{this.props.message.text}</p>
 */