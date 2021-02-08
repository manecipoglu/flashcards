import React from "react";

class CardViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flip: true,
      count: 0,
      shuffledCards: [],
      undoShuffle: [],
      undoCount: 0,
      undoCardsIndex: 0,
      lastAction: "",
    };
  }

  UNSAFE_componentWillMount() {
    const shuffledCards = this.props.cards.filter(card => !card.disabled);
    this.setState({ shuffledCards });
  }

  render() {
    return (
      <div>
        <h1>Card Viewer</h1>
        {this.props.choice === "self" && (
          <button className="switchButton" onClick={this.props.backdoorSwitch}>
            Switch to Editor
          </button>
        )}
        <hr />
        {this.state.shuffledCards.length !== 0 ? (
          <div>
            <table>
              <tbody>
                <tr>
                  <td
                    className={
                      this.state.flip
                        ? "frontCard flipCard"
                        : "backCard flipCard"
                    }
                    onClick={this.flipCard}
                    style={{ height: "142px" }}
                  >
                    <span>
                      <h2>
                        {this.state.flip
                          ? this.state.shuffledCards[this.state.count].front
                          : this.state.shuffledCards[this.state.count].back}
                      </h2>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <table>
              <tbody>
                <tr>
                  <td style={{ height: "142px" }}>
                    <span>
                      <h2>No cards Left!</h2>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <hr />
        <div className="buttons">
          <div>
            <i className="fa fa-random fa-3x" onClick={this.handleShuffle} />
            <h3 style={{ marginTop: "0px" }}>Shuffle</h3>
          </div>
          <div>
            <i className="fa fa-check fa-3x" onClick={this.handleLearned} />
            <h3 style={{ marginTop: "0px" }}>Learned</h3>
          </div>
          <div>
            <i className="fa fa-arrow-right fa-3x" onClick={this.nextCard} />
            <h3 style={{ marginTop: "0px" }}>Next</h3>
          </div>
        </div>
      </div>
    );
  }

  flipCard = () => {
    this.setState(state => ({ flip: !state.flip }));
  };

  nextCard = () => {
    if (this.state.shuffledCards.length === 1) {
      return;
    }

    this.setState(state => ({
      count: state.count + 1,
      flip: true,
      lastAction: "next",
    }));

    if (this.state.count >= this.state.shuffledCards.length - 1) {
      this.setState({ count: 0 });
    }
  };

  undoNext = () => {
    this.setState(state => ({
      count: state.count - 1,
      flip: true,
      lastAction: "",
    }));

    if (this.state.count === 0) {
      this.setState({ count: this.state.shuffledCards.length - 1 });
    }
  };

  handleShuffle = () => {
    var m = this.state.shuffledCards.length,
      temp,
      i;
    var newCards = [...this.state.shuffledCards];

    this.setState({ undoShuffle: [...newCards] });

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      temp = newCards[m];
      newCards[m] = newCards[i];
      newCards[i] = temp;
    }

    this.setState({ shuffledCards: newCards, lastAction: "shuffle" });
  };

  undoShuffle = () => {
    const unshuffledCards = this.state.undoShuffle;
    this.setState({ shuffledCards: unshuffledCards, lastAction: "" });
  };

  handleLearned = () => {
    if (this.state.shuffledCards.length === 0) {
      return;
    }
    const uniqueKey = this.state.shuffledCards[this.state.count].uniqueKey;
    var cardsIndex = 0;

    for (let i = 0; i < this.props.cards.length; i++) {
      if (this.props.cards[i].uniqueKey === uniqueKey) {
        cardsIndex = i;
        this.setState({ undoCardsIndex: i, lastAction: "learned" });
        break;
      }
    }

    this.props.handleDisable(cardsIndex);

    this.setState(state => {
      const nonDisabledCards = [...state.shuffledCards];
      nonDisabledCards.splice(this.state.count, 1);
      return { shuffledCards: nonDisabledCards, flip: true };
    });
  };

  undoLearned = () => {
    this.setState(state => {
      const previousCards = [...state.shuffledCards];
      previousCards.splice(
        state.count,
        0,
        this.props.cards[state.undoCardsIndex]
      );
      return { shuffledCards: previousCards, flip: true, lastAction: "" };
    });
    this.props.handleDisable(this.state.undoCardsIndex);
  };

  handleUndo = () => {
    switch (this.state.lastAction) {
      case "next":
        this.undoNext();
        break;
      case "learned":
        this.undoLearned();
        break;
      case "shuffle":
        this.undoShuffle();
        break;
      default:
        break;
    }
  };
}

export default CardViewer;