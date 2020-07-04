import React from "react";
import "./styles.css";

function RadioComponent(props) {
  const name = `${props.index}-${props.ruleIdex}`;
  return (
    <div className="radio-wrapper">
      <input
        type="radio"
        onClick={props.onclick}
        id="or"
        name={name}
        value="or"
        checked={props.checkedValue === "or"}
      />
      <label htmlFor="or">OR</label>
      <input
        type="radio"
        onClick={props.onclick}
        id="and"
        name={name}
        value="and"
        checked={props.checkedValue === "and"}
      />
      <label htmlFor="and">AND</label>
    </div>
  );
}

class Controls extends React.Component {
  componentDidMount() {
    // This is default selection of dropdown
    this.props.onchangeCondition(
      this.props.data.slectectedConditionType ||
        (this.props.filters.length && this.props.filters[0].field),
      this.props.index,
      this.props.ruleIdex
    );
  }

  render() {
    const op = this.props.filters.filter(
      item => item.field === this.props.data.slectectedConditionType
    );
    return (
      <div className="App">
        <div className="conditon-wrapper">
          <div>
            <select
              id="conditions"
              onChange={e =>
                this.props.onchangeCondition(
                  e.target.value,
                  this.props.index,
                  this.props.ruleIdex
                )
              }
              name="condition"
              value={this.props.data.slectectedConditionType}
            >
              <option value="">Select</option>
              {Object.keys(this.props.filters).length &&
                this.props.filters.map(item => {
                  return <option value={item.field}>{item.label}</option>;
                })}
            </select>
          </div>
          <div>
            <select
              id="operators"
              onChange={e =>
                this.props.onchangeOperator(
                  e.target.value,
                  this.props.index,
                  this.props.ruleIdex
                )
              }
              name="operator"
              value={this.props.data.conditionOperator}
            >
              {op &&
                op.length &&
                op[0].operators.map(item => {
                  return <option value={item.value}>{item.key}</option>;
                })}
            </select>
          </div>
          <div>
            <input
              type="text"
              value={this.props.data && this.props.data.valueAssigned}
              onChange={e =>
                this.props.onchangeText(
                  e.target.value,
                  this.props.index,
                  this.props.ruleIdex
                )
              }
            />
          </div>
        </div>
        <div>
          <RadioComponent
            checkedValue={this.props.data.groupOperatorSelection}
            onclick={e =>
              this.props.handleConditionSelection(
                e.target.value,
                this.props.index,
                this.props.ruleIdex
              )
            }
            index={this.props.index}
            ruleIdex={this.props.ruleIdex}
          />
        </div>
        <div className="button-wrapper">
          {/* <input
            type="button"
            value="Add More"
            onClick={() =>
              this.props.addNewGroup(this.props.index, this.props.ruleIdex)
            }
          /> */}
          <input
            type="button"
            value="Remove"
            onClick={() =>
              this.props.removeGroup(this.props.index, this.props.ruleIdex)
            }
          />
        </div>
      </div>
    );
  }
}

export default Controls;
