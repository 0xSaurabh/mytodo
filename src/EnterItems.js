import React from 'react';
import Items from './Items';
import './EnterItems.css';
import CheckedItems from './CheckedItems';

class EnterItems extends React.Component{

    constructor(props){
        super(props);

        let saved = this.props.todo;

        if(!(saved === null)){
            this.state = {
                unchecked: saved.unchecked,
                checked: saved.checked,
                current: {
                    key: "",
                    item: ""
                },
                hideOn1: saved.hideOn1,
                hideOn2: saved.hideOn2
            }
        } else {
            this.state = {
                unchecked: [],
                checked: [],
                current: {
                    key: "",
                    item: ""
                },
                hideOn1: true,
                hideOn2: true
            }
        }

        this.handleClick = this.handleClick.bind(this);
        this.addItem = this.addItem.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.uncheckItem = this.uncheckItem.bind(this);
        this.updateText = this.updateText.bind(this);
        this.save = this.save.bind(this);
    }

    save(){
        let state = this.state;
        localStorage.setItem('myTodo',JSON.stringify(state));
    }

    sort(array){
        for(let i = 0; i < array.length; i++){
            for (let j = 0; j < array.length-i-1; j++) {
                if(array[j].key > array[j+1].key){
                    let temp = array[j+1];
                    array[j+1] = array[j];
                    array[j] = temp;
                }
            }
        }
        return array;
    }

    handleClick(e){
        this.setState({
            current: {
                key: Date.now(),
                item: e.target.value
            }
        });
    }

    checkItem(item){
        const unchecked = this.state.unchecked;
        let checked = this.state.checked;

        if(checked.length === 0)
            this.setState({
                hideOn2: !this.state.hideOn2
            });

        checked.push(item);
        checked = this.sort(checked);

        for(let i = 0; i < unchecked.length; i++){
            if(item.key === unchecked[i].key)
                unchecked.splice(i,1);
        }

        if(unchecked.length === 0) {
            this.setState({
                hideOn1: !this.state.hideOn1
            });
        }

        this.setState({
            unchecked: unchecked,
            checked: checked
        },this.save);
    }

    uncheckItem(item){
        let unchecked = this.state.unchecked;
        const checked = this.state.checked;

        if(unchecked.length === 0) {
            this.setState({
                hideOn1: !this.state.hideOn1
            });
        }

        unchecked.push(item);
        unchecked = this.sort(unchecked);

        for(let i = 0; i < checked.length; i++){
            if(item.key === checked[i].key)
                checked.splice(i,1);
        }

        if(checked.length === 0) {
            this.setState({
                hideOn2: !this.state.hideOn2
            });
        }
        
        this.setState({
            unchecked: unchecked,
            checked: checked
        },this.save);
    }

    updateText(e,item){
        const unchecked = this.state.unchecked;

        for(let i=0;i<unchecked.length;i++){
            if(unchecked[i].key === item.key){
                unchecked[i].item = e.target.value;
            }
        }

        this.setState({
            unchecked: unchecked
        },this.save);
    }

    addItem(e){
        e.preventDefault();
        const current = this.state.current;
        const todo = this.state.unchecked;

        if(current.item !== ""){
            if(todo.length === 0)
                this.setState({
                    hideOn1: !this.state.hideOn1
                });
            todo.push(current);
            this.setState(
                {
                    unchecked: todo,
                    current: {
                        key: "",
                        item: ""
                    }
                },
                this.save
            );
        }
        
    }

    render(){
        return (
            <div>
                <form className="enter-todo" onSubmit={this.addItem}>
                    <input type="text" placeholder="Add a To-Do" value= {this.state.current.item} onChange={(e) => this.handleClick(e)}></input>
                    <button type="submit"></button>
                </form>
                {!this.state.hideOn1 && <div className="section-div" id="incomplete">
                    <h1 className="section">To-Dos:</h1>
                </div>}
                <Items unchecked={this.state.unchecked} checkItem={this.checkItem} updateText={this.updateText}/>
                {!this.state.hideOn2 && <div className="section-div complete">
                    <h1 className="section">Completed:</h1>
                </div>}
                <CheckedItems checked={this.state.checked} uncheckItem={this.uncheckItem}/>
            </div>
        );
    }
}

export default EnterItems;