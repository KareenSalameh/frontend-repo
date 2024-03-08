import { useState } from "react"
interface ListGroupProps {
    items: string[]
    onDeleteItem: (index:number)=> void
  }
function ListGroup({items, onDeleteItem}: ListGroupProps) {
    //let selectedIndex = -1
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const handleClick = (index:number) => {
         console.log(index)
         setSelectedIndex(index)
    }
   
    const removeElement = () => {
        if(selectedIndex > -1){
            onDeleteItem(selectedIndex)
            setSelectedIndex(-1)

        }
    }


    return (
        <div>
            <ul className="list-group">
                {items.length == 0 && <p>No Items...</p>}
                {items.map((item, index) => <li 
                className={(selectedIndex == index)? "list-group-item active" : "list-group-item" }
                onClick= {() =>handleClick(index)}
                key={index}>
                {item}
                </li>)}
           
            </ul>
            {/* <button type="button"
                className="btn btn-primary"
                    onClick= {addElement}>
                    Add Element
            </button> */}
            <button type="button"
                className="btn btn-primary"
                    onClick= {removeElement}>
                    remove Element
            </button>
        </div>
    )
}

export default ListGroup