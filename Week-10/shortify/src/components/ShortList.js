import '../styles/ShortList.css'
function ShortList(props) {
  const {list} =props;

  function copy(idx){
    var copyItem = list[idx].full_short_link;
    navigator.clipboard.writeText(copyItem);
    window.alert(`Copied: ${copyItem}`)
  }

  return (
    <ul className="shortList">
      {
        list.map((l,idx)=>{
          return(
            <li key={l.id}>
              <div className="listItem">
                <div>
                  <p className="originalLink">{l.original_link}</p>
                  <h2 className="shortLink">{l.full_short_link}</h2>
                </div>
                <button className="copyButton" onClick={()=>copy(idx)}>Copy</button>
              </div>
            </li>
          )
        })
      }
    </ul>
  );
  }
  
  export default ShortList;