
function StickyFooter({ children }) {
    let regularDiv = {
      backgroundColor: "black",
      textAlign: "center",
      left: "0",
      bottom: "0",
      width: "100%",
    };
  
    let wrapperDiv = {
      height: "80px",
      width: "100%",
    };
  
    return (
      <div>
        <div style={{ height: "30vh" }} />
        <div style={wrapperDiv} />
        <div style={regularDiv}>
          { children }
        </div>
      </div>
    );
  }
  

export default StickyFooter
