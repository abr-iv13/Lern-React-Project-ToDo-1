import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data : [
                {label: 'Going to lern React', like: false, important: true,id: 1},
                {label: 'That is so Good', like: false, important: false, id: 2},
                {label: 'I need a break....', like: false, important: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        // Привязки обработчикой событий
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this); 
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLiked = this.onToggleLiked.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelected = this.onFilterSelected.bind(this)

        this.maxId = 4;
    }

    deleteItem (id) {
        //Вытаскиеваем data из State
        this.setState(({data}) => {
            //Cравниваем data.id с id который пришел с нижних компонентов
          const index = data.findIndex((elem) => elem.id === id);

          const before = data.slice(0, index);
          const after = data.slice(index + 1);

          const newArr = [...before, ...after];
            // const newArr = [...data.slice(0, index), ...data.slice(index + 1)] аналогичный код
          return {
              data: newArr
          }
        })
    }
    //Фильтрация элементов по лайкам или все
    filterPosts (items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    addItem (body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => { 
            //Обновляем State(на прямую его нельзя изменять)
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            // находим элемент id со state 
            const index = data.findIndex(elem => elem.id === id)
            // выносим найденный элемент в отдельную переменную
            const old = data[index]
            // ...old помещает все свойства которые вытащили по index,
            // important: !important.like перезаписывает свойство старого объекта
            const newItem = {...old, important: !old.important}
            
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })  
    }
    // 
    onToggleLiked(id) {
        //({data}) вытыщили из State, анологичный код (state.data)
        this.setState(({data}) => {
            // находим элемент id со state 
            const index = data.findIndex(elem => elem.id === id)
            // выносим найденный элемент в отдельную переменную
            const old = data[index]
            // ...old помещает все свойства которые вытащили по index,
            // like: !old.like перезаписывает свойство тсрого объекта
            const newItem = {...old, like: !old.like}
            
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })
    }

    searchPost (items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter((item) => {
            //в каждом элементе смотрим св-во label и внутри находим то что ввел пользователь
            // если не нашли -1. Нужно вернуть все что больше -1
            return item.label.indexOf(term) > -1
        })
    }
    onUpdateSearch(term) {
        //({term}) аналогичная запись
        this.setState({term: term})

    }

    onFilterSelected(filter) { 
        this.setState ({
            filter: filter
        })
    }
    render () {
        // Вытаскиваем data из state
        const {data, term, filter} = this.state
        // вытаскиеваем кол-во элементов у который like: true (проходим по элементу проверяем item если true  то возвращаем)
        const liked = data.filter(item => item.like).length
        // Узнаем полнок кол-во постов в state.data
        const allPosts = data.length

        const visiblePosts = this.filterPosts(this.searchPost(data,term), filter)
        return(
            <div className="app"> 
                <AppHeader
                liked = {liked}
                allPosts = {allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch = {this.onUpdateSearch}
                    />
                    <PostStatusFilter
                    filter = {filter}
                    onFilterSelected = {this.onFilterSelected}
                    />
                </div>
                <PostList 
                posts={visiblePosts}
                onDelete = {this.deleteItem}
                onToggleImportant = {this.onToggleImportant}
                onToggleLiked = { this.onToggleLiked}
                />
                <PostAddForm
                    onAdd = {this.addItem}
                />
            </div>
        )
    }
    
}

 