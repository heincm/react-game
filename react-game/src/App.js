import React, { Component } from 'react';
import Wrapper from './Components/Wrapper'
import AvengerCard from './Components/AvengerCard'
import Scorebar from './Components/Scorebar'
import Jumbotron from './Components/Jumbotron'
import avengers from './avengers.json'

class App extends Component {

  state = {
    avengers: this.shuffle(avengers),
    score: 0,
    highScore: 0,
    isClicked: [],
    message: "Click an image to begin",
    color: "black"
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handleOnClick = event => {
    const currentImage = event.target.alt;
    if (this.state.isClicked.includes(currentImage)) {
      this.setState({
        score: 0,
        isClicked: [],
        message: "You already clicked that one. Game Over. Click again!",
        highScore: (this.state.highScore <= this.state.score) ? this.state.score : this.state.highScore,
        avengers: this.shuffle(avengers),
        color: "red"
      })
    }
    else {
      this.setState({
        isClicked: this.state.isClicked.concat(currentImage),
        score: this.state.score + 1,
        message: "Nice work! Keep going!",
        avengers: this.shuffle(avengers),
        color: "green"
      })
    }
  }


  render() {
    return (
      <>
        <Jumbotron>
          <h1 className="text-white display-3">Avenger Clicky Game!</h1>
          <p className="text-white lead">Try not to click the same avenger twice.</p>
        </Jumbotron>
        <Scorebar
          count={this.state.score}
          highScore={this.state.highScore}
          message={this.state.message}
          color={this.state.color} />
        <Wrapper>
          {this.state.avengers.map(avenger => (
            <AvengerCard
              key={avenger.id}
              name={avenger.name}
              image={avenger.image}
              handleOnClick={this.handleOnClick}
              clicked={avenger.clicked} />
          ))}
        </Wrapper>
      </>
    );
  }
}

export default App;
