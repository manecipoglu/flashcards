import React from "react";

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.draggingItem = React.createRef();
    this.dragOverItem = React.createRef();

    this.state = {
      front: "",
      back: "",
      disabled: false,
      edit: false,
      editingIdx: 0,
      flip: true,
    };
  }

  render() {
    return (
      <div>
        <h1>Card Editor</h1>
        <button
          className="switchButton"
          onClick={this.props.handleSwitch}
          disabled={this.props.cards.length === 0 ? true : false}
        >
          Switch to Viewer
        </button>
        <br />
        <hr />
        <div style={{ marginBottom: "20px" }}>
          <input
            className="frontCard"
            onChange={this.handleChange}
            onClick={this.handleClick}
            name="front"
            placeholder="Front of Card"
            value={this.state.front}
          />
          <input
            className="backCard"
            onChange={this.handleChange}
            onClick={this.handleClick}
            name="back"
            placeholder="Back of Card"
            value={this.state.back}
          />
          <i
            id="add"
            onClick={this.state.edit ? this.submitEditedCard : this.addCard}
            className={
              this.state.edit ? "fa fa-refresh fa-3x" : "fa fa-plus fa-3x"
            }
          />
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td
                  className={
                    this.state.flip === true
                      ? "frontCard flipCard"
                      : "backCard flipCard"
                  }
                  onClick={() =>
                    this.setState(state => ({ flip: !state.flip }))
                  }
                >
                  <span>
                    <h2>
                      {this.state.flip === true
                        ? this.state.front
                        : this.state.back}
                    </h2>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        {this.props.cards.length !== 0 ? (
          <table style={{ background: "rgba(255, 255, 255, 0.1)" }}>
            <thead>
              <tr>
                <th style={{ width: "75px" }}>Edit</th>
                <th>Front</th>
                <th>Back</th>
                <th style={{ width: "75px" }}>Learned</th>
                <th style={{ width: "75px" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cards.map((card, idx) => (
                <tr
                  key={`${idx} enc ${new Date().getTime()}`}
                  draggable
                  ref={this.myRef}
                  onDragStart={e => this.handleDragStart(e, idx)}
                  onDragEnter={e => this.handleDragEnter(e, idx)}
                >
                  <td>
                    <i
                      id="edit"
                      className="fa fa-edit fa-2x"
                      data-index={idx}
                      onClick={this.editCard}
                    />
                  </td>
                  <td className="frontCard">{card.front}</td>
                  <td className="backCard">{card.back}</td>
                  <td>
                    <input
                      data-index={idx}
                      onChange={this.disableCard}
                      type="checkbox"
                      checked={card.disabled}
                    />
                  </td>
                  <td>
                    <i
                      className="fa fa-trash fa-2x"
                      data-index={idx}
                      onClick={this.deleteCard}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>Add Cards!</h2>
        )}
        <br />
        <hr />
        <button
          className="switchButton"
          onClick={this.props.handleSwitch}
          disabled={this.props.cards.length === 0 ? true : false}
        >
          Switch to Viewer
        </button>
      </div>
    );
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      flip: e.target.name === "front" ? true : false,
    });
  };

  handleClick = e => {
    this.setState({
      flip: e.target.name === "front" ? true : false,
    });
  };

  addCard = () => {
    if (this.state.front && this.state.back) {
      const uniqueKey = `${this.state.front} enc ${new Date().getTime()}`;
      this.props.addCard(
        this.state.front,
        this.state.back,
        this.state.disabled,
        uniqueKey
      );
      this.setState({
        front: "",
        back: "",
        disabled: false,
        edit: false,
        flip: true,
      });
    }
  };

  editCard = e => {
    this.setState({
      front: this.props.cards[e.target.dataset.index].front,
      back: this.props.cards[e.target.dataset.index].back,
      disabled: this.props.cards[e.target.dataset.index].disabled,
      edit: true,
      flip: true,
      editingIdx: e.target.dataset.index,
    });
  };

  submitEditedCard = () => {
    if (this.state.front && this.state.back) {
      const editedCard = {
        front: this.state.front,
        back: this.state.back,
        disabled: this.state.disabled,
      };
      const index = this.state.editingIdx;
      this.props.handleEdit(index, editedCard);
      this.setState({
        front: "",
        back: "",
        disabled: false,
        edit: false,
        flip: true,
      });
    }
  };

  disableCard = e => {
    this.props.handleDisable(e.target.dataset.index);
  };

  deleteCard = e => {
    this.props.deleteCard(e.target.dataset.index);
  };

  handleDragStart = (e, position) => {
    this.draggingItem.current = position;
  };

  handleDragEnter = (e, position) => {
    this.dragOverItem.current = position;

    var listCopy = [...this.props.cards];
    var draggingItemContent = listCopy[this.draggingItem.current];
    listCopy.splice(this.draggingItem.current, 1);
    listCopy.splice(this.dragOverItem.current, 0, draggingItemContent);

    this.draggingItem.current = this.dragOverItem.current;
    this.dragOverItem.current = null;
    this.props.dndCards(listCopy);
  };
}

export default CardEditor;