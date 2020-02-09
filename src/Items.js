import React from 'react';
import './Items.css'

function Items(props){
    const todo = props.unchecked;
    const todoList = todo.map(i => {
        return(
            <div className="itemContainer animate" key={i.key}>  
                <button onClick={() => props.checkItem(i)}>
                    <svg className="checkbox" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g id="Group_10" data-name="Group 10" transform="translate(-106 -964)">
                            <g id="ellipse" data-name="Ellipse 5" transform="translate(106 964)" fill="#fff" stroke="#3f3f3f" strokeWidth="1">
                                <circle cx="12" cy="12" r="12" stroke="none"/>
                                <circle cx="12" cy="12" r="11.5" fill="none"/>
                            </g>
                            <path id="Path_13" data-name="Path 13" d="M109.7,978.959s1.774,3.6,3.449,3.6,10.87-6.5,10.87-6.5" transform="translate(1 -3)" fill="none" stroke="#3f3f3f" strokeLinecap="round" strokeWidth="1"/>
                        </g>
                    </svg>
                </button>
                <div className="Items"><input type="text" value={i.item} onChange={(e) => props.updateText(e,i)}></input></div>
            </div>
        );
    });
    return(
        <>{todoList}</>
    );
}

export default Items;