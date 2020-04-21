import React from 'react';

import './app-header.css'
//Деструктуризируем(забираем) елементы liked, allPosts из props
const AppHeader = ({liked, allPosts}) => {
    return (
        <div className="app-header d-flex">
            <h1>Ivan Ivanov</h1>
            <h2>{allPosts} записей, из них понравилось {liked}</h2>
        </div>
    )
}
export default AppHeader;