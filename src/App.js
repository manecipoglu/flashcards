import React from "react";
import "./App.css";

import CardEditor from "./Components/CardEditor";
import CardViewer from "./Components/CardViewer";
import CommandCenter from "./Components/CommandCenter";

import { worldCapitals } from "./utils/worldCapitals";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.cards = [
      {
        front: "minha namorada",
        back: "mi carino",
        disabled: false,
        uniqueKey: "isik",
      },
      {
        front: "sevgilim",
        back: "bir tanem",
        disabled: false,
        uniqueKey: "ilik",
      },
      { front: "askim", back: "canim", disabled: false, uniqueKey: "sut" },
      { front: "kuzum", back: "can can", disabled: false, uniqueKey: "ic" },
      {
        front: "her seyim",
        back: "canimin ici",
        disabled: false,
        uniqueKey: "ali",
      },
    ];

    this.state = {
      cards: [],
      editor: true,
      uniqueKey: "ata",
      choice: "",
      deletedCards: [],
      deletedCardsIndex: [],
    };
  }

  ref = React.createRef();

  render() {
    return (
      <div>
        {this.state.choice === "" && (
          <div>
            <h1>WELCOME TO FLASHCARDS!</h1>
            <h2>Here you can customize your own cards!</h2>
            <h2>There are two modes: Editor and Viewer</h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "left" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2 style={{ textAlign: "left", marginBottom: "0px" }}>
                    In Editor Mode you can:
                  </h2>
                  <ul style={{ textAlign: "left", fontSize: "20px" }}>
                    <li>
                      <strong>Add and Delete cards</strong>
                    </li>
                    <li>
                      <strong>Edit existing cards</strong>
                    </li>
                    <li>
                      <strong>
                        Click on the checkbox to disable them without deleting
                      </strong>
                    </li>
                    <li>
                      <strong>
                        Drag and Drop to change the order of cards
                      </strong>
                    </li>
                  </ul>
                  <h2 style={{ textAlign: "left", marginBottom: "0px" }}>
                    From the Command Center you can:
                  </h2>
                  <ul style={{ textAlign: "left", fontSize: "20px" }}>
                    <li>
                      <strong>Save your cards to local storage</strong>
                    </li>
                    <li>
                      <strong>
                        Load your previously saved cards from local storage
                      </strong>
                    </li>
                    <li>
                      <strong>
                        Delete existing cards in your local storage
                      </strong>
                    </li>
                    <li>
                      <strong>Restore last deleted cards</strong>
                    </li>
                  </ul>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "right" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2
                    style={{
                      textAlign: "left",
                      marginLeft: "75px",
                      marginBottom: "0px",
                    }}
                  >
                    In Viewer Mode you can:
                  </h2>
                  <ul
                    style={{
                      textAlign: "left",
                      fontSize: "20px",
                      marginLeft: "75px",
                    }}
                  >
                    <li>
                      <strong>Click on the card to see the backside</strong>
                    </li>
                    <li>
                      <strong>Click on Next to move to the next card</strong>
                    </li>
                    <li>
                      <strong>
                        Shuffle the cards to see them in randomized order
                      </strong>
                    </li>
                    <li>
                      <strong>
                        Click on Learned to prevent the card from appearing
                        without deleting
                      </strong>
                    </li>
                  </ul>
                  <h2
                    style={{
                      textAlign: "left",
                      marginLeft: "75px",
                      marginBottom: "0px",
                    }}
                  >
                    From the Command Center you can:
                  </h2>
                  <ul
                    style={{
                      textAlign: "left",
                      fontSize: "20px",
                      marginLeft: "75px",
                    }}
                  >
                    <li>
                      <strong>Undo last action</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <h1>
              This is a{" "}
              <u>
                <em>one page</em>
              </u>{" "}
              application. Thus, do NOT use the back button of your browser!
            </h1>
            <h1>
              Click on Customize Self to begin or try pre-made cards in Viewer
              Mode!
            </h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="buttonMainPage"
                onClick={() =>
                  this.setState({
                    cards: worldCapitals,
                    editor: false,
                    choice: "capitols",
                  })
                }
              >
                <h3>World Capitals</h3>
              </button>
              <button
                className="buttonMainPage"
                onClick={() =>
                  this.setState({
                    cards: this.cards,
                    editor: true,
                    choice: "self",
                  })
                }
              >
                <h3>Customize Self</h3>
              </button>
            </div>
          </div>
        )}
        {(this.state.cards.length !== 0 || this.state.choice !== "") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              className="buttonMainPage"
              onClick={() => this.setState({ cards: [], choice: "" })}
            >
              <h3>Go Back</h3>
            </button>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div>
                <CommandCenter
                  cards={this.state.cards}
                  loadCards={this.loadCards}
                  editor={this.state.editor}
                  handleDisable={this.handleDisable}
                  handleRestore={this.handleRestore}
                  cardViewerRef={this.ref}
                  deletedCardsIndex={this.state.deletedCardsIndex}
                />
              </div>
              <div style={{ position: "absolute", left: "30%" }}>
                {this.state.editor ? (
                  <CardEditor
                    cards={this.state.cards}
                    handleSwitch={this.handleSwitch}
                    addCard={this.addCard}
                    deleteCard={this.deleteCard}
                    handleDisable={this.handleDisable}
                    dndCards={this.dndCards}
                    handleEdit={this.handleEdit}
                  />
                ) : (
                  <CardViewer
                    cards={this.state.cards}
                    handleDisable={this.handleDisable}
                    backdoorSwitch={this.backdoorSwitch}
                    choice={this.state.choice}
                    ref={this.ref}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  handleSwitch = () => {
    for (let i = 0; i < this.state.cards.length; i++) {
      if (!this.state.cards[i].disabled) {
        this.setState(state => ({
          editor: !state.editor,
        }));
        return;
      }
    }
  };

  addCard = (front, back, disabled, uniqueKey) => {
    this.setState(state => ({
      cards: [...state.cards, { front, back, disabled, uniqueKey }],
      uniqueKey: "ata",
    }));
  };

  deleteCard = index => {
    this.setState(state => {
      const cards = [...state.cards];
      const deletedCard = cards.splice(index, 1);

      const deletedCards = [...state.deletedCards, deletedCard];
      const deletedCardsIndex = [...state.deletedCardsIndex, index];

      return { cards, deletedCards, deletedCardsIndex };
    });
  };

  handleDisable = index => {
    this.setState(state => {
      var newCards = [...state.cards];
      newCards[index].disabled = !state.cards[index].disabled;
      return { cards: newCards };
    });
  };

  handleEdit = (index, editedCard) => {
    this.setState(state => {
      var editedCards = [...state.cards];
      editedCards[index] = editedCard;
      return { cards: editedCards };
    });
  };

  dndCards = newOrderCards => {
    this.setState({ cards: newOrderCards });
  };

  loadCards = cards => {
    this.setState({ cards });
  };

  backdoorSwitch = () => {
    this.setState(state => ({
      editor: !state.editor,
    }));
  };

  handleRestore = () => {
    if (this.state.deletedCards.length === 0) {
      return;
    }
    this.setState(state => {
      var deletedCardsIndex = [...state.deletedCardsIndex];
      var index = deletedCardsIndex.pop();

      var deletedCards = [...state.deletedCards];
      const restoredCard = deletedCards.pop();

      var cards = [...state.cards];
      cards.splice(index, 0, restoredCard[0]);

      return { cards, deletedCards, deletedCardsIndex };
    });
  };
}

export default App;
