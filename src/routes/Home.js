//컴포넌트 파일을 앞글자를 대문자로 표기

import { Component } from "../core/componentCore";

export default class Home extends Component {
    render(){
        this.el.innerHTML = /*html*/`
        <h1>Home Page!</h1>
        `
    }
}