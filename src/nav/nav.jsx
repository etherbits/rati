import React from 'react'
import Styles from './nav.module.css'
import Logo from './img/a-logo.svg'
import DownArrow from './img/DownArrow.svg'
import UpArrow from './img/UpArrow.svg'
import CartIcon from './img/Empty Cart.svg'
import { Link } from 'react-router-dom'
import Context from '../Context'

class Nav extends React.Component {
    constructor() {
        super()
        this.state = {
            index: 0,
        }
    }

    render() {
        const { cartList } = this.context
        const { removeFromCart } = this.context
        return (
            <div className={Styles['main-container']}>
                <div className={Styles['text-container']}>
                    <Link to='/' onClick={() => this.setState({ index: 0 })}>
                        <NavText name='all' color={this.state.index === 0 ? '#5ECE7B' : '#1d1f22'} border={this.state.index === 0 ? '2px solid #5ECE7B' : 'none'} weight={this.state.index === 0 ? '600' : '400'} paddingLeft={this.state.index === 0 ? '1em' : '0'} paddingRight={this.state.index === 0 ? '1em' : '0'} />
                    </Link>
                    <Link to='/tech' onClick={() => this.setState({ index: 1 })}>
                        <NavText name='tech' color={this.state.index === 1 ? '#5ECE7B' : '#1d1f22'} border={this.state.index === 1 ? '2px solid #5ECE7B' : 'none'} weight={this.state.index === 1 ? '600' : '400'} paddingLeft={this.state.index === 1 ? '1em' : '0'} paddingRight={this.state.index === 1 ? '1em' : '0'} />
                    </Link>
                    <Link to='/clothes' onClick={() => this.setState({ index: 2 })}>
                        <NavText name='clothes' color={this.state.index === 2 ? '#5ECE7B' : '#1d1f22'} border={this.state.index === 2 ? '2px solid #5ECE7B' : 'none'} weight={this.state.index === 2 ? '600' : '400'} paddingLeft={this.state.index === 2 ? '1em' : '0'} paddingRight={this.state.index === 2 ? '1em' : '0'} />
                    </Link>
                </div>
                <div className={Styles['logo-container']}>
                    <Link to={'/'}>
                        <img src={Logo} />
                    </Link>
                </div>
                <div className={Styles['icon-container']}>
                    <ul>
                        {cartList.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    onClick={() => {
                                        console.log(item.id)
                                        removeFromCart(item.id)
                                    }}
                                >
                                    {item.id}
                                </li>
                            )
                        })}
                    </ul>
                    <Child />
                    <div>
                        <img src={CartIcon} />
                    </div>
                </div>
            </div>
        )
    }
}

class Child extends React.Component {
    constructor() {
        super()
        this.state = {
            arrow: DownArrow,
            dropDown: 'none',
            currencyIcon: '$',
        }
        this.containerRef = React.createRef()
        this.handleOutsideClick = this.handleOutsideClick.bind(this)
    }
    //This function handles drop down menu
    handleCurrency = () => {
        const arrow = this.state.arrow === DownArrow ? UpArrow : DownArrow
        const dropDown = this.state.arrow === UpArrow ? 'none' : 'block'
        this.setState({ arrow: arrow, dropDown: dropDown })
    }
    //

    //this function handles outside click, when user will click outside the drop down menu it will close drop down
    handleOutsideClick = (e) => {
        if (this.containerRef.current && !this.containerRef.current.contains(e.target)) {
            this.setState({ arrow: DownArrow, dropDown: 'none' })
        }
    }

    //

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick)
    }

    render() {
        const { index, setIndex } = this.context
        return (
            <div className={Styles['currency-div']} ref={this.containerRef}>
                <h2 className={Styles['dollar-icon']} onClick={this.handleCurrency}>
                    {this.state.currencyIcon}
                </h2>
                <img src={this.state.arrow} className={Styles.arrow} onClick={this.handleCurrency} />
                <div className={Styles['drop-down']} style={{ display: this.state.dropDown }}>
                    <DropDownText
                        name='$ usd'
                        click={() => {
                            const newIndex = 0
                            setIndex(newIndex)
                            this.setState({
                                currencyIcon: '$',
                                dropDown: 'none',
                                arrow: DownArrow,
                            })
                        }}
                    />
                    <DropDownText
                        name='£ gbp'
                        click={() => {
                            const newIndex = 1
                            setIndex(newIndex)
                            this.setState({
                                currencyIcon: '£',
                                dropDown: 'none',
                                arrow: DownArrow,
                            })
                        }}
                    />
                    <DropDownText
                        name='A$ aud'
                        click={() => {
                            const newIndex = 2
                            setIndex(newIndex)
                            this.setState({
                                currencyIcon: 'A$',
                                dropDown: 'none',
                                arrow: DownArrow,
                            })
                        }}
                    />
                    <DropDownText
                        name='¥ jpy'
                        click={() => {
                            const newIndex = 3
                            setIndex(newIndex)
                            this.setState({
                                currencyIcon: '¥',
                                dropDown: 'none',
                                arrow: DownArrow,
                            })
                        }}
                    />
                    <DropDownText
                        name='₽ rub'
                        click={() => {
                            const newIndex = 4
                            setIndex(newIndex)
                            this.setState({
                                currencyIcon: '₽',
                                dropDown: 'none',
                                arrow: DownArrow,
                            })
                        }}
                    />
                </div>
            </div>
        )
    }
}
Nav.contextType = Context
Child.contextType = Context

class NavText extends React.Component {
    render() {
        return (
            <h2
                className={Styles['nav-text']}
                style={{
                    color: this.props.color,
                    borderBottom: this.props.border,
                    fontWeight: this.props.weight,
                    paddingLeft: this.props.paddingLeft,
                    paddingRight: this.props.paddingRight,
                }}
            >
                {this.props.name}
            </h2>
        )
    }
}

const DropDownText = (props) => {
    return (
        <h2 className={Styles['currency']} onClick={props.click}>
            {props.name}
        </h2>
    )
}

export default Nav
