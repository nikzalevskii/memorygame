import {useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import config from "./config.js";
import React from "react";
import Card from "./components/Card.jsx";
import Popup from 'reactjs-popup';

class App extends React.Component {
    timer = null;
    constructor() {
        super();
        this.state = {cards: [], clicks: 0, isPopupOpened: false, time: 0, timerOn: false};
    }

    componentDidMount() {
        this.startGame();
    }

    startGame() {
        if (this.state.timerOn) {
            clearInterval(this.timer);
        }
        this.setState({
            cards: this.prepareCards(),
            clicks: 0,
            isPopupOpened: false,
            time: 0,
            timerOn: false,
        });
    }

    prepareCards() {
        let id = 1;
        const cards = [...config.cards, ...config.cards];  // создаем массив с дублированными картами
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // выбираем случайный индекс от 0 до i
            [cards[i], cards[j]] = [cards[j], cards[i]];   // меняем местами элементы
        }
        return cards.map(item => ({...item, id: id++, isOpened: false, isCompleted: false}));
    }

    startTimer() {
        if (!this.state.timerOn) {
            this.timer = setInterval(() => {
                this.setState(prevState => ({time: prevState.time + 1}))
            }, 1000);
            this.setState({timerOn:true});
        }
    }

    choiceCardHandler(openedItem) {
        if (openedItem.isCompleted || this.state.cards.filter(item => item.isOpened).length >= 2) {
            return;
        }
        if (!this.state.timerOn) {
            this.startTimer();
        }
        this.setState({
            cards: this.state.cards.map(item => {
                return item.id === openedItem.id ? {...item, isOpened: true} : item;
            }),
            clicks: this.state.clicks + 1
        }, () => {
            this.processChoosingCars();
        })
    }

    processChoosingCars() {
        const openCards = this.state.cards.filter(item => item.isOpened);
        if (openCards.length === 2) {
            if (openCards[0].name === openCards[1].name) {
                this.setState({
                    cards: this.state.cards.map(item => {
                        if (item.id === openCards[0].id || item.id === openCards[1].id) {
                            item.isCompleted = true;
                        }
                        item.isOpened = false;
                        return item;
                    })
                }, () => {
                    this.checkForAllCompleted();
                })
            } else {
                setTimeout(() => {
                    this.setState({
                        cards: this.state.cards.map(item => {
                            item.isOpened = false;
                            return item;
                        })
                    })
                }, 1000);
            }
        }
    }

    checkForAllCompleted() {
        if (this.state.cards.every(item => item.isCompleted)) {
            clearInterval(this.timer);
            this.setState({
                isPopupOpened: true,
                timerOn: false
            })

        }
    }

    closePopup() {
        this.setState({
            isPopupOpened: false
        })
        this.startGame();
    }


    render() {
        return (
            <div className="App">
                <header className="header">MemoryGame</header>
                <div className="game">
                    <div className="score">
                        Нажатий: {this.state.clicks} ; Время: {this.state.time} сек
                    </div>
                    <div className="cards">
                        {
                            this.state.cards.map(item => (
                                <Card item={item} key={item.id} isShowed={item.isOpened || item.isCompleted}
                                      onChoice={this.choiceCardHandler.bind(this)}/>
                            ))
                        }
                    </div>
                </div>
                <Popup open={this.state.isPopupOpened} closeOnDocumentClick onClose={this.closePopup.bind(this)}>
                    <div className="modal">
                        <span className="close" onClick={this.closePopup.bind(this)}>
                            &times;
                        </span>
                        Игра завершена. Ваш результат: {this.state.clicks} кликов. Время: {this.state.time} секунд.
                    </div>
                </Popup>
            </div>
        )
    }


}

export default App
