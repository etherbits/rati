import React from 'react'
import Nav from '../nav/nav'
import Styles from './main.module.css'
import AllContent from './AllContent/AllContent'
import TechContent from './TechContent/TechContent'
import ClothContent from './ClothContent/ClothContent'

class Main extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className={Styles['content-container']}>
          <div className={Styles['content-text']}>Category name</div>
          <div>
            {this.props.filter === '/' ? (
              <AllContent />
            ) : this.props.filter === 'tech' ? (
              <TechContent />
            ) : (
              <ClothContent />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Main
