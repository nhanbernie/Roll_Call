
import "../styles/CheckBox.scss"

const CheckBox = () => {
    return (
        <div className="checkbox-wrapper-42">
            <input
                id="cbx-42"
                type="checkbox"
                // checked={checked}
                // onChange={handleCheckboxChange}
            />
            <label className="cbx" htmlFor="cbx-42"></label>
            <label className="lbl is-active" htmlFor="cbx-42">
                Is Active
            </label>
        </div>
    )
}

export default CheckBox