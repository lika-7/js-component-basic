import {Component} from '../core/componentCore'
import messageStore from '../store/message'
export default class TextField extends Component{
    render(){
        this.el.innerHTML = /*html*/`
            <input value="${messageStore.state.message}"/> //값을 조회 하는 getter
        `
        const inputEl = this.el.querySelector('input')
        inputEl.addEventListener('input',()=>{
            messageStore.state.message = inputEl.value  //값을 할당하는 setter
        })
    }
}