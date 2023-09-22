import {Component} from './core/componentCore'

export default class App extends Component{
    constructor(){
        super({
            state:{
                fruits:[
                    {name: 'Apple', price: 1000},
                    {name: 'Banana', price: 2000},
                    {name: 'Cherry', price: 3000},
                ]
            }
        })
    }
    render(){
        console.log(this.state.fruits)
        this.el.innerHTML = /*html*/`
        <h1>Fruits</h1>
        <ul>
            ${this.state.fruits
            .filter(fruit =>fruit.price <3000)
            .map(fruits =>`<li>${fruits.name}</li>`)
            .join('')}
        </ul>
        `
    }
} 