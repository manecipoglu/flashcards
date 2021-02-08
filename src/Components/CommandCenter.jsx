import React from 'react';

const CommandCenter = ({
  cards,
  loadCards,
  editor,
  cardViewerRef,
  handleRestore,
  deletedCardsIndex,
}) => {
  const [message, setMessage] = React.useState("");
  const [commandCenter, setCommandCenter] = React.useState(false);

  const saveLocalStorage = () => {
    if (cards.length === 0) {
      return;
    }
    localStorage.setItem("Flashcards", JSON.stringify(cards));
    setMessage("Saved!");
    setTimeout(() => setMessage(""), 1000);
  };

  const loadLocalStorage = () => {
    if (localStorage.getItem("Flashcards") === null) {
      return;
    }
    const cards = JSON.parse(localStorage.getItem("Flashcards"));
    loadCards(cards);
    setMessage("Loaded!");
    setTimeout(() => setMessage(""), 1000);
  };

  const deleteLocalStorage = () => {
    if (localStorage.getItem("Flashcards") === null) {
      return;
    }
    localStorage.removeItem("Flashcards");
    setMessage("Deleted!");
    setTimeout(() => setMessage(""), 1000);
  };

  const showCommandCenter = () => {
    setCommandCenter(!commandCenter);
  };

  const undo = () => {
    cardViewerRef.current.handleUndo();
  };

  const restore = () => {
    if (deletedCardsIndex.length === 0) {
      return;
    }
    handleRestore();
    setMessage("Restored!");
    setTimeout(() => setMessage(""), 1000);
  };

  return (
    <div style={{ marginTop: "18%", marginRight: "50px" }}>
      {editor ? (
        <fieldset
          style={{
            display: "flex",
            flexDirection: "column",
            width: "150px",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <legend>
            <h2 onClick={showCommandCenter}>Command Center</h2>
          </legend>
          {commandCenter && (
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <i
                    style={{ marginBottom: "2px" }}
                    className="fa fa-save fa-3x"
                    onClick={saveLocalStorage}
                    disabled={cards.length === 0 ? true : false}
                  ></i>
                  <h3 style={{ marginTop: "2px" }}>Save</h3>
                </div>
                <h3 style={{ color: "green", width: "85px" }}>
                  {message === "Saved!" && message}
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <i
                    style={{ marginBottom: "2px" }}
                    className="fa fa-download fa-3x"
                    onClick={loadLocalStorage}
                  ></i>
                  <h3 style={{ marginTop: "2px" }}>Load</h3>
                </div>
                <h3 style={{ color: "blue", width: "85px" }}>
                  {message === "Loaded!" && message}
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <i
                    style={{ marginBottom: "2px" }}
                    className="fa fa-ban fa-3x"
                    onClick={deleteLocalStorage}
                  ></i>
                  <h3 style={{ marginTop: "2px" }}>Delete</h3>
                </div>
                <h3 style={{ color: "red", width: "85px" }}>
                  {message === "Deleted!" && message}
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <i
                    style={{ marginBottom: "2px" }}
                    className="fa fa-recycle fa-3x"
                    onClick={restore}
                  ></i>
                  <h3 style={{ marginTop: "2px" }}>Restore</h3>
                </div>
                <h3 style={{ width: "85px" }}>
                  {message === "Restored!" && message}
                </h3>
              </div>
            </div>
          )}
        </fieldset>
      ) : (
        <fieldset
          style={{
            display: "flex",
            flexDirection: "column",
            width: "150px",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <legend>
            <h2 onClick={showCommandCenter}>Command Center</h2>
          </legend>
          {commandCenter && (
            <div>
              <i
                style={{ marginBottom: "2px" }}
                className="fa fa-undo fa-3x"
                onClick={undo}
              ></i>
              <h3 style={{ marginTop: "2px" }}>Undo</h3>
            </div>
          )}
        </fieldset>
      )}
    </div>
  );
};

export default CommandCenter;