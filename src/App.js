import {Component} from './core/componentCore'
import FruitItem from './components/Fruititem'
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
        <ul></ul>
        `
        const ulEl = this.el.querySelector('ul') 
        ulEl.append(...this.state.fruits    //append는 DOM method임
            .map(fruits =>new FruitItem({
                props:{
                    name:fruits.name,
                    price:fruits.price
                }
            }).el)
            )
    }
} 