import React, { memo,useRef } from 'react'

const index = memo(({ref}) => {
  // const dialogRef = useRef(null)
  
  return (
    <div>
      {/* <!-- Simple modal dialog containing a form --> */}
    <dialog ref={ref}>
      <form method="dialog">
        <p>
          <label>
            Favorite animal:
            <select>
              <option value="default">Choose…</option>
              <option>Brine shrimp</option>
              <option>Red panda</option>
              <option>Spider monkey</option>
            </select>
          </label>
        </p>
        <div>
          <button value="cancel">Cancel</button>
          <button id="confirmBtn" value="default">Confirm</button>
        </div>
      </form>
    </dialog>
    <p>
      <button id="updateDetails">Update details</button>
    </p>
    <output></output>
    </div>
  )
})

export default index