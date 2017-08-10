class FlowEngine {
  constructor(flowObject, rules) {
    this.flowObject = flowObject;
    this.rules = rules;
  }
  
  checkRule(id) {
    let currentRule = this.getRule(id);
    if (currentRule === undefined) {
      return { nextRuleId: null };
    }
    let ruleFunction = eval(currentRule.body);
    if (ruleFunction(this.flowObject)) {
      console.log('\x1b[32m', `Rule: ${currentRule.title} has passed`);
      currentRule.nextRuleId = currentRule.true_id;
    } else {
      console.log('\x1b[31m', `Rule: ${currentRule.title} has failed`);
      currentRule.nextRuleId = currentRule.false_id;
    }
    return currentRule;
  }
  
  addRule(newRule) {
    this.rules.push(newRule);
  }
  
  runRuleFunction(id) {
    let rule = this.checkRule(id);
    
    if (rule.nextRuleId) {
      this.runRuleFunction(rule.nextRuleId);
    } else {
      console.log('\x1b[35m', 'End');
    }
    
  }
  
  getRule(id) {
    return this.rules[this.rules.findIndex(i => i.id === id)];
  }
  
  start() {
    if (this.rules.length === 0) {
      console.log('There are no rules to run');
    } else {
      this.runRuleFunction(this.rules[0].id);
    }
  }
}

module.exports = FlowEngine;

