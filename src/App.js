import React, { Component } from "react";
import Birds from "./components/Birds";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import birds from "./birds.json";

class App extends Component {
	state = {
    birds,
    score: 0,
    topScore: 0,
    message: "Click on a bird to earn points, but don't click a bird more than once!",
};


  handleClick = (id, clicked) => {

		const imageOrder = this.state.birds;

		if (clicked) {
			imageOrder.forEach((image, index) => {
				imageOrder[index].clicked = false;
			});
			return this.setState({
				image: imageOrder.sort(() => Math.random() - 0.5),
				message: "Wrong! You clicked the same bird twice. Start over.",
				score: 0
			})
		}
		else {
			imageOrder.forEach((image, index) => {
				if (id === image.id) {
					imageOrder[index].clicked = true;
				}
			});

			const { topScore, score } = this.state;
			const newScore = score + 1;
			const newTopScore = newScore > topScore ? newScore : topScore;

			return this.setState({
				image: imageOrder.sort(() => Math.random() - 0.5),
				message: "Correct!",
				score: newScore,
				topScore: newTopScore,
			})
		}
  };

  render() {
    return (
			<div>
				<Nav></Nav>

      			<Wrapper>
		   			<Title>
					<div>
 						<h1>{this.state.message}</h1>
 					</div>
 					<div>
 						<p><strong>Score:</strong> {this.state.score} <strong>Top Score:</strong> {this.state.topScore}</p>
 					</div> 
					</Title>

					{this.state.birds.map(birds => (
          			<Birds
            			id={birds.id}
           		   	 key={birds.id}
            			name={birds.name}
						image={birds.image}
						clicked={birds.clicked}
						handleClick={this.handleClick}
    				/>
        			))}
 			    </Wrapper>
			</div>
    );
  }
}

export default App;
