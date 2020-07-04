import React from "react";
import "./styles.css";
import Controls from "./Controls";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: [
        {
          resultDataSet: [
            {
              slectectedConditionType: "",
              conditionOperator: "",
              valueAssigned: "",
              groupOperatorSelection: ""
            }
          ]
        }
      ],
      // resultDataSet: [
      //   {
      //     slectectedConditionType: "",
      //     conditionOperator: "",
      //     valueAssigned: "",
      //     groupOperatorSelection: ""
      //   }
      // ],
      filters: []
    };

    //Click handlers
    this.handleConditionSelection = this.handleConditionSelection.bind(this);
    this.onchangeCondition = this.onchangeCondition.bind(this);
    this.onchangeOperator = this.onchangeOperator.bind(this);
    this.addNewGroup = this.addNewGroup.bind(this);
    this.onchangeText = this.onchangeText.bind(this);
    this.saveJson = this.saveJson.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
    this.addNewGroupCondition = this.addNewGroupCondition.bind(this);
  }

  async componentDidMount() {
    const url =
      "https://run.mocky.io/v3/8f0c2392-2ee0-42e6-aa7a-4332398f06c3" ||
      "http://stubonweb.herokuapp.com/f47162ea50d4";
    //let that = this;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      filters: data
    });
  }

  updateState(rules) {
    //console.log(rules, "****");
    this.setState({
      rules
    });
  }
  handleConditionSelection(value, index, ruleIdex) {
    const rules = this.state.rules;
    const rule = rules[ruleIdex];
    const resultSet = rule.resultDataSet;

    const validationObj = resultSet[index];
    if (!this.validateForm(validationObj)) {
      resultSet[index].groupOperatorSelection = value;
      this.updateState(rules);
    }

    this.addNewGroup(index, ruleIdex);
  }

  onchangeCondition(value, index, ruleIdex) {
    const rules = this.state.rules;
    const rule = rules[ruleIdex];
    const resultSet = rule.resultDataSet;
    resultSet[index].slectectedConditionType = value;
    this.updateState(rules);
    if (!this.state.filters.length) {
      return;
    }
    const op = this.state.filters.filter(item => item.field === value);
    if (op.length) {
      this.onchangeOperator(op[0].operators[0].value, index, ruleIdex);
    }
  }

  onchangeOperator(value, index, ruleIdex) {
    const rules = this.state.rules;
    const rule = rules[ruleIdex];
    const resultSet = rule.resultDataSet;
    resultSet[index].conditionOperator = value;
    this.updateState(rules);
  }

  onchangeText(value, index, ruleIdex) {
    const rules = this.state.rules;
    const rule = rules[ruleIdex];
    const resultSet = rule.resultDataSet;
    resultSet[index].valueAssigned = value;
    this.updateState(rules);
  }

  validateForm(validationObj) {
    let flag = false;
    Object.keys(validationObj).forEach(key => {
      if (key !== "groupOperatorSelection") {
        if (validationObj[key] === "") {
          flag = true;
        }
      }
    });
    return flag;
  }
  addNewGroup(index, ruleIdex) {
    const rules = this.state.rules;
    const rule = rules[ruleIdex];
    const validationObj = rule.resultDataSet[index];
    //Validation for all the field is done here

    if (this.validateForm(validationObj)) {
      alert("all fields are mendatory");
      return;
    }
    rule.resultDataSet = [
      ...rule.resultDataSet,
      {
        slectectedConditionType: null,
        conditionOperator: "",
        valueAssigned: "",
        groupOperatorSelection: ""
      }
    ];
    this.updateState(rules);
  }

  removeGroup(index, ruleIdex) {
    const rules = this.state.rules;
    const rule = rules[ruleIdex];
    const resultSet = rule.resultDataSet;
    resultSet.splice(index, 1);
    this.updateState(rules);
  }

  saveJson(index) {
    console.log(this.state.rules, "<<<<<<<<Final Result");
  }

  addNewGroupCondition() {
    let rules = this.state.rules;
    rules.push({
      resultDataSet: [
        {
          slectectedConditionType: null,
          conditionOperator: "",
          valueAssigned: "",
          groupOperatorSelection: ""
        }
      ]
    });
    this.updateState(rules);
  }

  render() {
    //console.log(this.state, "State");
    return (
      <div>
        {this.state.rules.map((rules, ruleIdex) => {
          return (
            <div className="group-wrapper">
              {rules.resultDataSet.map((item, index) => {
                return (
                  <Controls
                    data={item}
                    handleConditionSelection={this.handleConditionSelection}
                    onchangeCondition={this.onchangeCondition}
                    onchangeOperator={this.onchangeOperator}
                    addNewGroup={this.addNewGroup}
                    onchangeText={this.onchangeText}
                    filters={this.state.filters}
                    removeGroup={this.removeGroup}
                    index={index}
                    ruleIdex={ruleIdex}
                  />
                );
              })}
            </div>
          );
        })}
        <input type="button" value="Save" onClick={this.saveJson} />
        <input
          type="button"
          value="Add group"
          onClick={this.addNewGroupCondition}
        />
      </div>
    );
  }
}

export default Welcome;
