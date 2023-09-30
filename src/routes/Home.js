//컴포넌트 파일을 앞글자를 대문자로 표기
import { Component } from "../core/componentCore";
import TextField from "../components/TextField";
import Message from "../components/Message";

export default class Home extends Component {
    render(){
        this.el.innerHTML = /*html*/`
        <h1>Home Page!</h1>
        `
        this.el.append(
            new TextField().el,
            new Message().el
            )
    }
}