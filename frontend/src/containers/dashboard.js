import React from 'react'
import { Container, Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { connect } from 'react-redux'
import { getDecks, getDecksCards, changeTab } from '../actions/items'
import DeckContainer from '../containers/deckContainer'
import CardContainer from '../containers/cardContainer'

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  changeTab = (evt) => {
    const { currentUser, getDecks, getDecksCards, selectedDeck, changeTab} = this.props
    changeTab(evt.target.innerText)
      switch(evt.target.innerText) {
        case 'CARDS':
          selectedDeck? getDecksCards(selectedDeck.id) : console.log('No deck selected') // to be replaced w/ user notification
          break

        case 'DECKS':
          getDecks(currentUser.id)
          break

        default:
          return null
      }
  }

  render(){
    const { activeItem } = this.props
    return(
      <Container>
        <Menu attached="top" tabular>
          <Menu.Item name='CARDS' active={activeItem === 'CARDS'} onClick={this.changeTab}/>
          <Menu.Item name='DECKS' active={activeItem === 'DECKS'} onClick={this.changeTab}/>
          <Menu.Item name='REVIEW' active={activeItem === 'REVIEW'} onClick={this.changeTab}/>
          <Menu.Item name='BROWSE' active={activeItem === 'BROWSE'} onClick={this.changeTab}/>

        </Menu>
        <Segment>
          {activeItem === 'CARDS'&& <CardContainer />}
          {activeItem === 'DECKS'&& <DeckContainer />}
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return { 
    authed: state.isAuthed, 
    currentUser: state.currentUser, 
    selectedDeck: state.selectedDeck,
    activeItem: state.activeItem
  }
}
const mapDispatchToProps = dispatch => {
  return { 
    getDecks: (id) => dispatch(getDecks(id)),
    getDecksCards: (deckId) => dispatch(getDecksCards(deckId)),
    changeTab: (tabName) => dispatch(changeTab(tabName))
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)