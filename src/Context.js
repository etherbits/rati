import React from 'react'

const Context = React.createContext()

export class ContextProvider extends React.Component {
    state = {
        index: 0,
        cartList: [],
    }

    setIndex = (index) => {
        this.setState({ index: index })
    }

    isDuplicate = (item) => {
        return this.state.cartList.some((obj) => obj.id === item.id)
    }

    addToCart = (item) => {
        const index = this.state.cartList.findIndex((obj) => obj.id === item.id)

        if (index === -1) {
            return this.setState({ cartList: [...this.state.cartList, item] })
        }

        const newCartList = this.state.cartList
        newCartList[index].quantity++
        this.setState({ cartList: newCartList })
    }

    removeFromCart = (id) => {
        const index = this.state.cartList.findIndex((obj) => obj.id === id)
        if (index === -1) {
            return console.log('nothing to remove')
        }

        const newCartList = this.state.cartList
        newCartList.splice(index, 1)
        this.setState({ cartList: newCartList })
    }

    render() {
        const { index } = this.state
        const { cartList } = this.state
        const { setIndex } = this
        const { addToCart } = this
        const { removeFromCart } = this

        return <Context.Provider value={{ index, cartList, setIndex, addToCart, removeFromCart }}>{this.props.children}</Context.Provider>
    }
}

export default Context
