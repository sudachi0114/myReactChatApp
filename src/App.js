import logo from './logo.svg';
import './App.css';

import { firebaseDB } from './firebase/index.js'

import React, { Component } from 'react';

import ChatBox from "./components/ChatBox.js"
import Message from "./components/Message.js"

// let msgRepo = [ {"user_name": "anonymous", "text": "hogera"} ];
const messageRef = firebaseDB.ref('messages')

class App extends Component {
  constructor(props) {
    super(props);

    this.onTextChange = this.onTextChange.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)

    this.state = {
      text: "",
      user_name: "",
      messages: [],
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Sudachi React Chat App</h2>
        </div>

        <div className="MessageList" >
          {this.state.messages.map( (m, i) => {
            return <Message key={i} message={m} />
          })}
        </div>

        <ChatBox onTextChange={this.onTextChange} onButtonClick={this.onButtonClick} />

      </div>
    );
  }

  // 文字が入力される度に、state の更新を行う method (event 処理) の定義
  onTextChange(e) {
    if (e.target.name == 'user_name') {
      this.setState({
        "user_name": e.target.value,
      });
    } else if (e.target.name == "text") {
      this.setState({
        "text": e.target.value,
      });
    }
  }

  // 送信ボタン押下時の event 処理
  onButtonClick() {
    // 簡易的バリデーション
    if (this.state.user_name == '') {
      alert('user name is empty!')
      return
    } else if (this.state.text == '') {
      alert('text is empty!')
      return
    } 

    console.log('yeah!')
    this.state.messages.push({
      "user_name": this.state.user_name,
      "text": this.state.text,
    })
    console.log(this.state.messages)

    messageRef.push({
      "user_name": this.state.user_name,
      "text": this.state.text,
    })
    console.log(messageRef);

  }

  // DB の更新をキャッチする Listener の実装
  componentWillMount() {
    messageRef.on('child_added', (snapshot) => {
      const m = snapshot.val()
      let msgs = this.state.messages

      msgs.push({
        'text': m.text,
        'user_name': m.user_name,
      })

      this.setState({
        message: msgs
      });
    })
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
